let divWidth = 0;
let divHeight = 0;
let isUsername = false;
let isEmail = false;
let isPassword = false;

function handleOrientationChange() {
    if (isLandscape()) {
        divWidth = window.innerWidth;
        divHeight = window.innerHeight;
        currOrientation = 1; 
        setContent();
        console.log("Device is now in landscape orientation");
    } else if (isPortrait()) {
        divWidth = window.innerHeight;
        divHeight = window.innerWidth;
        currOrientation = 2;
        setContent();
        console.log("Device is now in portrait orientation");
    } else {
        currOrientation = 0;
        console.log("Orientation not detected or not supported");
    }
}

function isLandscape() {
    return window.matchMedia("(orientation: landscape)").matches;
}
function isPortrait() {
    return window.matchMedia("(orientation: portrait)").matches;
}

function setContent() {
    const pageCanvas = document.getElementById("pageCanvas");
    const pageTitle = document.getElementById("pageTitle");
    const pageForm = document.getElementById("pageForm");
    const createAccForm = document.getElementById("createAccForm");
    
    // bg
    pageCanvas.style.width = divWidth + "px";
    pageCanvas.style.height = divHeight + "px";

    // title
    pageTitle.style.width = divWidth + "px";
    pageTitle.style.height = divHeight + "px";

    if (currOrientation == 1) {
        // page form
        pageForm.style.width = "600px";
        pageForm.style.height = "90%";
        pageForm.style.left = (divWidth - (pageForm.offsetWidth + 50))+ "px";
        pageForm.style.top = ((divHeight - pageForm.offsetHeight) / 2)+ "px";

        // create acc form
        createAccForm.style.width = "600px";
        createAccForm.style.height = "90%";
        createAccForm.style.left = (divWidth - (pageForm.offsetWidth + 50))+ "px";
        createAccForm.style.top = ((divHeight - pageForm.offsetHeight) / 2)+ "px";
    } else {
        // page form
        // pageForm.style.width = "250px";
        // pageForm.style.height = "90%";
        // pageForm.style.left = (divWidth - (pageForm.offsetWidth + 10))+ "px";
        // pageForm.style.top = ((divHeight - pageForm.offsetHeight) / 2)+ "px";

        // createAccForm.style.width = "250px";
        // createAccForm.style.height = "90%";
        // createAccForm.style.left = (divWidth - (pageForm.offsetWidth + 10))+ "px";
        // createAccForm.style.top = ((divHeight - pageForm.offsetHeight) / 2)+ "px";

        console.log(`divWidth: ${divWidth}`);
        console.log(`divHeight: ${divWidth}`);
        console.log(`(divWidth - (pageForm.offsetWidth + 10)): ${(divWidth - (pageForm.offsetWidth + 10))}`);
        console.log(`((divHeight - pageForm.offsetHeight) / 2): ${((divHeight - pageForm.offsetHeight) / 2)}`);

    }
}

function validateEmail(email) {
    // Regular expression pattern for validating email addresses
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
function checkPasswordStrength(password) {
    // Analyze the password using zxcvbn
    const result = zxcvbn(password);
    
    // Get the password score from zxcvbn (0 to 4)
    const score = result.score;
    
    // Return true if the score is 3 or higher (strong password), false otherwise
    return score >= 3;
}

// Resize canvas initially when the page loads or window resize event
window.onload = handleOrientationChange;
window.addEventListener('resize', handleOrientationChange);

// Call handleOrientationChange() on window load and orientation change
window.addEventListener("load", handleOrientationChange);
window.addEventListener("orientationchange", handleOrientationChange);


// if create account is clicked
const createAccButton = document.getElementById('createAccButton');
createAccButton.addEventListener('click', function() {
    const pageForm = document.getElementById('pageForm');
    pageForm.style.display = 'none';
    const createAccForm = document.getElementById('createAccForm');
    createAccForm.style.display = 'flex';
})

// if cancel button is clicked in create account form
const cancelCreateAccButton = document.getElementById('cancelCreateAccButton');
cancelCreateAccButton.addEventListener('click', function() {
    const createAccForm = document.getElementById('createAccForm');
    createAccForm.style.display = 'none';
    const pageForm = document.getElementById('pageForm');
    pageForm.style.display = 'flex';
})

