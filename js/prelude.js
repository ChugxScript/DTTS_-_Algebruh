// Updated scenario data
const scenarios = [
    {
        texts: [
            "Welcome to the adventure game!",
            "Welcome! ",
            "Welcome! Welcome! ",
            "Welcome! Welcome! Welcome! ",
            "Welcome! Welcome! Welcome! Welcome! ",
        ],
    },
    {
        texts: [
            "Game? ",
            "Game? Game? ",
            "Game? Game? Game? ",
            "Game? Game? Game? Game? ",
            "Game? Game? Game? Game? Game? ",
        ],
    },
    {
        texts: [
            "Pick your Pal!",
        ],
    },
    {
        texts: [
          "Blah ",
          "Blah Blah ",
          "Blah Blah Blah ",
          "Blah Blah Blah Blah ",
          "Blah Blah Blah Blah Blah ",
        ],
    },      
    {
        texts: [
          "Battle ",
          "Battle Battle ",
          "Battle Battle Battle ",
          "Battle Battle Battle Battle ",
          "Battle Battle Battle Battle Battle ",
        ],
    },    
    {
        texts: [
          "Congratulations! ",
          "Congratulations! Congratulations! ",
          "Congratulations! Congratulations! Congratulations! ",
          "Congratulations! Congratulations! Congratulations! Congratulations! ",
          "Congratulations! Congratulations! Congratulations! Congratulations! Congratulations! ",
        ],
    },   
    // Add more scenarios as needed
];
const reviveScripts = [
    {
        texts: [
            "Revive! ",
            "Revive! Revive! ",
            "Revive! Revive! Revive! ",
            "Revive! Revive! Revive! Revive! ",
            "Revive! Revive! Revive! Revive! Revive! ",
        ],
    },
];

let currentScenarioIndex = 0;
let currentDialogIndex = 0;
let allowNextDialog = true;

function init() {
    // hide
    document.getElementById('dialog-bbox-s2').style.display = 'none';
    const characterGridElement = document.getElementsByClassName("character-grid")[0];
    characterGridElement.style.display = 'none';
    // enemy
    const showEnemyA = document.getElementsByClassName("enemy-a")[0];
    showEnemyA.style.display = 'none';
    // enemy skills
    const enemySkillsAShow = document.getElementsByClassName("enemy-a-ques-a")[0];
    enemySkillsAShow.style.display = 'none';
    // character (test)
    const showCharA = document.getElementsByClassName("char-battle-a")[0];
    showCharA.style.display = 'none';
    // character skills
    const charSkillsAShow = document.getElementsByClassName("char-skills-a")[0];
    charSkillsAShow.style.display = 'none';
    // texts
    document.getElementById('question').style.display = 'none';
    document.getElementById('choices').style.display = 'none';
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('enemyHp').style.display = 'none';
    document.getElementById('characterHp').style.display = 'none';
    document.getElementById('reviveScript').style.display = 'none';

    // Attach click event listener to the document body
    document.body.addEventListener('click', function () {
        if (allowNextDialog) {
            nextDialog();
        }
    });
}

