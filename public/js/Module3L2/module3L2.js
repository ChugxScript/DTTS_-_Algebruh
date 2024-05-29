let currentImageIndex = 0;
const images = [];
for (let i = 20; i <= 33; i++) {
    images.push(`assets/images/${i}.png`);
}

function changeImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    document.getElementById('dynamic-image').src = images[currentImageIndex];

    if (currentImageIndex === images.length - 1) { // Check if the last image is reached
        window.location.href = 'm3l2quiz/start.html';
    }
}