# Asset & Media Optimization Scripts

This directory contains automated tooling for optimizing portfolio images, screenshots, and hero scroll animation packages.

---

## 1. `optimize_images.py`
Optimizes all static images (`png`, `jpg`, `jpeg`) across `public/` and `public/images/`.
* Caps maximum dimensions to **1920x1080** (Lanczos downscale).
* Optimizes PNG compression (level 9, strips junk metadata, preserves alpha transparency).
* Converts JPEGs to progressive Huffman-optimized streams.
* Only overwrites files if size actually reduces.

### Usage:
```bash
python scripts/optimize_images.py
```

---

## 2. `pack_video_to_bin.py`
Full pipeline to process any raw video file (`.mp4`) into responsive `.bin` streams.
* Extracts frames using `ffmpeg`.
* Detects and removes exact adjacent duplicate frames.
* Samples target frame count evenly.
* Encodes both **Desktop** (1080p) and **Mobile** (720p) binary streams.
* Automatically cleans up temporary extraction files.

### Usage:
```bash
# Default (looks for env2.mp4, outputs 180 frames at 1080p and 720p)
python scripts/pack_video_to_bin.py

# Custom input and settings
python scripts/pack_video_to_bin.py --input my_video.mp4 --count 180 --quality 60 --mobile-quality 50
```

---

## 3. `repack_hero_bin.py`
Utility to unpack, resize, retune quality, or generate new variants from an existing `hero_frames.bin` without needing the original video file.

### Usage:
```bash
# Create a 720p mobile bin from existing desktop bin:
python scripts/repack_hero_bin.py -i public/hero_frames.bin -o public/hero_frames_mobile.bin -w 1280 -ht 720 -q 55
```
