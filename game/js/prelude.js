// Updated scenario data
const scenarios = [
    {
        texts: [
            "Welcome to the adventure game!",
            "You find yourself in a mysterious forest.",
            "A stranger approaches and says, 'Greetings, adventurer.'",
            "Click anywhere to continue the conversation.",
            "You embark on a journey filled with challenges and discoveries."
        ],
    },
    {
        texts: [
            "You've entered a magical portal.",
            "The world around you transforms into a surreal landscape.",
            "A mystical being appears and guides you.",
            "Click anywhere to continue the conversation.",
            "Your destiny awaits in this enchanted realm.",
        ],
    },
    {
        texts: [
            "Pick your Pal!",
        ],
    },
    {
        "texts": [
          "As you step through the ancient gateway, reality shifts around you.",
          "Colors morph into hues unseen, and the air crackles with mystic energy.",
          "A figure materializes, an ethereal guide beckoning you forward.",
          "Click on the unknown path to unveil the secrets of this mystical journey.",
          "In this realm, your fate intertwines with the threads of magic and mystery.",
        ],
      },      
    // Add more scenarios as needed
];

let currentScenarioIndex = 0;
let currentDialogIndex = 0;
let allowNextDialog = true;

function init() {
    document.getElementById('dialog-bbox-s2').style.display = 'none';
    const characterGridElement = document.getElementsByClassName("character-grid")[0];
    characterGridElement.style.display = 'none';

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
    } else if (currentScenarioIndex == 2) {
        // Disable moving to the next dialog until the user picks their character
        allowNextDialog = false;

        // show cahracters
        const characterGridElement = document.getElementsByClassName("character-grid")[0];
        characterGridElement.style.display = 'flex';

        if (selectedCharacter != null) {
            allowNextDialog = true;
            nextDialog();
        }
    } else if (currentScenarioIndex == 3) {
        // Hide unselected characters
        const characters = document.getElementsByClassName("character");
        for (let i = 0; i < characters.length; i++) {
            if (characters[i] !== selectedCharacter) {
                characters[i].style.display = 'none';
            }
        }

        
    }
}

function nextDialog() {
    if (currentDialogIndex < scenarios[currentScenarioIndex].texts.length - 1) {
        currentDialogIndex++;
        updateDialog();
    } else {
        // End of dialog in the current scenario, transition to the next scenario
        scenarioB();
    }
}

function scenarioB() {
    if (currentScenarioIndex < scenarios.length - 1) {
        // Move to the next scenario
        currentScenarioIndex++;
        currentDialogIndex = 0; // Reset dialog index for the new scenario
        updateDialog();

    } else {
        // No more scenarios, game end or loop back to the beginning
        alert("End of the game");
    }
}

// charater selection
let selectedCharacter = null;

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
    allowNextDialog = true;
    nextDialog();
}

updateDialog();
init();