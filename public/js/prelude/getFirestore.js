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

// Current User
export const getCurrentUserFromFirestore = async () => {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    let user = null;

    usersSnapshot.forEach((doc) => {
        // get the current user data from firebase firestore
        if (doc.id == queryParamsUID) {
            const currUserData = doc.data();
            const currUser_uid = doc.id;
            user = { currUser_uid, ...currUserData };
        }
    });
    console.log('getCurrentUserFromFirestore: ', user);
    console.log(`user.currUser_uid ${user.currUser_uid}`);
    return user;
};
// getCurrentUserFromFirestore();

// characters
export const getCharactersFromFirestore = async () => {
    const charactersCollectionRef = collection(db, 'bruhs');
    const charactersQuerySnapshot = await getDocs(charactersCollectionRef);

    const characters = [];

    charactersQuerySnapshot.forEach((doc) => {
        characters.push({ bruh_uid: doc.id, ...doc.data() });
    });

    console.log('Characters from Firestore:', characters);
    return characters;
};

// Enemies
export const getEnemyFromFirestore = async () => {
    const enemyDocRef = collection(db, 'pokememes');
    const enemyDocSnapshot = await getDocs(enemyDocRef);

    const enemy = [];

    enemyDocSnapshot.forEach((doc) => {
        enemy.push({ enemy_uid: doc.id, ...doc.data() });
    });

    console.log('enemy from Firestore:', enemy);
    return enemy;
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
export const getPreludeBonusFromFirestore = async () => {
    // fetch preludeDifficultQuestions from Firestore
    const preludeBonusRef = doc(db, 'stageQuestions', 'preludeQuestions');
    const preludeBonusSnap = await getDoc(preludeBonusRef);
    let preludeBonus = [];
    
    if (preludeBonusSnap.exists()) {
        // get specific field in firestore
        preludeBonus = preludeBonusSnap.data().bonus;
        console.log('getPreludeBonusFromFirestore: ', preludeBonus);
        return preludeBonus;
    } else {
        console.log('[error] getPreludeBonusFromFirestore: ', console.error);
        return null;
    }
};