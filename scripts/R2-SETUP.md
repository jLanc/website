# Serving full-resolution images from Cloudflare R2

The gallery in `astro.html` loads small thumbnails that live in this repo.
Clicking a tile opens the full-resolution (up to 4K) version, which is served
from an R2 bucket instead of from git.

This keeps the repository small no matter how many images get added, and means
Cloudflare's build never has to fetch large binaries — which is what broke the
deploy when these images were tracked with Git LFS.

## Why R2 rather than Git LFS

- R2 gives 10 GB of storage free and **egress is free**, permanently.
- Cloudflare's build process does not fetch Git LFS objects, so LFS pointers
  deploy as ~130-byte text files and the images appear broken.
- GitHub LFS bills bandwidth (10 GB/month free, then ~$0.0875/GiB). Every build
  re-downloads every object, so that allowance disappears quickly.

## One-time setup

### 1. Create the bucket

```bash
npx wrangler r2 bucket create astro-images
```

### 2. Put it behind a custom domain

Use a custom domain rather than the `r2.dev` URL — `r2.dev` is rate-limited and
Cloudflare documents it as non-production only. A custom domain also gets you
Cloudflare's cache, which matters for multi-megabyte images.

1. Cloudflare dashboard → **R2 object storage** → select `astro-images`
2. **Settings** → **Custom Domains** → **Add**
3. Enter a subdomain you control, e.g. `images.yourdomain.com`
4. Review the DNS record and select **Connect Domain**

Status goes from *Initializing* to *Active* within a few minutes.

### 3. Point the site at it

In `astro.html`, set:

```js
const R2_BASE = "https://images.yourdomain.com";
```

### 4. Allow the site to load the images

If the images are loaded cross-origin, add a CORS rule to the bucket
(**Settings** → **CORS Policy**):

```json
[
  {
    "AllowedOrigins": ["https://yourdomain.com"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

Plain `<a href>` click-through does not need CORS, but it is required if you
later fetch images from JavaScript or draw them to a canvas.

## Adding new images later

```bash
# 1. generate thumbnails + 4K versions from your originals
python3 scripts/add-astro-images.py ~/astro/exports

# 2. upload the 4K versions to R2
./scripts/upload-to-r2.sh

# 3. add the new entries to galleryData in astro.html, then commit the thumbnails
git add assets/astro-images astro.html
git commit -m "Add new astro images"
```

`build/` is gitignored, so the 4K files never enter git history.

## Cost

At roughly 2 MB per 4K image, 10 GB of free storage is about 5,000 images.
Egress is free, so serving them costs nothing regardless of traffic.
