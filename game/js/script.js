let userDataDictionary = {};

function init() {
    // Set initial state of elements
    document.getElementById('login-popup').style.display = 'none';
    document.getElementById('new-account-popup').style.display = 'none';
    document.getElementById('sign-in-popup').style.display = 'none';
}

function showLoginPopup() {
    // Code to display the login popup
    document.getElementById('login-popup').style.display = 'block'; 
}

function newAccount() {
    // Display the New Account Popup
    document.getElementById('new-account-popup').style.display = 'block';
}

function signInAccount() {
    // Display the Sign In Popup
    document.getElementById('sign-in-popup').style.display = 'block';
}

function goBack(popupId) {
    document.getElementById(popupId).style.display = 'none';
    // Reset input fields
    document.getElementById('new-email').value = '';
    document.getElementById('new-username').value = '';
    document.getElementById('new-password').value = '';
    // Reset and close the Sign In Popup
    document.getElementById('signin-username').value = '';
    document.getElementById('signin-password').value = '';

    document.getElementById('login-popup').style.display = 'block';
}

function createNewAccount() {
    // Code to create a new account
    const newEmail = document.getElementById('new-email').value;
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    // Add the new account to the dictionary (you may want to perform validation)
    userDataDictionary[newUsername] = {
        email: newEmail,
        password: newPassword,
    };
    // Display the success message
    document.getElementById('success-message').style.display = 'block';

    // Hide the success message after 3 seconds
    setTimeout(() => {
        document.getElementById('success-message').style.display = 'none';
    }, 3000);

    // Reset input fields
    document.getElementById('new-email').value = '';
    document.getElementById('new-username').value = '';
    document.getElementById('new-password').value = '';

    document.getElementById('new-account-popup').style.display = 'none';
}

function checkSignIn() {
    // Code to check the sign-in credentials
    const signInUsername = document.getElementById('signin-username').value;
    const signInPassword = document.getElementById('signin-password').value;

    // Check if the username exists and the password is correct
    if (userDataDictionary[signInUsername] && userDataDictionary[signInUsername].password === signInPassword) {
        // Successful sign-in, proceed to the game (you can add your game logic here)
        console.log('Sign In Successful');
        // Reset and close the Sign In Popup
        document.getElementById('signin-username').value = '';
        document.getElementById('signin-password').value = '';
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('sign-in-popup').style.display = 'none';
        
        // Wait for the fading effect to complete before redirecting
        setTimeout(() => {
            // Redirect to the prelude HTML
            window.location.href = './assets/prelude.html';
        }, 3000);
    } else {
        // Show error message
        document.getElementById('error-message').style.display = 'block';
        // Hide the success message after 3 seconds
        setTimeout(() => {
            document.getElementById('error-message').style.display = 'none';
        }, 2000);
        // Reset and close the Sign In Popup
        document.getElementById('signin-username').value = '';
        document.getElementById('signin-password').value = '';
    }
}

init();