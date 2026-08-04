import json
from pathlib import Path
import zipfile

# INPUT FILE
input_file = Path("earthmate-tracks.js")

# OUTPUT DIRECTORY
out_dir = Path("tracks_js")
out_dir.mkdir(exist_ok=True)

# LOAD SOURCE DATA
data = json.loads(input_file.read_text())

features = data["features"]

output_files = []

for i, feature in enumerate(features, start=1):
    single_fc = {
        "type": "FeatureCollection",
        "features": [feature]
    }

    out_path = out_dir / f"track_{i}.js"
    out_path.write_text(
        json.dumps(single_fc, indent=2)
    )

    output_files.append(out_path)

# ZIP EVERYTHING
zip_path = Path("tracks_js.zip")
with zipfile.ZipFile(zip_path, "w") as z:
    for f in output_files:
        z.write(f, f.name)

print(f"Created {len(output_files)} .js files")
print(f"ZIP archive: {zip_path}")
