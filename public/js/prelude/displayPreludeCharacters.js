import { 
    db,
    getCurrentUserFromFirestore,
    getCharactersFromFirestore
} from "./getFirestore.js"
import { 
    getDoc,
    doc, 
    updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// Function to display characters on the page
const displayCharacters = async () => {
    const characters = await getCharactersFromFirestore();
    const charactersContainer = document.getElementById('showPreludeCharacters');
    charactersContainer.innerHTML = ''; // Clear previous content

    let rowCounter = 0;
    let currentRow;

    characters.forEach((character) => {
        if (rowCounter % 2 === 0) {
            // Create a new row every 2 items
            currentRow = document.createElement('div');
            currentRow.className = 'prelude-character-selection-row';
            charactersContainer.appendChild(currentRow);
        }
        const characterElement = document.createElement('span');

        // Add click event to show character details
        characterElement.addEventListener('click', () => showCharacterDetails(character));

        const characterImg = document.createElement('img');
        characterImg.src = character.char_img_src;
        characterImg.alt = character.char_name;

        const charNameTextElement = document.createElement('p');
        charNameTextElement.textContent = character.char_name;

        characterElement.appendChild(characterImg);
        characterElement.appendChild(charNameTextElement);
        currentRow.appendChild(characterElement);
        rowCounter++;
    });
};


// Function to show character details
let selectedCharacter = '';
const showCharacterDetails = (character) => {
    const preludeCharactersDetailsPopup = document.getElementById('preludeCharactersDetailsPopup');
    const preludeCharactersDetailsImg = document.getElementById('preludeCharactersDetailsImg');
    const preludeCharactersDetailsContents = document.getElementById('preludeCharactersDetailsContents');
    
    preludeCharactersDetailsPopup.style.display = 'block';
    preludeCharactersDetailsImg.innerHTML = '';
    preludeCharactersDetailsContents.innerHTML = '';

    // create img element then append to the div
    const characterElement = document.createElement('div');
    const characterImg = document.createElement('img');
    characterImg.src = character.char_img_src;
    characterImg.alt = character.char_name;

    const charNameTextElement = document.createElement('p');
    charNameTextElement.textContent = character.char_name;

    characterElement.appendChild(characterImg);
    characterElement.appendChild(charNameTextElement);
    preludeCharactersDetailsImg.appendChild(characterElement);

    // create table element for the character details then append to the div
    const characterDetailTable = document.createElement('table');
    const excludeDetails = ['char_img_src']; // Add details to exclude
    const orderDetails = ['char_name', 'char_hp', 'char_atk'];
    // Populate details as rows in the table based on the specified order
    orderDetails.forEach((detailKey) => {
        if (character.hasOwnProperty(detailKey) && !excludeDetails.includes(detailKey)) {
            const row = document.createElement('tr');
            const cell1 = document.createElement('td');
            const cell2 = document.createElement('td');
            cell1.textContent = detailKey;
            cell2.textContent = character[detailKey];
            row.appendChild(cell1);
            row.appendChild(cell2);
            characterDetailTable.appendChild(row);
        }
    });
    preludeCharactersDetailsContents.appendChild(characterDetailTable);

    selectedCharacter = character;
};


// Add a confirm button click event
const confirmPreludeCharacter = document.getElementById('confirmPreludeCharacter');
confirmPreludeCharacter.addEventListener('click', function () {
    appendConfirmPreludeCharacter(selectedCharacter);
});


const appendConfirmPreludeCharacter = async (character) => {
    // Retrieve the user document from Firestore
    const currentUser = await getCurrentUserFromFirestore();
    const userRef = doc(db, 'users', currentUser[0].currUser_uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        // Get the current user data
        const userData = userDoc.data();

        // Check if the character is not already in userCharacterOwned
        let characterAlreadyOwned = false;

        for (const userCharacterOwned of userData.userCharacterOwned) {
            if (userCharacterOwned.char_uid === character.char_uid) {
                characterAlreadyOwned = true;
                break;
            }
        }

        if (!characterAlreadyOwned) {
            const updatedUserCharacterOwned = [...userData.userCharacterOwned, character];
            await updateDoc(userRef, {
                userCharacterOwned: updatedUserCharacterOwned,
            });
            console.log('Character appended to userCharacterOwned:', character);
        } else {
            console.log('Character already in userCharacterOwned:', character);
        }
        nextScene();
    } else {
        console.log('User document not found');
    }
};
displayCharacters();