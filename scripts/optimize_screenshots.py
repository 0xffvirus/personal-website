"""Regenerate responsive project covers from the original PNGs (requires Pillow)."""

from pathlib import Path

from PIL import Image, ImageOps


COVERS = Path(__file__).resolve().parents[1] / "assets/images/projects"
WIDTHS = (480, 800, 1200, 1600)

for source in sorted(COVERS.glob("*.png")):
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
        for width in WIDTHS:
            if width > image.width:
                raise ValueError(f"{source.name} is smaller than {width}px")
            height = round(image.height * width / image.width)
            resized = image.resize((width, height), Image.Resampling.LANCZOS)
            destination = source.with_name(f"{source.stem}-{width}.webp")
            resized.save(destination, "WEBP", quality=82, method=6)
            print(f"{destination.name}: {destination.stat().st_size / 1024:.1f} KiB")
