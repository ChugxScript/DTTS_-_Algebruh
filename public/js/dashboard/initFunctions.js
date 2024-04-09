let divWidth = 0;
let divHeight = 0;

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
    const dashboardCanvas = document.getElementById("dashboardCanvas");


    dashboardCanvas.style.width = divWidth + "px";
    dashboardCanvas.style.height = divHeight + "px";
    
    if (currOrientation == 1) {
        

    } else {
        
    }
}

// Resize canvas initially when the page loads or window resize event
window.onload = handleOrientationChange;
window.addEventListener('resize', handleOrientationChange);

// Call handleOrientationChange() on window load and orientation change
window.addEventListener("load", handleOrientationChange);
window.addEventListener("orientationchange", handleOrientationChange);


function closeProfileContainer() {
    const profileContainer = document.getElementById('profileContainer');
    profileContainer.style.display = 'none';
}
function closeEditProfileForm() {
    const editProfileForm = document.getElementById('editProfileForm');
    editProfileForm.style.display = 'none';
}
function closeInventoryContainer() {
    const inventoryContainer = document.getElementById('inventoryContainer');
    inventoryContainer.style.display = 'none';
}
function closeInvShowDetails() {
    const invShowDetails = document.getElementById('invShowDetails');
    invShowDetails.style.display = 'none';
}
function closeJourneyContainer() {
    const journeyContainer = document.getElementById('journeyContainer');
    journeyContainer.style.display = 'none';
}
function closeShopContainer() {
    const shopContainer = document.getElementById('shopContainer');
    shopContainer.style.display = 'none';
}
function closeShopShowDetails() {
    const shopShowDetails = document.getElementById('shopShowDetails');
    shopShowDetails.style.display = 'none';
}
function closeAreYouSure() {
    const areYouSure = document.getElementById('areYouSure');
    areYouSure.style.display = 'none';
}
function closeSettingsContainer() {
    const settingsContainer = document.getElementById('settingsContainer');
    settingsContainer.style.display = 'none';
}