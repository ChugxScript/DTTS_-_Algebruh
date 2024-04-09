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
            const currUserData = doc.data();
            const currUser_uid = doc.id;
            user = { currUser_uid, ...currUserData };
        }
    });
    console.log('getCurrentUserFromFirestore: ', user);
    console.log(`user.currUser_uid ${user.currUser_uid}`);
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

// all stages
export const getStagesFromFirestore = async () => {
    const stageDocRef = collection(db, 'stageQuestions');
    const stageDocSnapshot = await getDocs(stageDocRef);

    const stages = [];

    stageDocSnapshot.forEach((doc) => {
        stages.push({ stage_uid: doc.id, ...doc.data() });
    });

    console.log('stages from Firestore:', stages);
    return stages;
};


// days active
const updateUserDaysActive = async () => {
    const getCurrUser = await getCurrentUserFromFirestore();
    const checkUserDaysActive = getCurrUser.user_daysActive;

    const currentDate = new Date();
    // Get month, day, and year
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const year = currentDate.getFullYear();
    // Format the date as mm/dd/yyyy
    const formattedDate = `${month}/${day}/${year}`;

    if (!checkUserDaysActive.includes(formattedDate)) {
        const userRef = doc(db, 'users', getCurrUser.currUser_uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const updatedUserDaysActive = [...userData.user_daysActive, formattedDate];
            await updateDoc(userRef, {
                user_daysActive: updatedUserDaysActive,
            });
        } else {
            console.log('User document not found');
        }
    }
}
updateUserDaysActive();