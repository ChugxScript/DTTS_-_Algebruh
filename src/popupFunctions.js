// background
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


function init() {

}

// Array of button names
const buttonNames = [
    {
        btn_name: 'Create New Account',
        btn_color: 'white',
        btn_background: 'blue'
    },
    {
        btn_name: 'Sign in',
        btn_color: 'black',
        btn_background: 'wheat'
    }
];
function showLoginPopup() {
    // Clear previous buttons
    document.getElementById('buttons').innerHTML = '';

    // Get the buttons container
    const buttonsContainer = document.getElementById('buttons');

    // Create buttons and append them to the container
    buttonNames.forEach(buttonName => {
        const button = document.createElement('div');
        button.className = 'buttons-text';
        button.textContent = buttonName.btn_name;
        button.style.color = buttonName.btn_color;
        button.style.backgroundColor = buttonName.btn_background;
        // Set click event for the stage
        button.onclick = () => handleButtonClick(buttonName.btn_name);
        buttonsContainer.appendChild(button);
    });

    // Show the popup
    document.getElementById('loginPopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}
function closeLoginPopup() {
    document.getElementById('loginPopup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}
function handleButtonClick(buttonName) {
    if (buttonName == 'Create New Account') {
        showCreateNewAccountPopup();
    } else if (buttonName == 'Sign in') {
        showSignInAccountPopup();
    }
}
const buttonNamesCreateNewAccount = [
    {
        btn_name: 'Create New Account',
        btn_color: 'white',
        btn_background: 'blue'
    },
    {
        btn_name: 'Sign in',
        btn_color: 'black',
        btn_background: 'wheat'
    }
];
function showCreateNewAccountPopup() {
    // Clear previous buttons
    document.getElementById('buttonsCreateNewAccount').innerHTML = '';

    // Get the buttons container
    const buttonsContainer = document.getElementById('buttonsCreateNewAccount');

    // Create buttons and append them to the container
    buttonNames.forEach(buttonName => {
        const button = document.createElement('div');
        button.className = 'buttons-text';
        button.textContent = buttonName.btn_name;
        button.style.color = buttonName.btn_color;
        button.style.backgroundColor = buttonName.btn_background;
        // Set click event for the stage
        button.onclick = () => handleButtonClick(buttonName.btn_name);
        buttonsContainer.appendChild(button);
    });
    // Show the popup
    document.getElementById('createNewAccountPopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}
function closeCreateNewAccountPopup() {
    document.getElementById('createNewAccountPopup').style.display = 'none';
}
function showSignInAccountPopup() {
    // Show the popup
    document.getElementById('signInAccountPopup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}
function closeSignInAccountPopup() {
    document.getElementById('signInAccountPopup').style.display = 'none';
}

init();