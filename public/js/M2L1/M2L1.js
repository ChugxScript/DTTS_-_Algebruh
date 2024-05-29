let divWidth = 0;
let divHeight = 0;
let currOrientation = 0;

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
    const M1L2Canvas = document.getElementById("M1L2Canvas");
    const gigaGuide = document.getElementById("gigaGuide");
    const battleCanvas = document.getElementById("battleCanvas");
    const feedback_prompt = document.getElementById("feedback_prompt");
    const gigaGuide2 = document.getElementById("gigaGuide2");
    const battle_exit_option = document.getElementById("battle_exit_option");
    const battle_bruhs_option = document.getElementById("battle_bruhs_option");
    const battle_items_option = document.getElementById("battle_items_option");
    const gameResultCanvas = document.getElementById("gameResultCanvas");


    M1L2Canvas.style.width = divWidth + "px";
    M1L2Canvas.style.height = divHeight + "px";

    gigaGuide.style.width = divWidth + "px";
    gigaGuide.style.height = divHeight + "px";

    battleCanvas.style.width = divWidth + "px";
    battleCanvas.style.height = divHeight + "px";

    gigaGuide2.style.width = divWidth + "px";
    gigaGuide2.style.height = divHeight + "px";

    battleCanvas.style.display = 'none';
    feedback_prompt.style.display = 'none';
    battle_exit_option.style.display = 'none';
    battle_bruhs_option.style.display = 'none';
    battle_items_option.style.display = 'none';

    gameResultCanvas.style.display = 'none';
    gameResultCanvas.style.width = divWidth + "px";
    gameResultCanvas.style.height = divHeight + "px";
}

// Resize canvas initially when the page loads or window resize event
window.onload = handleOrientationChange;
window.addEventListener('resize', handleOrientationChange);

// Call handleOrientationChange() on window load and orientation change
window.addEventListener("load", handleOrientationChange);
window.addEventListener("orientationchange", handleOrientationChange);



function closeBattle_exit_option() {
    const battle_exit_option = document.getElementById('battle_exit_option');
    battle_exit_option.style.display = 'none';
}
function closeBattle_bruhs_option() {
    const battle_bruhs_option = document.getElementById('battle_bruhs_option');
    battle_bruhs_option.style.display = 'none';
}
function closeBattle_items_option() {
    const closeBattle_items_option = document.getElementById('battle_items_option');
    closeBattle_items_option.style.display = 'none';
}