// google auth
import { 
    getAuth,
    signOut 
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

// settings
const volumeControl = document.getElementById('volumeControl');
volumeControl.addEventListener('input', function() {
    // Get the current volume value
    const volume = parseInt(this.value) / 100;

    // Update the volume of the music (replace 'audio' with your audio element)
    audio.volume = volume;
});
const auth = getAuth();
const settingsLogoutButton = document.getElementById('settings-logout');
settingsLogoutButton.addEventListener('click', function() {
    signOut(auth).then(() => {
        console.log('User signed out successfully.');
        window.location.href = '.././index.html';
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`errorCode: ${errorCode} ||| errorMessage: ${errorMessage}`);
    })
});