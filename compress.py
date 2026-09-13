import os
from PIL import Image

INPUT_FOLDER = "./public/hero_frames_webp"
OUTPUT_FOLDER = "./public/hero_frames_webp_compressed"

# Create output folder if it doesn't exist
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

def compress_webp(input_path, output_path):
    try:
        with Image.open(input_path) as img:
            # Ensure image is in RGB or RGBA
            if img.mode not in ("RGB", "RGBA"):
                img = img.convert("RGBA")

            # Save with high-quality compression
            img.save(
                output_path,
                format="WEBP",
                quality=60,       # max quality (visually lossless)
                method=6,          # best compression method (0–6)
            )

    except Exception as e:
        print(f"Error processing {input_path}: {e}")

def process_folder():
    for filename in os.listdir(INPUT_FOLDER):
        if filename.lower().endswith(".webp"):
            input_path = os.path.join(INPUT_FOLDER, filename)
            output_path = os.path.join(OUTPUT_FOLDER, filename)

            compress_webp(input_path, output_path)
            print(f"Compressed: {filename}")

if __name__ == "__main__":
    process_folder()