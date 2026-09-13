import os
import io
import struct
import argparse
from PIL import Image
from concurrent.futures import ProcessPoolExecutor

def unpack_bin(bin_path):
    with open(bin_path, "rb") as f:
        data = f.read()

    magic = data[:4]
    if magic != b"HFB1":
        raise ValueError(f"Invalid magic: {magic}. Expected b'HFB1'.")

    count = struct.unpack("<I", data[4:8])[0]
    lengths = [struct.unpack("<I", data[8 + i * 4 : 12 + i * 4])[0] for i in range(count)]
    offset = 8 + count * 4

    frames = []
    for length in lengths:
        frames.append(data[offset : offset + length])
        offset += length

    return count, frames

def process_frame(args):
    raw_data, width, height, quality = args
    img = Image.open(io.BytesIO(raw_data))
    if img.mode != "RGB":
        img = img.convert("RGB")
    if width and height and (img.width, img.height) != (width, height):
        img = img.resize((width, height), Image.Resampling.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, format="WEBP", quality=quality, method=5)
    return buf.getvalue()

def pack_bin(frames, out_path):
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    count = len(frames)
    header = bytearray()
    header.extend(b"HFB1")
    header.extend(struct.pack("<I", count))
    for frame in frames:
        header.extend(struct.pack("<I", len(frame)))
    with open(out_path, "wb") as f:
        f.write(header)
        for frame in frames:
            f.write(frame)
    size_mb = os.path.getsize(out_path) / (1024 * 1024)
    print(f"[SUCCESS] Wrote {out_path} ({count} frames, {size_mb:.2f} MB)")

def main():
    parser = argparse.ArgumentParser(description="Repack an existing hero_frames.bin with new resolution/quality settings.")
    parser.add_argument("--input", "-i", default="public/hero_frames.bin", help="Input bin file")
    parser.add_argument("--output", "-o", default="public/hero_frames_repacked.bin", help="Output bin file")
    parser.add_argument("--width", "-w", type=int, default=None, help="Target width (e.g. 1920 or 1280)")
    parser.add_argument("--height", "-ht", type=int, default=None, help="Target height (e.g. 1080 or 720)")
    parser.add_argument("--quality", "-q", type=int, default=55, help="WebP quality (default: 55)")
    args = parser.parse_args()

    if not os.path.exists(args.input):
        print(f"Error: {args.input} does not exist!")
        return

    count, raw_frames = unpack_bin(args.input)
    print(f"Unpacked {count} frames from {args.input}. Repacking...")

    tasks = [(f, args.width, args.height, args.quality) for f in raw_frames]
    with ProcessPoolExecutor() as executor:
        repacked = list(executor.map(process_frame, tasks))

    pack_bin(repacked, args.output)

if __name__ == "__main__":
    main()
