// Gallery tiles load the small thumbnails committed to this repo.
// Clicking a tile opens the full-resolution (up to 4K) version, which is
// served from Cloudflare R2 so the repository stays small as more images
// are added. Set this to your bucket's public URL or custom domain, e.g.
//   "https://images.example.com"   or   "https://pub-<hash>.r2.dev"

const R2_BASE = "https://images.jakeastro.io";

function fullResUrl(src) {
    return `${R2_BASE}/${encodeURIComponent(src.split('/').pop())}`;
}

function createGalleryItem(image) {
    const item = document.createElement('a');
    if (image.src.includes("gif")) {
        item.href = image.src
    } else {
        item.href = fullResUrl(image.src);
    }
    item.target = '_blank';
    item.rel = 'noopener';
    item.className = 'gallery-item';

    const img = document.createElement('img');
    img.alt = image.title;
    img.decoding = 'async';
    img.src = image.src;
    revealWhenReady(img);
    item.appendChild(img);

    const caption = document.createElement('span');
    caption.className = 'gallery-caption';
    caption.textContent = image.title;
    item.appendChild(caption);
    return item;
}

function resizeGalleryItems() {
    const items = document.querySelectorAll('.gallery-item');
    const maxHeight = Math.floor(window.innerHeight * 0.4);
    const minHeight = Math.floor(window.innerHeight * 0.2);

    items.forEach(item => {
        const height = Math.floor(maxHeight - minHeight) + minHeight;
        const width = height;   // Create square image tiles
        item.style.width = `${width}px`;
        item.style.height = `${height}px`;
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    galleryData.reverse();
    galleryData.forEach(image => {
        gallery.appendChild(createGalleryItem(image));
    });
    resizeGalleryItems();
});

function revealWhenReady(img) {
    const show = () => requestAnimationFrame(() =>
        requestAnimationFrame(() => img.classList.add('loaded'))
    );

    if (img.complete && img.naturalWidth > 0) {
        show();
    } else {
        img.addEventListener('load', show, { once: true });
        img.addEventListener('error', show, { once: true });
    }
}

window.addEventListener('resize', resizeGalleryItems);
