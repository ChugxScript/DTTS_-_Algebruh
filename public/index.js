// Initialize Firebase
import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";

// firebase
import { 
    getFirestore,
    getDoc,
    setDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// google auth
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

// firebase config
import { 
    firebaseConfig 
} from "./js/firebase-config.js";

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const provider = new GoogleAuthProvider();
let defaultAvatar = 'https://media.tenor.com/iuoG1q_2oYUAAAAM/shrek-smirk-shrek-horny.gif';


// Function to handle login
const signInEmailPassword = async () => {
    try {
        // Get email and password from input fields
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passInput').value;

        // Sign in with email and password
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;

        // Check if the user exists in Firestore
        const userDoc = await getUserFromFirestore(user.uid);

        if (!userDoc.exists()) {
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = 'Wrong email or password.';
            errorMessage.style.display = "block";
            
            setTimeout(() => {
                errorMessage.style.display = "none";
            }, 3000);
        } else {
            const queryParams = `?uid=${user.uid}`;
            window.location.href = `./html/prelude.html${queryParams}`;
        }

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`errorCode: ${errorCode} ||| errorMessage: ${errorMessage}`);

        const error_message = document.getElementById('errorMessage');
        error_message.textContent = 'Wrong email or password.';
        error_message.style.display = "block";
        
        setTimeout(() => {
            error_message.style.display = "none";
        }, 3000);
    }
}

const signInGoogle = async() => {
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

// Create account using email and password as a service
const createAccountEmailPassword = async (display_name) => {
    try {
        // Get email and password from input fields
        const email = document.getElementById('crt_email').value;
        const password = document.getElementById('crt_password').value;

        // Create a new user with email and password
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;

        // Add the user to Firestore (if needed)
        await addUserToFirestore(user.uid, display_name, user.email);

        // Redirect to the prelude page
        const queryParams = `?uid=${user.uid}`;
        window.location.href = `./html/prelude.html${queryParams}`;

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`errorCode: ${errorCode} ||| errorMessage: ${errorMessage}`);

        // Display error message to the user
        const errorMessageElement = document.getElementById('errorMessageAllForms');
        errorMessageElement.textContent = errorMessage;
        errorMessageElement.style.display = 'block';

        // Hide error message after 3 seconds
        setTimeout(() => {
            errorMessageElement.style.display = 'none';
        }, 3000);
    }
}

// Function to get user document from Firestore
const getUserFromFirestore = async (uid) => {
    return await getDoc(doc(db, 'sample_user', uid));
};

// Function to add user to Firestore
const addUserToFirestore = async (uid, displayName, email, UnID) => {
    const userRef = doc(db, 'sample_user', uid);

    await setDoc(userRef, {
        user_name: displayName,
        user_email: email,
        user_avatar: defaultAvatar, 

        user_bruhs: [],
        
        user_daysActive: [],
        user_stageCleared: [],
        user_stats: {
            user_level: 1,
            user_easyQuestionsAnswered: 0,
            user_difficultQuestionsAnswered: 0,
            user_bonusTaken: 0,
            user_correctAnswers: 0,
            user_incorrectAnswers: 0,
            user_answerTotalTime: 0,
            user_confidentialFund: 0,
            user_score: 0,
        },

        user_inventoryItems: [],
        
    });
    console.log('User added to Firestore');
};

document.getElementById('signInGoogleButton').addEventListener('click', signInGoogle);
document.getElementById('signInEmailPasswordButton').addEventListener('click', signInEmailPassword);

const createAccButton2 = document.getElementById('createAccButton2');
createAccButton2.addEventListener('click', async function() {
    let isCreateFormsValid, display_name = isAllValid();
    if (isCreateFormsValid) {
        createAccountEmailPassword(display_name);
    } else {
        const errorMessageAllForms = document.getElementById('errorMessageAllForms');
        errorMessageAllForms.style.display = 'block';
        errorMessageAllForms.textContent = 'FILL ALL FIELDS.';

        setTimeout(() => {
            errorMessageAllForms.style.display = "none";
        }, 3000);
    }
})