function updateDialog() {
    const dialogTextElement = document.getElementById('dialog-text');
    dialogTextElement.textContent = scenarios[currentScenarioIndex].texts[currentDialogIndex];

    // Changing contents and bboxes
    if (currentScenarioIndex == 1) {
        document.getElementById('dialog-bbox').style.display = 'none';
        document.getElementById('dialog-bbox-s2').style.display = 'block';
        // Get all elements with the class 'dialog-script'
        const elements = document.getElementsByClassName("dialog-script");

        // Iterate through the collection and add the class 'dialog-script-s2' to each element
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.add('dialog-script-s2');
        }
        document.getElementById('click-to-continue').classList.remove('click-to-continue');
        document.getElementById('click-to-continue').classList.add('click-to-continue-s2');
    } else if (currentScenarioIndex == 2) {
        // Disable moving to the next dialog until the user picks their character
        allowNextDialog = false;

        // show cahracters
        const characterGridElement = document.getElementsByClassName("character-grid")[0];
        characterGridElement.style.display = 'flex';

    } else if (currentScenarioIndex == 3) {
        // Hide unselected characters
        const characters = document.getElementsByClassName("character");
        for (let i = 0; i < characters.length; i++) {
            if (characters[i] !== selectedCharacter) {
                characters[i].style.display = 'none';
            }
        }
        allowNextDialog = true;
    } else if (currentScenarioIndex == 4) {
        // hide contents
        // characters
        const characterGridElement = document.getElementsByClassName("character-grid")[0];
        characterGridElement.style.display = 'none';
        // text
        const elements = document.getElementsByClassName("dialog-script");
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
        // giga-guide
        const gigaGuide = document.getElementsByClassName("lower-left-image")[0];
        gigaGuide.style.display = 'none';
        // dialog box
        document.getElementById('dialog-bbox-s2').style.display = 'none';

        // temporary disable the next dialog
        allowNextDialog = false;

        // show enemy for 3sec
        const showEnemyA = document.getElementsByClassName("enemy-a")[0];
        showEnemyA.style.display = 'block';
        setTimeout(() => {
            // enemy
            showEnemyA.classList.add('enemy-a-battle');
            // enemy skill
            const enemySkillsAShow = document.getElementsByClassName("enemy-a-ques-a")[0];
            enemySkillsAShow.style.display = 'block';

            // character
            characterGridElement.style.display = 'flex';
            moveElementTo(characterGridElement, 370, 100);
            // character skills
            const charSkillsAShow = document.getElementsByClassName("char-skills-a")[0];
            charSkillsAShow.style.display = 'block';
            // Update font size for the character text
            updateTextFontSize(selectedCharacterID, 10);

            // texts
            document.getElementById('question').style.display = 'block';
            document.getElementById('choices').style.display = 'flex';
            document.getElementById('feedback').style.display = 'block';
            document.getElementById('enemyHp').style.display = 'block';
            document.getElementById('characterHp').style.display = 'block';

            // Initial setup
            simulateUserResponse(true); // Simulate the first user response
            // Call updateHpDisplay() after initializing the question
            updateHpDisplay();
        }, 3000);
    } else if  (currentScenarioIndex == 5) {
        // hide contents
        // enemy
        const showEnemyA = document.getElementsByClassName("enemy-a")[0];
        showEnemyA.style.display = 'none';
        // enemy box
        const enemySkillsAShow = document.getElementsByClassName("enemy-a-ques-a")[0];
        enemySkillsAShow.style.display = 'none';

        // character
        const characterGridElement = document.getElementsByClassName("character-grid")[0];
        characterGridElement.style.display = 'none';
        // character box
        const charSkillsAShow = document.getElementsByClassName("char-skills-a")[0];
        charSkillsAShow.style.display = 'none';

        // texts
        document.getElementById('question').style.display = 'none';
        document.getElementById('choices').style.display = 'none';
        document.getElementById('feedback').style.display = 'none';
        document.getElementById('enemyHp').style.display = 'none';
        document.getElementById('characterHp').style.display = 'none';

        // show giga-guide
        const gigaGuide = document.getElementsByClassName("lower-left-image")[0];
        gigaGuide.style.display = 'block';
        // dialog box
        document.getElementById('dialog-bbox').style.display = 'block';
        // dialog script
        const elements = document.getElementsByClassName("dialog-script");
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = 'block';
        }
        // Iterate through the collection and add the class 'dialog-script-s2' to each element
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('dialog-script-s2');
            elements[i].classList.add('move-up');
        }
        document.getElementById('click-to-continue').style.display = 'block';
        if (!isRevive) {
            document.getElementById('click-to-continue').classList.add('click-to-continue');
            document.getElementById('click-to-continue').classList.remove('click-to-continue-s2');
        }
        allowNextDialog = true;
    }
}

function nextDialog() {
    if (currentDialogIndex < scenarios[currentScenarioIndex].texts.length - 1) {
        currentDialogIndex++;
        updateDialog();
    } else {
        // End of dialog in the current scenario, transition to the next scenario
        nextScene();
    }
}

function nextScene() {
    if (currentScenarioIndex < scenarios.length - 1) {
        // Move to the next scenario
        currentScenarioIndex++;
        currentDialogIndex = 0; // Reset dialog index for the new scenario
        updateDialog();

    } else {
        // No more scenarios, game end or loop back to the beginning
        // Redirect to the prelude HTML
        window.location.href = 'dashboard.html';
    }
}

// charater selection
let selectedCharacter = null;
let selectedCharacterID = null;

