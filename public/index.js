// Initialize Firebase
import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";

// firebase
import { 
    getFirestore,
    getDoc,
    setDoc,
    doc, 
    collection,
    updateDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// google auth
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

// firebase config
import { 
    firebaseConfig 
} from "./js/firebase-config.js";

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);
// Get a Firestore instance
const db = getFirestore(firebaseApp);
// google auth
const auth = getAuth();
// Google Sign-In provider
const provider = new GoogleAuthProvider();

const userDataContainer = document.getElementById('userDataContainer');
const loginBtn = document.getElementById('loginBtn');
const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');

// Function to handle login
const login = async() => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        
        // Check if the user exists in Firestore
        const userDoc = await getUserFromFirestore(user.uid);

        if (!userDoc.exists()) {
            // If user doesn't exist, add to Firestore
            await addUserToFirestore(user.uid, user.displayName, user.email);
            // Redirecting with query parameter
            const queryParams = `?uid=${user.uid}`;
            window.location.href = `./html/prelude.html${queryParams}`;
        } else {
            const queryParams = `?uid=${user.uid}`;
            window.location.href = `./html/prelude.html${queryParams}`;
        }

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`errorCode: ${errorCode} ||| errorMessage: ${errorMessage}`);
    }
}
// Function to get user document from Firestore
const getUserFromFirestore = async (uid) => {
    return await getDoc(doc(db, 'users', uid));
};
// Function to add user to Firestore
const addUserToFirestore = async (uid, displayName, email, UnID) => {
    const userRef = doc(db, 'users', uid);

    await setDoc(userRef, {
        userDisplayName: displayName,
        userEmail: email,
        userCharacterOwned: [],
        userLevel: 1,
        userDaysActive: [],
        userStageCleared: [],
        userTotalQuestionTaken: 0,
        userTotalAnswerTime: 0,
        userAverageAnswerTime: 0,
        userTotalCorrectAnswer: 0,
        userCorrectAnswerRate: 0,
        userTotalWrongAnswer: 0,
        userWrongAnswerRate: 0,
        userConfidentialFund: 0, // coins
        userScore: 0,
        userInventoryItems: [],
        userAvatar: 'https://media.tenor.com/iuoG1q_2oYUAAAAM/shrek-smirk-shrek-horny.gif', // initial avatar
    });
    console.log('User added to Firestore');
};

document.getElementById('loginBtn').addEventListener('click', login);