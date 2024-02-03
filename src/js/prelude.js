// firebase config
import { 
    firebaseConfig 
} from "../firebase-config.js";

// Initialize Firebase
import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";

// import firestore
import { 
    getFirestore,
    getDoc,
    setDoc,
    doc, 
    collection,
    updateDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// import google auth
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);
// Get a Firestore instance
const db = getFirestore(firebaseApp);
// Retrieve data from query parameters
const queryParams = new URLSearchParams(window.location.search);
const uid = queryParams.get('uid');
const userData = JSON.parse(decodeURIComponent(queryParams.get('userData')));

// Now you can use 'uid' and 'userData' in your code
console.log('User UID:', uid);
console.log('User Data:', userData);



// Function to fetch characters from Firestore
const getCharactersFromFirestore = async () => {
    const charactersCollection = collection(db, 'characters');
    const charactersSnapshot = await getDocs(charactersCollection);
    const characters = [];

    charactersSnapshot.forEach((doc) => {
        const characterData = doc.data();
        const char_uid = doc.id; // Get the document ID
        characters.push({ char_uid, ...characterData });
    });

    return characters;
};
// Call this function when you want to fetch characters
const characters = await getCharactersFromFirestore();
console.log('Characters:', characters);
// Log char_uid for each character
characters.forEach((character) => {
    console.log('Character UID:', character.char_uid);
});



// Function to display characters on the page
const displayCharacters = (characters) => {
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
    const orderDetails = ['char_name', 'char_health', 'char_atk'];
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

    // Add a confirm button click event
    // const confirmButton = document.querySelector('.preludeCharactersConfirmationButton span:first-child');
    const confirmPreludeCharacter = document.getElementById('confirmPreludeCharacter');
    confirmPreludeCharacter.addEventListener('click', function () {
        console.log('Character selected inside event listener:', JSON.stringify(character));
        console.log('Character selected char uid inside event listener:', JSON.stringify(character.char_uid));
        appendConfirmPreludeCharacter(character);
    });
};
const appendConfirmPreludeCharacter = async (character) => {
    // Retrieve the user document from Firestore
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        // Get the current user data
        const userData = userDoc.data();

        // Check if the character is not already in userCharacterOwned
        if (!userData.userCharacterOwned.includes(character.char_uid)) {
            // Append the character to userCharacterOwned array
            const updatedUserCharacterOwned = [...userData.userCharacterOwned, character.char_uid];

            // Update the Firestore document with the new character array
            await updateDoc(userRef, {
                userCharacterOwned: updatedUserCharacterOwned,
            });

            console.log('Character appended to userCharacterOwned:', character.char_uid);
        } else {
            console.log('Character already in userCharacterOwned:', character.char_uid);
        }
        nextScene()
    } else {
        console.log('User document not found');
    }
}
// const appendConfirmPreludeCharacter
displayCharacters(characters);