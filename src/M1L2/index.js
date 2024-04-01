// Initialize canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let currOrientation = 0; 
let scene = -1;
let currentImage = new Image();

const scenes = [
    // scene 1 scripts
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Sc1.png?raw=true",
    
    // title
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.png?raw=true",
    
    // lectures
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.1.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.2.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.3.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.4.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.5.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.6.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.7.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.8.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.9.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.10.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.11.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.12.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.13.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.14.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.15.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.16.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.17.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.18.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.19.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.20.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.21.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.22.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.23.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.24.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.25.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.26.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.27.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.28.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.29.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.30.png?raw=true",
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2.31.png?raw=true",

    // battle
    "https://github.com/ChugxScript/MAB_-_Algebruh/blob/main/other/M1-lesson2/M1S1Lec2Battle1.png?raw=true",
]

// functuon to resize the canvas
function resizeCanvas(){
    if (window.innerWidth < window.innerHeight) {
        canvas.width = window.innerHeight;
        canvas.height = window.innerWidth;
    } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

// Function to check if the device is in landscape orientation
function isLandscape() {
    return window.matchMedia("(orientation: landscape)").matches;
}

// Function to check if the device is in portrait orientation
function isPortrait() {
    return window.matchMedia("(orientation: portrait)").matches;
}

// Function to handle orientation change
function handleOrientationChange() {
    if (isLandscape()) {
        currOrientation = 1; 
        console.log("Device is now in landscape orientation");
    } else if (isPortrait()) {
        currOrientation = 2;
        console.log("Device is now in portrait orientation");
    } else {
        currOrientation = 0;
        console.log("Orientation not detected or not supported");
    }
}

// Check if the mouse click is inside the circle
function isInsideCircleNextScene(mouseX, mouseY) {
    let circleXx = 0;
    let circleYy = 0;
    let circleRadius = 0;

    if (currOrientation == 1) {
        circleXx = canvas.width - 90;
        circleYy = canvas.height - 90;
        circleRadius = 150;

        const distanceSq = (mouseX - circleXx) ** 2 + (mouseY - circleYy) ** 2;
        const radiusSq = circleRadius ** 2;
        console.log(`[1] distanceSq = ${distanceSq} | radiusSq = ${radiusSq}`);
        return distanceSq <= radiusSq;

    } else if (currOrientation == 2) {
        circleXx = 50;
        circleYy = canvas.width - 40;
        circleRadius = 50;

        const distanceSq = (mouseY - circleYy) ** 2 + (mouseX - circleXx) ** 2;
        const radiusSq = circleRadius ** 2;
        console.log(`[2] distanceSq = ${distanceSq} | radiusSq = ${radiusSq}`);
        return distanceSq <= radiusSq;
    }
}
function isInsideCirclePreviousScene(mouseX, mouseY) {
    let circleXx = 0;
    let circleYy = 0;
    let circleRadius = 0;

    if (currOrientation == 1) {
        circleXx = 100;
        circleYy = canvas.height - 100;
        circleRadius = 150;

        const distanceSq = (mouseX - circleXx) ** 2 + (mouseY - circleYy) ** 2;
        const radiusSq = circleRadius ** 2;
        console.log(`[3] distanceSq = ${distanceSq} | radiusSq = ${radiusSq}`);
        return distanceSq <= radiusSq;

    } else if (currOrientation == 2) {
        circleXx = 40;
        circleYy = 40;
        circleRadius = 50;

        const distanceSq = (mouseX - circleXx) ** 2 + (mouseY - circleYy) ** 2;
        const radiusSq = circleRadius ** 2;
        console.log(`[4] distanceSq = ${distanceSq} | radiusSq = ${radiusSq}`);

        return distanceSq <= radiusSq;
    }
}

function drawClickableCircleNextScene() {
    let circleX = 0;
    let circleY = 0;
    let circleRadius = 0;
    let circleBorderWidth = 0;

    if (currOrientation == 1) {
        circleX = canvas.width - 90;
        circleY = canvas.height - 90;
        circleRadius = 150;
        circleBorderWidth = 2;
    } else if (currOrientation == 2) {
        circleX = canvas.width - 40;
        circleY = canvas.height - 40;
        circleRadius = 50;
        circleBorderWidth = 2;
    }
    
    // add here clickable circle with a border width of 1
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
    ctx.strokeStyle = "#000"; // Black border color
    ctx.lineWidth = circleBorderWidth; // Border width
    ctx.stroke();
}
function drawClickableCirclePreviousScene() {
    let circleX = 0;
    let circleY = 0;
    let circleRadius = 0;
    let circleBorderWidth = 0;

    if (currOrientation == 1) {
        circleX = 100;
        circleY = canvas.height - 100;
        circleRadius = 150;
        circleBorderWidth = 2;
    } else if (currOrientation == 2) {
        circleX = 40;
        circleY = canvas.height - 40;
        circleRadius = 50;
        circleBorderWidth = 2;
    }

    // add here clickable circle with a border width of 1
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
    ctx.strokeStyle = "#000"; // Black border color
    ctx.lineWidth = circleBorderWidth; // Border width
    ctx.stroke();
}

// change scene of user click the circle
function changeNextScene(phase) {
    
    if (phase == 0) {
        scene += 1;
        currentImage.src = scenes[scene];
    } else if (phase == 1) {
        scene += 1;
        currentImage.src = scenes[scene];
    } else if (phase == 2) {
        scene -= 1;
        currentImage.src = scenes[scene];
    }
}

// Game loop
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (scene == 1) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height); 
    }
    ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
    // ctx.drawImage(printIMG, 0, 0, 100, 100);

    drawClickableCirclePreviousScene();
    drawClickableCircleNextScene();

    // Add more landscape elements and game logic here

    // Request next frame
    requestAnimationFrame(gameLoop);
}




// event listeners

// Resize canvas initially when the page loads or window resize event
window.onload = resizeCanvas;
window.addEventListener('resize', resizeCanvas);

// Call handleOrientationChange() on window load and orientation change
window.addEventListener("load", handleOrientationChange);
window.addEventListener("orientationchange", handleOrientationChange);

window.addEventListener("load", changeNextScene(0));
// window.onload = changeNextScene(0);

// change scene if user flick the circle
canvas.addEventListener("click", function(event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    if (scene <= 1) {
        changeNextScene(0);
    } else {
        if (isInsideCircleNextScene(mouseX, mouseY)) {
            // Clicked inside the circle, perform actions
            changeNextScene(1);
            console.log("Circle NextScene clicked!");
        }
        if (isInsideCirclePreviousScene(mouseX, mouseY)) {
            // Clicked inside the circle, perform actions
            changeNextScene(2);
            console.log("Circle PreviousScene clicked!");
        }
    }
});

// Start the game loop
gameLoop();