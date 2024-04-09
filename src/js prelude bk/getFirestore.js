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
    doc, 
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);
// Get a Firestore instance
export const db = getFirestore(firebaseApp);

// Retrieve data from query parameters
const queryParams = new URLSearchParams(window.location.search);
const queryParamsUID = queryParams.get('uid');
console.log('queryParams User UID:', queryParamsUID);

// Retrieve Data from Firestore Functions

// Current User
export const getCurrentUserFromFirestore = async () => {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const users = [];

    usersSnapshot.forEach((doc) => {
        // get the current user data from firebase firestore
        if (doc.id == queryParamsUID) {
            const currUserData = doc.data();
            const currUser_uid = doc.id;
            users.push({ currUser_uid, ...currUserData });
        }
    });
    console.log('getCurrentUserFromFirestore: ', users);
    return users;
};


// prelude characters
export const getCharactersFromFirestore = async () => {
    const charactersDocRef = doc(db, 'characters', 'prelude-chars');
    const charactersDocSnapshot = await getDoc(charactersDocRef);

    if (charactersDocSnapshot.exists()) {
        const charactersData = charactersDocSnapshot.data();
        const characters = [];

        // Iterate over each character in the document
        Object.entries(charactersData).forEach(([char_uid, charData]) => {
            characters.push({ char_uid, ...charData }); // Push character data along with its ID to the array
        });

        console.log('Characters from Firestore:', characters);
        return characters;
    } else {
        console.log('Document "prelude-chars" does not exist');
        return []; // Return an empty array if the document doesn't exist
    }
};


// Enemies
export const getEnemyFromFirestore = async () => {
    const enemyDocRef = doc(db, 'enemy', 'prelude-enemy');
    const enemyDocSnapshot = await getDoc(enemyDocRef);

    if (enemyDocSnapshot.exists()) {
        const enemyData = enemyDocSnapshot.data();
        const enemy = [];

        // Iterate over each character in the document
        Object.entries(enemyData).forEach(([enemy_uid, enemyData]) => {
            enemy.push({ enemy_uid, ...enemyData }); // Push character data along with its ID to the array
        });

        console.log('enemy from Firestore:', enemy);
        return enemy;
    } else {
        console.log('Document "prelude-chars" does not exist');
        return []; // Return an empty array if the document doesn't exist
    }
};


// Prelude Questions
export const getPreludeEasyQuestionsFromFirestore = async () => {
    // fetch preludeEasyQuestions from Firestore
    const preludeEasyQuestionsRef = doc(db, 'stageQuestions', 'preludeQuestions');
    const preludeEasyQuestionsSnap = await getDoc(preludeEasyQuestionsRef);
    let preludeEasyQuestions = [];
    
    if (preludeEasyQuestionsSnap.exists()) {
        // get specific field in firestore
        preludeEasyQuestions = preludeEasyQuestionsSnap.data().easyQuestions;
        console.log('getPreludeEasyQuestionsFromFirestore: ', preludeEasyQuestions);
        return preludeEasyQuestions;
    } else {
        console.log('[error] getPreludeEasyQuestionsFromFirestore: ', console.error);
        return null;
    }
};
export const getPreludeDifficultQuestionsFromFirestore = async () => {
    // fetch preludeDifficultQuestions from Firestore
    const preludeDifficultQuestionsRef = doc(db, 'stageQuestions', 'preludeQuestions');
    const preludeDifficultQuestionsSnap = await getDoc(preludeDifficultQuestionsRef);
    let preludeDifficultQuestions = [];
    
    if (preludeDifficultQuestionsSnap.exists()) {
        // get specific field in firestore
        preludeDifficultQuestions = preludeDifficultQuestionsSnap.data().difficultQuestions;
        console.log('getPreludeDifficultQuestionsFromFirestore: ', preludeDifficultQuestions);
        return preludeDifficultQuestions;
    } else {
        console.log('[error] getPreludeDifficultQuestionsFromFirestore: ', console.error);
        return null;
    }
};