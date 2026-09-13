import os
import glob
from PIL import Image

TARGET_DIR = "./public"
MAX_WIDTH = 1920
MAX_HEIGHT = 1080

def optimize_image(file_path):
    orig_size = os.path.getsize(file_path)
    ext = os.path.splitext(file_path)[1].lower()
    
    if ext not in [".png", ".jpg", ".jpeg"]:
        return 0, 0

    try:
        with Image.open(file_path) as img:
            orig_w, orig_h = img.size
            
            # Check if resize is needed (fit within 1920x1080 preserving aspect ratio)
            scale = min(MAX_WIDTH / orig_w, MAX_HEIGHT / orig_h, 1.0)
            if scale < 1.0:
                new_w = round(orig_w * scale)
                new_h = round(orig_h * scale)
                img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
                resized = True
            else:
                new_w, new_h = orig_w, orig_h
                resized = False

            temp_path = file_path + ".tmp"
            
            if ext == ".png":
                # Optimize PNG: preserve alpha if RGBA, strip metadata
                if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                    img.save(temp_path, format="PNG", optimize=True, compress_level=9)
                else:
                    if img.mode != "RGB":
                        img = img.convert("RGB")
                    img.save(temp_path, format="PNG", optimize=True, compress_level=9)
            elif ext in [".jpg", ".jpeg"]:
                if img.mode != "RGB":
                    img = img.convert("RGB")
                img.save(temp_path, format="JPEG", quality=82, optimize=True, progressive=True)

            new_size = os.path.getsize(temp_path)

            # Only overwrite if file actually got smaller
            if new_size < orig_size:
                os.replace(temp_path, file_path)
                saved = orig_size - new_size
                print(f"[OPTIMIZED] {os.path.relpath(file_path)}: {orig_w}x{orig_h} -> {new_w}x{new_h} | {orig_size/1024:.1f}KB -> {new_size/1024:.1f}KB (-{saved/orig_size*100:.1f}%)")
                return orig_size, new_size
            else:
                os.remove(temp_path)
                print(f"[UNCHANGED] {os.path.relpath(file_path)}: already optimal ({orig_size/1024:.1f}KB)")
                return orig_size, orig_size

    except Exception as e:
        print(f"[ERROR] {file_path}: {e}")
        return orig_size, orig_size

def main():
    print(f"Scanning {TARGET_DIR} for images to optimize (max 1080p)...")
    total_before = 0
    total_after = 0
    count = 0

    for root, _, files in os.walk(TARGET_DIR):
        for f in files:
            ext = os.path.splitext(f)[1].lower()
            if ext in [".png", ".jpg", ".jpeg"]:
                # Skip favicon and hero frames binaries
                if "favicon" in f.lower() or "hero_frames" in f.lower():
                    continue
                file_path = os.path.join(root, f)
                b, a = optimize_image(file_path)
                total_before += b
                total_after += a
                count += 1

    total_saved = total_before - total_after
    print("\n" + "="*50)
    print(f"Processed {count} images.")
    print(f"Total size before: {total_before / (1024*1024):.2f} MB")
    print(f"Total size after:  {total_after / (1024*1024):.2f} MB")
    print(f"Total space saved: {total_saved / (1024*1024):.2f} MB (-{(total_saved/total_before*100) if total_before else 0:.1f}%)")
    print("="*50)

if __name__ == "__main__":
    main()
