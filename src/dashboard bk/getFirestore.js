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

// journey stages
export const getJourneyStagesFromFirebase = async () => {
    const journeyStagesDocRef = doc(db, 'stageQuestions', 'stageDesigns');
    const journeyStagesDocSnapshot = await getDoc(journeyStagesDocRef);

    if (journeyStagesDocSnapshot.exists()) {
        const journeyStagesData = journeyStagesDocSnapshot.data();
        const journeyStages = [];

        // Iterate over each shop characters in the document
        Object.entries(journeyStagesData).forEach(([stage_uid, stageData]) => {
            journeyStages.push({ stage_uid, ...stageData });
        });

        console.log('journeyStages from Firestore:', journeyStages);
        return journeyStages;
    } else {
        console.log('Document "stageDesigns" does not exist');
        return []; 
    }
}

// shop chars
export const getShopCharsFromFirestore = async () => {
    const shopCharsDocRef = doc(db, 'shop', 'shopCharacters');
    const shopCharsDocSnapshot = await getDoc(shopCharsDocRef);

    if (shopCharsDocSnapshot.exists()) {
        const shopCharsData = shopCharsDocSnapshot.data();
        const shopCharacters = [];

        // Iterate over each shop characters in the document
        Object.entries(shopCharsData).forEach(([char_uid, charData]) => {
            shopCharacters.push({ char_uid, ...charData });
        });

        console.log('shopCharacters from Firestore:', shopCharacters);
        return shopCharacters;
    } else {
        console.log('Document "shopCharacters" does not exist');
        return []; 
    }
};

// shop items
export const getShopItemsFromFirestore = async () => {
    const shopItemsDocRef = doc(db, 'shop', 'shopItems');
    const shopItemsDocSnapshot = await getDoc(shopItemsDocRef);

    if (shopItemsDocSnapshot.exists()) {
        const shopItemsData = shopItemsDocSnapshot.data();
        const shopItem = [];

        // Iterate over each shop characters in the document
        Object.entries(shopItemsData).forEach(([item_uid, itemData]) => {
            shopItem.push({ item_uid, ...itemData });
        });

        console.log('shopItem from Firestore:', shopItem);
        return shopItem;
    } else {
        console.log('Document "shopItems" does not exist');
        return []; 
    }
};

// days active
const updateUserDaysActive = async () => {
    const getCurrUser = await getCurrentUserFromFirestore();
    const checkUserDaysActive = getCurrUser[0].userDaysActive;

    const currentDate = new Date();
    // Get month, day, and year
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const year = currentDate.getFullYear();
    // Format the date as mm/dd/yyyy
    const formattedDate = `${month}/${day}/${year}`;

    if (!checkUserDaysActive.includes(formattedDate)) {
        const userRef = doc(db, 'users', getCurrUser[0].currUser_uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const updatedUserDaysActive = [...userData.userDaysActive, formattedDate];
            await updateDoc(userRef, {
                userDaysActive: updatedUserDaysActive,
            });
        } else {
            console.log('User document not found');
        }
    }
}
updateUserDaysActive();