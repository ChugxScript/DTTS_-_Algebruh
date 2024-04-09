import { 
    getAuth,
    signOut 
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const auth = getAuth();
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', function() {
    signOut(auth).then(() => {
        console.log('User signed out successfully.');
        window.location.href = "../public/index.html";
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`errorCode: ${errorCode} ||| errorMessage: ${errorMessage}`);
    })
});

export const displaySettings = () => {
    const settingsContainer = document.getElementById('settingsContainer');
    settingsContainer.style.display = 'flex';
}