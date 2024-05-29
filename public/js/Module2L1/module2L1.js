let currentImageIndex = 0;
const images = [];
for (let i = 36; i <= 63; i++) {
    images.push(`assets/images/${i}.png`);
}

function changeImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    document.getElementById('dynamic-image').src = images[currentImageIndex];

    if (currentImageIndex === images.length - 1) { // Check if the last image is reached
        window.location.href = 'm2l1quiz/start.html';
    }
}