function toggleHighlight(characterId) {
    const character = document.getElementById(characterId);

    if (selectedCharacter === character) {
        // Clicked the same character, remove highlight and close details modal
        character.classList.remove('highlight');
        selectedCharacter = null;
        closeCharacterDetailsModal();
    } else if (selectedCharacter) {
        // Remove highlight from the previously selected character
        selectedCharacter.classList.remove('highlight');
        // Highlight the newly selected character
        character.classList.add('highlight');
        selectedCharacter = character;
        showCharacterDetails(characterId);
    } else {
        // Highlight the newly selected character
        character.classList.add('highlight');
        selectedCharacter = character;
        showCharacterDetails(characterId);
    }
    selectedCharacterID = characterId;
}

// character details popup
function openCharacterDetailsModal() {
    const modal = document.getElementById('characterDetailsModal');
    modal.style.display = 'block';
}

function closeCharacterDetailsModal() {
    const modal = document.getElementById('characterDetailsModal');
    modal.style.display = 'none';
}

function showCharacterDetails(characterId) {
    // Add logic to display character details based on the characterId
    const characterDetails = document.getElementById('characterDetails');
    characterDetails.textContent = `Details for Character ${characterId}`;
    openCharacterDetailsModal();
}

function selectCharacter() {
    // Add logic to handle character selection and proceed to the next dialog
    closeCharacterDetailsModal();
    nextScene();
}

// modifying the character and its texts
function moveElementTo(element, top, left) {
    element.style.top = top + 'px';
    element.style.left = left + 'px';
}
function resizeElement(element, width, height) {
    element.style.width = width + 'px';
    element.style.height = height + 'px';
}
function updateTextFontSize(element, newSize) {
    const textElement = document.getElementById(element).querySelector('p');
    if (textElement) {
        textElement.style.fontSize = newSize + 'px';
    }
}

// Decision Tree Thompson Sampling (DTTS) Algorithm
const dttsAlgorithm = {
    easy: { successes: 1, failures: 1 },
    difficult: { successes: 1, failures: 1 }
};

// Function to simulate user responses and update DTTS algorithm
function simulateUserResponse(isCorrect) {
    const chosenLevel = thompsonSampling(dttsAlgorithm);

    // Set a default level if chosenLevel is undefined
    const defaultLevel = 'easy';
    const actualChosenLevel = chosenLevel || defaultLevel;

    // Simulate user response and update DTTS algorithm
    if (dttsAlgorithm[actualChosenLevel]) {
        if (isCorrect) {
            dttsAlgorithm[actualChosenLevel].successes++;
        } else {
            dttsAlgorithm[actualChosenLevel].failures++;
        }

        displayQuestion(actualChosenLevel);
    } else {
        console.log(`chosen level = ${actualChosenLevel} | dtts algo = ${dttsAlgorithm[actualChosenLevel]}`);
    }
}

// Thompson Sampling with Beta distribution
function thompsonSampling(levels) {
    const sampledProbabilities = Object.keys(levels).map(level => {
        const { successes, failures } = levels[level];
        const alpha = successes + 1;
        const beta = failures + 1;
        return Math.random() * (alpha + beta) < alpha ? level : null;
    });

    // Choose the level with the highest sampled probability, or return a default level
    const chosenLevel = sampledProbabilities.filter(level => level !== null)[0] || 'easy';
    return chosenLevel;
}


// Display question based on the chosen difficulty level
function displayQuestion(difficultyLevel) {
    const questionElement = document.getElementById("question");
    const choicesElement = document.getElementById("choices");
    
    // Implement logic to fetch the next question based on the difficulty level
    // For simplicity, I'll use a predefined array of questions for each level
    const questionsByLevel = {
        easy: [
            { question: "1 + 1", choices: ["1", "2", "3", "4"], correctAnswer: "2" },
            { question: "2 + 2", choices: ["1", "2", "3", "4"], correctAnswer: "4" },
            { question: "3 + 3", choices: ["6", "8", "10", "4"], correctAnswer: "6" },
            { question: "4 + 4", choices: ["6", "8", "10", "4"], correctAnswer: "8" },
            { question: "5 + 5", choices: ["6", "8", "10", "4"], correctAnswer: "10" },
            // Add more easy questions as needed
        ],
        difficult: [
            { question: "1 x 1", choices: ["1", "2", "3", "4"], correctAnswer: "1" },
            { question: "2 x 2", choices: ["1", "2", "3", "4"], correctAnswer: "4" },
            { question: "3 x 3", choices: ["9", "8", "10", "4"], correctAnswer: "9" },
            { question: "4 x 4", choices: ["6", "8", "16", "4"], correctAnswer: "16" },
            { question: "5 x 5", choices: ["6", "25", "20", "4"], correctAnswer: "25" },
            // Add more difficult questions as needed
        ],
    };

    const currentQuestion = getRandomQuestion(questionsByLevel[difficultyLevel]);
    
    // Display the question and choices
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";

    const choicesRow = document.createElement("div");
    choicesRow.classList.add("choices-row");

    currentQuestion.choices.forEach((choice, index) => {
        const choiceElement = document.createElement("div");
        choiceElement.classList.add("choice");
        choiceElement.textContent = choice;
        choiceElement.onclick = () => checkAnswer(choice, currentQuestion.correctAnswer);
        choicesRow.appendChild(choiceElement);
    });
    choicesElement.appendChild(choicesRow);

    // display initial feedback
    const feedbackElement = document.getElementById("feedback");
    feedbackElement.textContent = "A wild unknown shit appeard! Choose a correct skill to fuck them off! HAHAHAHAHA";
}

