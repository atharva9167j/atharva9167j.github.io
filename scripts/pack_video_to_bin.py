import os
import sys
import glob
import struct
import io
import shutil
import argparse
import subprocess
from PIL import Image, ImageChops
from concurrent.futures import ProcessPoolExecutor

def extract_frames(video_path, temp_dir):
    os.makedirs(temp_dir, exist_ok=True)
    out_pattern = os.path.join(temp_dir, "frame_%04d.png")
    cmd = ["ffmpeg", "-y", "-i", video_path, out_pattern]
    print(f"Extracting frames from {video_path}...")
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    extracted = sorted(glob.glob(os.path.join(temp_dir, "frame_*.png")))
    print(f"Extracted {len(extracted)} raw frames.")
    return extracted

def filter_duplicates(files):
    if not files:
        return []
    print("Checking for duplicate adjacent frames...")
    unique = [files[0]]
    prev = Image.open(files[0])
    for f in files[1:]:
        curr = Image.open(f)
        diff = ImageChops.difference(curr, prev)
        if diff.getbbox() is not None:
            unique.append(f)
            prev = curr
    duplicates = len(files) - len(unique)
    print(f"Filtered {duplicates} duplicate frames. Unique frames: {len(unique)}")
    return unique

def compress_single_frame(args):
    file_path, width, height, quality = args
    with Image.open(file_path) as img:
        if img.mode != "RGB":
            img = img.convert("RGB")
        if (img.width, img.height) != (width, height):
            img = img.resize((width, height), Image.Resampling.LANCZOS)
        buf = io.BytesIO()
        img.save(buf, format="WEBP", quality=quality, method=5)
        return buf.getvalue()

def build_bin(frames_data, output_path):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    count = len(frames_data)
    header = bytearray()
    header.extend(b"HFB1")
    header.extend(struct.pack("<I", count))
    for frame in frames_data:
        header.extend(struct.pack("<I", len(frame)))
    with open(output_path, "wb") as f:
        f.write(header)
        for frame in frames_data:
            f.write(frame)
    size_mb = os.path.getsize(output_path) / (1024 * 1024)
    print(f"[SUCCESS] Generated {output_path} ({count} frames, {size_mb:.2f} MB)")

def main():
    parser = argparse.ArgumentParser(description="Extract, deduplicate, and pack video frames into hero_frames.bin & hero_frames_mobile.bin")
    parser.add_argument("--input", "-i", default="env2.mp4", help="Input video file path (default: env2.mp4)")
    parser.add_argument("--count", "-c", type=int, default=180, help="Target number of frames (default: 180)")
    parser.add_argument("--quality", "-q", type=int, default=55, help="WebP quality for desktop (default: 55)")
    parser.add_argument("--mobile-quality", "-mq", type=int, default=55, help="WebP quality for mobile (default: 55)")
    parser.add_argument("--out-desktop", default="public/hero_frames.bin", help="Output desktop bin path")
    parser.add_argument("--out-mobile", default="public/hero_frames_mobile.bin", help="Output mobile bin path")
    args = parser.parse_args()

    if not os.path.exists(args.input):
        print(f"Error: Input video '{args.input}' not found!")
        sys.exit(1)

    temp_dir = "./_tmp_video_extract"
    try:
        raw_files = extract_frames(args.input, temp_dir)
        unique_files = filter_duplicates(raw_files)

        # Sample target count evenly
        if len(unique_files) > args.count:
            indices = [round(i * (len(unique_files) - 1) / (args.count - 1)) for i in range(args.count)]
            sampled_files = [unique_files[idx] for idx in indices]
        else:
            sampled_files = unique_files

        actual_count = len(sampled_files)
        print(f"Sampling {actual_count} frames for packaging...")

        # Desktop (1080p: 1920x1080)
        print(f"Compressing desktop frames (1920x1080, Q{args.quality})...")
        desktop_tasks = [(f, 1920, 1080, args.quality) for f in sampled_files]
        with ProcessPoolExecutor() as executor:
            desktop_frames = list(executor.map(compress_single_frame, desktop_tasks))
        build_bin(desktop_frames, args.out_desktop)

        # Mobile (720p: 1280x720)
        print(f"Compressing mobile frames (1280x720, Q{args.mobile_quality})...")
        mobile_tasks = [(f, 1280, 720, args.mobile_quality) for f in sampled_files]
        with ProcessPoolExecutor() as executor:
            mobile_frames = list(executor.map(compress_single_frame, mobile_tasks))
        build_bin(mobile_frames, args.out_mobile)

    finally:
        if os.path.exists(temp_dir):
            shutil.rmtree(temp_dir)
            print("Cleaned temporary extraction directory.")

if __name__ == "__main__":
    main()
