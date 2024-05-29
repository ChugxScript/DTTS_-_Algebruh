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
    updateDoc,
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
    let user = null;

    usersSnapshot.forEach((doc) => {
        // get the current user data from firebase firestore
        if (doc.id == queryParamsUID) {
            const userData = doc.data();
            const userUID = doc.id;
            user = { user_uid: userUID, ...userData };
        }
    });
    console.log('getCurrentUserFromFirestore: ', user);
    console.log(`user.user_uid ${user.user_uid}`);
    return user;
};

// all chars
export const getBruhsFromFirestore = async () => {
    const bruhDocRef = collection(db, 'bruhs');
    const bruhDocSnapshot = await getDocs(bruhDocRef);

    const bruhs = [];

    bruhDocSnapshot.forEach((doc) => {
        bruhs.push({ bruh_uid: doc.id, ...doc.data() });
    });

    console.log('bruhs from Firestore:', bruhs);
    return bruhs;
};

// all items
export const getItemsFromFirestore = async () => {
    const itemDocRef = collection(db, 'items');
    const itemDocSnapshot = await getDocs(itemDocRef);

    const items = [];

    itemDocSnapshot.forEach((doc) => {
        items.push({ item_uid: doc.id, ...doc.data() });
    });

    console.log('items from Firestore:', items);
    return items;
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

// Questions
export const getEasyQuestionsFromFirestore = async () => {
    const easyQuestionsRef = doc(db, 'stageQuestions', 'module3Lecture2');
    const easyQuestionsSnap = await getDoc(easyQuestionsRef);
    let easyQuestions = [];
    
    if (easyQuestionsSnap.exists()) {
        // get specific field in firestore
        easyQuestions = easyQuestionsSnap.data().easyQuestions;
        console.log('getEasyQuestionsFromFirestore: ', easyQuestions);
        return easyQuestions;
    } else {
        console.log('[error] getEasyQuestionsFromFirestore: ', console.error);
        return null;
    }
};
export const getDifficultQuestionsFromFirestore = async () => {
    const difficultQuestionsRef = doc(db, 'stageQuestions', 'module3Lecture2');
    const difficultQuestionsSnap = await getDoc(difficultQuestionsRef);
    let difficultQuestions = [];
    
    if (difficultQuestionsSnap.exists()) {
        // get specific field in firestore
        difficultQuestions = difficultQuestionsSnap.data().difficultQuestions;
        console.log('getDifficultQuestionsFromFirestore: ', difficultQuestions);
        return difficultQuestions;
    } else {
        console.log('[error] getDifficultQuestionsFromFirestore: ', console.error);
        return null;
    }
};
export const getBonusFromFirestore = async () => {
    const bonusRef = doc(db, 'stageQuestions', 'module3Lecture2');
    const bonusSnap = await getDoc(bonusRef);
    let bonus = [];
    
    if (bonusSnap.exists()) {
        // get specific field in firestore
        bonus = bonusSnap.data().bonus;
        console.log('getBonusFromFirestore: ', bonus);
        return bonus;
    } else {
        console.log('[error] getBonusFromFirestore: ', console.error);
        return null;
    }
};