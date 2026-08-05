#!/usr/bin/env bash
#
# Upload the 4K astro images in build/r2/ to Cloudflare R2.
#
# First-time setup is in scripts/R2-SETUP.md — you need the bucket to exist and
# be reachable on a custom domain before the site can serve from it.
#
# Usage:
#   ./scripts/upload-to-r2.sh            # upload everything in build/r2
#   BUCKET=my-bucket ./scripts/upload-to-r2.sh
#
set -euo pipefail

BUCKET="${BUCKET:-astro-images}"
SRC="$(cd "$(dirname "$0")/.." && pwd)/build/r2"

if [ ! -d "$SRC" ]; then
  echo "No build/r2 directory. Run scripts/add-astro-images.py first." >&2
  exit 1
fi

shopt -s nullglob
files=("$SRC"/*.jpg "$SRC"/*.jpeg)
if [ ${#files[@]} -eq 0 ]; then
  echo "No images in $SRC" >&2
  exit 1
fi

echo "Uploading ${#files[@]} image(s) to R2 bucket '$BUCKET'..."
for f in "${files[@]}"; do
  key="$(basename "$f")"
  printf '  %-30s' "$key"
  npx wrangler r2 object put "$BUCKET/$key" \
      --file "$f" \
      --content-type image/jpeg \
      --cache-control "public, max-age=31536000, immutable" \
      --remote >/dev/null
  echo "ok"
done

echo
echo "Done. Verify one with:"
echo "  curl -I https://<your-r2-domain>/$(basename "${files[0]}")"
