const displayFeedbackScript = {
    inGame: [
        'good luck!',
        'fight!',
    ],
    correctAns: [
        'nice!',
        'great!',
    ],
    wrongAns: [
        'oh no!',
        'Im not done yet!',
    ],
};


function displayFeedbackScriptFunction(x) {
    const preludeUserRandomScript = document.getElementById('preludeUserRandomScript');
    preludeUserRandomScript.innerHTML = '';

    switch (x) {
        case 0:
            // in-game script
            preludeUserRandomScript.textContent = getRandomScript(displayFeedbackScript.inGame);
            break;
        case 1:
            // correct answer script
            preludeUserRandomScript.textContent = getRandomScript(displayFeedbackScript.correctAns);
            break;
        case 2:
            // wrong answer script
            preludeUserRandomScript.textContent = getRandomScript(displayFeedbackScript.wrongAns);
            break;
        default:
            preludeUserRandomScript.textContent = '[error] wrong parameter.';
    }
}


function getRandomScript(scriptArray) {
    const randomIndex = Math.floor(Math.random() * scriptArray.length);
    return scriptArray[randomIndex];
}