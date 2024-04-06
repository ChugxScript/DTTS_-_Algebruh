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
    const charactersContainer = document.getElementById('preludeBruhs');
    charactersContainer.innerHTML = ''; // Clear previous content

    let rowCounter = 0;
    let currentRow;

    characters.slice(0, 4).forEach((character) => {
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
        characterImg.src = character.bruh_img;
        characterImg.alt = character.bruh_name;

        const charNameTextElement = document.createElement('p');
        charNameTextElement.textContent = character.bruh_name;

        characterElement.appendChild(characterImg);
        characterElement.appendChild(charNameTextElement);
        currentRow.appendChild(characterElement);
        rowCounter++;
    });
};

let selectedCharacter = '';
const showCharacterDetails = (character) => {
    const bruhDetailsPopup = document.getElementById('bruhDetailsPopup');
    const bruhImg = document.getElementById('bruhImg');
    const bruhDetails = document.getElementById('bruhDetails');
    
    bruhDetailsPopup.style.display = 'block';
    bruhImg.innerHTML = '';
    bruhDetails.innerHTML = '';

    // create img element then append to the div
    const characterElement = document.createElement('div');
    const characterImg = document.createElement('img');
    characterImg.src = character.bruh_img;
    characterImg.alt = character.bruh_name;

    const charNameTextElement = document.createElement('p');
    charNameTextElement.textContent = character.bruh_name;

    characterElement.appendChild(characterImg);
    characterElement.appendChild(charNameTextElement);
    bruhImg.appendChild(characterElement);

    // create table element for the character details then append to the div
    const characterDetailTable = document.createElement('table');
    const orderDetails = ['bruh_name', 'bruh_hp', 'bruh_atk', 'bruh_description'];
    // Populate details as rows in the table based on the specified order
    orderDetails.forEach((detailKey) => {
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');
        cell1.textContent = alterDetailKey(detailKey);
        cell2.textContent = character[detailKey];
        row.appendChild(cell1);
        row.appendChild(cell2);
        characterDetailTable.appendChild(row);
    });
    bruhDetails.appendChild(characterDetailTable);

    selectedCharacter = character;
};

function alterDetailKey(detailKey) {
    if (detailKey == 'bruh_name') {
        return 'Name';
    } else if (detailKey == 'bruh_hp') {
        return 'Hp';
    } else if (detailKey == 'bruh_atk') {
        return 'Atk';
    } else {
        return 'Description';
    }

}

// Add a confirm button click event
const confirmPreludeCharacter = document.getElementById('confirmPreludeCharacter');
confirmPreludeCharacter.addEventListener('click', function () {
    appendConfirmPreludeCharacter(selectedCharacter);
});
const appendConfirmPreludeCharacter = async (character) => {
    // Retrieve the user document from Firestore
    console.log(`character: ${character}`);
    const currentUser = await getCurrentUserFromFirestore();
    const userRef = doc(db, 'sample_user', currentUser.currUser_uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        // Get the current user data
        const userData = userDoc.data();

        // Check if the character is not already in userCharacterOwned
        let characterAlreadyOwned = false;

        for (const user_bruhs of userData.user_bruhs) {
            if (user_bruhs.char_uid === character.char_uid) {
                characterAlreadyOwned = true;
                break;
            }
        }

        if (!characterAlreadyOwned) {
            const updatedUserCharacterOwned = [...userData.user_bruhs, character];
            await updateDoc(userRef, {
                user_bruhs: updatedUserCharacterOwned,
            });
            console.log('Character appended to user_bruhs:', character);
        } else {
            console.log('Character already in user_bruhs:', character);
        }
        nextScript('displayBruhs');
    } else {
        console.log('User document not found');
    }
};

displayCharacters();