#!/usr/bin/env python3
"""
Prepare astro images for the website.

For each full-resolution original it produces two things:

  1. a 1400px thumbnail  -> assets/astro-images/   (committed to git, used by the
                                                    gallery tiles in astro.html)
  2. a 4K version        -> build/r2/              (uploaded to Cloudflare R2 and
                                                    served on click-through)

Originals are only ever downsized, never upscaled. If an original is already at
or near 4K it is copied byte-for-byte rather than re-encoded, so no generation
loss is introduced.

Usage
-----
    python3 scripts/add-astro-images.py ~/astro/exports
    python3 scripts/add-astro-images.py ~/astro/exports --quality 95

Then upload the 4K files:

    ./scripts/upload-to-r2.sh
"""

import argparse
import shutil
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow is required:  pip install Pillow")

REPO = Path(__file__).resolve().parent.parent
THUMB_DIR = REPO / "assets" / "astro-images"
R2_DIR = REPO / "build" / "r2"

FULL_EDGE = 3840          # 4K long edge
THUMB_EDGE = 1400         # gallery tiles render at ~864px, so this covers them
NEAR_FULL = 4200          # within this of FULL_EDGE, copy verbatim instead
EXTS = {".jpg", ".jpeg", ".png", ".tif", ".tiff"}


def load(path):
    im = ImageOps.exif_transpose(Image.open(path))
    return im.convert("RGB") if im.mode != "RGB" else im


def process(src, quality, thumb_quality):
    THUMB_DIR.mkdir(parents=True, exist_ok=True)
    R2_DIR.mkdir(parents=True, exist_ok=True)

    originals = sorted(f for f in src.iterdir() if f.suffix.lower() in EXTS)
    if not originals:
        sys.exit(f"No images found in {src}")

    print(f"{'image':<26}{'original':>11}{'4K':>10}{'thumb':>9}  note")
    print("-" * 74)

    for f in originals:
        width, height = Image.open(f).size
        # JPEGs keep their extension; anything else becomes .jpg
        stem = f.stem
        out_name = f.name if f.suffix.lower() in {".jpg", ".jpeg"} else f"{stem}.jpg"
        full_out = R2_DIR / out_name

        if max(width, height) <= NEAR_FULL and f.suffix.lower() in {".jpg", ".jpeg"}:
            shutil.copy2(f, full_out)
            note = "copied verbatim"
        else:
            im = load(f)
            im.thumbnail((FULL_EDGE, FULL_EDGE), Image.LANCZOS)   # never upscales
            im.save(full_out, "JPEG", quality=quality, optimize=True,
                    progressive=True, subsampling=0)              # 4:4:4 keeps star colour
            note = f"{width}px -> {im.size[0]}px"

        thumb = load(f)
        thumb.thumbnail((THUMB_EDGE, THUMB_EDGE), Image.LANCZOS)
        thumb_out = THUMB_DIR / out_name
        thumb.save(thumb_out, "JPEG", quality=thumb_quality, optimize=True,
                   progressive=True, subsampling=0)

        print(f"{out_name:<26}{f.stat().st_size/1048576:9.2f}M"
              f"{full_out.stat().st_size/1048576:9.2f}M"
              f"{thumb_out.stat().st_size/1048576:8.2f}M  {note}")

    print("-" * 74)
    print(f"\n{len(originals)} image(s) processed.")
    print(f"  thumbnails -> {THUMB_DIR.relative_to(REPO)}  (commit these)")
    print(f"  4K files   -> {R2_DIR.relative_to(REPO)}  (run ./scripts/upload-to-r2.sh)")
    print("\nRemember to add new entries to the galleryData list in astro.html.")


def main():
    p = argparse.ArgumentParser(description=__doc__,
                                formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("source", type=Path, help="folder containing full-resolution originals")
    p.add_argument("--quality", type=int, default=92,
                   help="JPEG quality for the 4K versions (default: 92)")
    p.add_argument("--thumb-quality", type=int, default=88,
                   help="JPEG quality for thumbnails (default: 88)")
    a = p.parse_args()
    if not a.source.is_dir():
        sys.exit(f"Not a directory: {a.source}")
    process(a.source, a.quality, a.thumb_quality)


if __name__ == "__main__":
    main()
