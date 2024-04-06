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
    const pageCanvas = document.getElementById("pageCanvas");
    const gigaGuide = document.getElementById("gigaGuide");
    const scr1 = document.getElementById('scr1');
    const preludeBruhs = document.getElementById('preludeBruhs');
    const bruhDetailsPopup = document.getElementById('bruhDetailsPopup');
    const showPokememe = document.getElementById('showPokememe');
    const preludeBattleCanvas = document.getElementById('preludeBattleCanvas');
    const enemyContainer = document.getElementById('enemyContainer');
    const userContainer = document.getElementById('userContainer');
    const gigaGuide2 = document.getElementById('gigaGuide2');
    const scr2 = document.getElementById('scr2');
    const prompt1 = document.getElementById('prompt1');
    
    // bg
    pageCanvas.style.width = divWidth + "px";
    pageCanvas.style.height = divHeight + "px";

    // title
    gigaGuide.style.width = divWidth + "px";
    gigaGuide.style.height = divHeight + "px";

    // enemy
    showPokememe.style.width = divWidth + "px";
    showPokememe.style.height = divHeight + "px";

    // prelude battle canvas
    preludeBattleCanvas.style.width = divWidth + "px";
    preludeBattleCanvas.style.height = divHeight + "px";
    preludeBattleCanvas.style.display = 'none';

    // battle containers
    enemyContainer.style.height = (divHeight * 0.25) + "px";
    userContainer.style.height = (divHeight * 0.25) + "px";

    // battle giga guide
    gigaGuide2.style.width = divWidth + "px";
    gigaGuide2.style.height = divHeight + "px";
    gigaGuide2.style.display = 'none';
    prompt1.style.display = 'none';
    
    if (currOrientation == 1) {
        // script
        scr1.style.width = "73%";
        scr1.style.right = "30px";
        scr1.style.top = ((divHeight - scr1.offsetHeight) / 4)+ "px";

        // display prelude chars
        preludeBruhs.style.width = "80%";
        preludeBruhs.style.height = "80%";
        preludeBruhs.style.right = "27px";
        preludeBruhs.style.top = (scr1.offsetHeight + 20)+ "px";

        // bruh details popup
        bruhDetailsPopup.style.width = "80%";
        bruhDetailsPopup.style.height = "80%";
        bruhDetailsPopup.style.right = "27px";
        bruhDetailsPopup.style.top = (scr1.offsetHeight + 20)+ "px";

        // script battle
        scr2.style.width = "73%";
        scr2.style.right = "30px";
        scr2.style.top = ((divHeight - scr1.offsetHeight) / 4)+ "px";
        scr2.style.display = 'none';

    } else {
        // script
        scr1.style.width = "600px";
        scr1.style.height = "90%";
        scr1.style.left = (divWidth - (scr1.offsetWidth + 50))+ "px";
        scr1.style.top = ((divHeight - scr1.offsetHeight) / 2)+ "px";
    }
}

// Resize canvas initially when the page loads or window resize event
window.onload = handleOrientationChange;
window.addEventListener('resize', handleOrientationChange);

// Call handleOrientationChange() on window load and orientation change
window.addEventListener("load", handleOrientationChange);
window.addEventListener("orientationchange", handleOrientationChange);