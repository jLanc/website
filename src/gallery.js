// Gallery tiles load the small thumbnails committed to this repo.
// Clicking a tile opens the full-resolution version which is
// served from Cloudflare R2 so the repository stays small as more images
// are added

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

    item.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        openModal(image);
    });

    return item;
}

function openModal(image) {
    modal = document.getElementById('image-modal')
    modal.title = image.title;
    modal.description = image.description;
    modalImg = document.getElementById('modal-img');
    modalImg.src = fullResUrl(image.src); // full res url 

    // set title, description
    // set base image src
    // if (image.overlay) → show the toggle row, otherwise hide it
    // reset the toggle to unchecked so the next image doesn't inherit state
    modal.showModal();
}

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

    // Reverse gallery items so most recent image is placed first
    galleryData.reverse();
    galleryData.forEach(image => {
        gallery.appendChild(createGalleryItem(image));
    });
    resizeGalleryItems();
});

window.addEventListener('resize', resizeGalleryItems);
