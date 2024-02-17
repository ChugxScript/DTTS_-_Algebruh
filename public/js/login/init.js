document.addEventListener('DOMContentLoaded', function () {
    // Get the video element
    const bgVideo = document.getElementById('bg-video');

    // Set the source dynamically
    const videoSource = 'https://www.shutterstock.com/shutterstock/videos/3404669823/preview/stock-footage-forest-pixel-art-background-animation-d-pixel-video-game-daytime-with-green-grass-fir-trees-and.webm';
    const sourceElement = document.createElement('source');
    sourceElement.src = videoSource;
    sourceElement.type = 'video/mp4';
    bgVideo.style.objectFit = 'cover';

    // Set width and height to 100%
    bgVideo.style.width = '100%';
    bgVideo.style.height = '100%'

    // Append the source to the video element
    bgVideo.appendChild(sourceElement);
});