// Helper function to get a random question from an array
function getRandomQuestion(questions) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}

// Function to check the user's answer
function checkAnswer(selectedChoice, correctAnswer) {
    const feedbackElement = document.getElementById("feedback");

    if (selectedChoice === correctAnswer) {
        enemyHp -= 10;
        feedbackElement.textContent = `You use ${selectedChoice}! It's very effective! It moans with agaony!`;
        // feedbackElement.style.color = "green";
    } else {
        characterHp -= 2;
        feedbackElement.textContent = `You use ${selectedChoice}! Holy shit! it got turned on! Run!`;
        // feedbackElement.style.color = "red";
    }

    // Update the display of HP values
    updateHpDisplay();

    // Simulate the next question after a short delay
    setTimeout(() => {
        feedbackElement.textContent = "MORE! MORE! MORE! MORE! MORE!";
        simulateUserResponse(Math.random() < 0.8); // Simulate correctness (80% chance of being correct)
    }, 1000);

    if (characterHp <= 0) {
        handleCharacterDefeat();
    } else if (enemyHp <= 0) {
        nextScene();
    }
}

function handleCharacterDefeat() {
    // giga-guide
    const gigaGuide = document.getElementsByClassName("lower-left-image")[0];
    gigaGuide.style.display = 'block';
    gigaGuide.classList.add('move-up');

    // dialog box
    const dialogBox = document.getElementById('dialog-bbox');
    dialogBox.style.display = 'block';
    dialogBox.classList.add('move-up');

    // dialog script
    const reviveScript = document.getElementById('reviveScript');
    reviveScript.style.display = 'block';
    reviveScript.classList.add('move-up');

    // click to continue
    const clickToContinue = document.getElementById('click-to-continue');
    clickToContinue.style.display = 'block';
    clickToContinue.classList.add('move-up');
    clickToContinue.classList.add('click-to-continue');
    clickToContinue.classList.remove('click-to-continue-s2');

    // dialog script
    const dialogTextElementRevive = document.getElementById('reviveScript');
    if (reviveIndex < reviveScripts.length) {
        const texts = reviveScripts[reviveIndex].texts;
        dialogTextElementRevive.textContent = texts[0];

        // Define the click listener outside of the if block
        function clickListener() {
            const currentTextIndex = texts.indexOf(dialogTextElementRevive.textContent);
            if (currentTextIndex < texts.length - 1) {
                dialogTextElementRevive.textContent = texts[currentTextIndex + 1];
            } else {
                // If all texts are displayed, move to the next scenario
                reviveIndex = 0;
                characterHp = 10;

                // hide content
                gigaGuide.style.display = 'none';
                dialogBox.style.display = 'none';
                reviveScript.style.display = 'none';
                clickToContinue.style.display = 'none';

                // Remove the click listener to avoid multiple clicks
                document.body.removeEventListener('click', clickListener);

                isRevive = true;
                updateHpDisplay();
            }
        }

        // Attach the click listener outside of the if block
        document.body.addEventListener('click', clickListener);
    }
}

// Initialize HP values
let enemyHp = 10;
let characterHp = 10;
let reviveIndex = 0;
let isRevive = false;

function updateHpDisplay() {
    // Update the display of HP values
    document.getElementById('enemyHp').textContent = `Enemy HP: ${enemyHp}`;
    document.getElementById('characterHp').textContent = `Your HP: ${characterHp}`;
}

updateDialog();
init();
