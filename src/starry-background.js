// Starry background
const canvas = document.getElementById('starry-background');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];

function createStars() {
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            opacity: Math.random(),
            twinkle: Math.random() * 0.03,
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        star.opacity += star.twinkle * (Math.random() > 0.5 ? 1 : -1);
        star.opacity = Math.max(0.1, Math.min(1, star.opacity)); // Clamp opacity
    });
}

function animateStars() {
    drawStars();
    requestAnimationFrame(animateStars);
}

// Initialize stars and animation
createStars();
animateStars();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars.length = 0;
    createStars();
});