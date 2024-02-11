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
    setDoc,
    doc, 
    collection,
    updateDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);
// Get a Firestore instance
const db = getFirestore(firebaseApp);

// Retrieve data from query parameters
const queryParams = new URLSearchParams(window.location.search);
const queryParamsUID = queryParams.get('uid');
console.log('queryParams User UID:', queryParamsUID);

// Retrieve Data from Firestore Functions
// Current User
const getCurrentUserFromFirestore = async () => {
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


// asigning of vars
const currentUser = await getCurrentUserFromFirestore();


const showProfileContent = async () => {
    const profileUserAvatar = document.getElementById('profileUserAvatar');
    const profileUserDetailsTable = document.getElementById('profileUserDetailsTable');
    const profileUserShowCharacters = document.getElementById('profileUserShowCharacters');
    profileUserAvatar.innerHTML = '';
    profileUserDetailsTable.innerHTML = '';
    profileUserShowCharacters.innerHTML = '';

    // get instance of the latest current user data
    const currLatestUser = await getCurrentUserFromFirestore();
    const currUser = currLatestUser[0];
    // get instance of the owned chars
    const currOwnedChars = currUser.userCharacterOwned;

    // create img element then append to the div
    const currUserElement = document.createElement('div');
    const currUserImg = document.createElement('img');
    currUserImg.src = currUser.userAvatar;
    currUserImg.alt = currUser.userDisplayName;

    const currUserNameTextElement = document.createElement('p');
    currUserNameTextElement.textContent = currUser.userDisplayName;

    currUserElement.appendChild(currUserImg);
    currUserElement.appendChild(currUserNameTextElement);
    profileUserAvatar.appendChild(currUserElement);

    // create table element for the currUser details then append to the div
    const currUserDetailTable = document.createElement('table');
    // user details table info
    const userInfo = [
        'userDisplayName', 
        'userEmail', 
        'userLevel', 
        'userScore', 
        'userConfidentialFund', 
        'userDaysActive', 
    ];
    // Populate details as rows in the table based on the specified order
    userInfo.forEach((detailKey) => {
        if (currUser.hasOwnProperty(detailKey)) {
            const row = document.createElement('tr');
            const cell1 = document.createElement('td');
            const cell2 = document.createElement('td');
            cell1.textContent = detailKey;
            cell2.textContent = currUser[detailKey];
            row.appendChild(cell1);
            row.appendChild(cell2);
            currUserDetailTable.appendChild(row);
        }
    });
    profileUserDetailsTable.appendChild(currUserDetailTable);

    // show STATS
    // get updated userdata
    const currentUserSTATS = await getCurrentUserFromFirestore();
    // user details tables stats
    const userStats = [
        {
            'userTotalQuestionTaken': currentUserSTATS[0].userTotalQuestionTaken,
            'userTotalCorrectAnswer': currentUserSTATS[0].userTotalCorrectAnswer,
            'userCorrectAnswerRate': currentUserSTATS[0].userCorrectAnswerRate,
            'userTotalWrongAnswer': currentUserSTATS[0].userTotalWrongAnswer,
            'userWrongAnswerRate': currentUserSTATS[0].userWrongAnswerRate,
            'userTotalAnswerTime': currentUserSTATS[0].userTotalAnswerTime,
            'userAverageAnswerTime': currentUserSTATS[0].userAverageAnswerTime,
            'userStageCleared': currentUserSTATS[0].userStageCleared,
        },
    ];
    // Load the Google Charts library
    google.charts.load('current', {'packages':['corechart']});
    // Set a callback to run when the Google Charts library is loaded
    google.charts.setOnLoadCallback(drawCharts);
    function drawCharts() {
        drawTotalQuestionsAndCorrectAnswersChart(userStats);
        drawAnswerRateChart(userStats);
        drawAnswerTimeChart(userStats);
        drawStageClearedChart(userStats);
    }

    // display owned characters
    // create h2 element for the title
    const ownedCharsTitle = document.createElement('h2');
    ownedCharsTitle.classList = 'owned-chars-title';
    ownedCharsTitle.textContent = 'Characters Owned';
    profileUserShowCharacters.appendChild(ownedCharsTitle);

    let rowCounter = 0;
    let currentRow;

    currOwnedChars.forEach((character) => {
        if (rowCounter % 5 === 0) {
            // Create a new row every 5 items
            currentRow = document.createElement('div');
            currentRow.className = 'display-owned-chars';
            profileUserShowCharacters.appendChild(currentRow);
        }
        const currOwnedCharsElement = document.createElement('span');

        // Add click event to show character details
        currOwnedCharsElement.addEventListener('click', () => showCharacterDetails(character));

        const currOwnedCharsImg = document.createElement('img');
        currOwnedCharsImg.src = character.char_img_src;
        currOwnedCharsImg.alt = character.char_name;

        const currOwnedCharsNameTextElement = document.createElement('p');
        currOwnedCharsNameTextElement.textContent = character.char_name;

        currOwnedCharsElement.appendChild(currOwnedCharsImg);
        currOwnedCharsElement.appendChild(currOwnedCharsNameTextElement);
        currentRow.appendChild(currOwnedCharsElement);
        rowCounter++;
    });

}
const showCharacterDetails = (character) => {
    const profileCharactersDetailsImg = document.getElementById('profileCharactersDetailsImg');
    const profileCharactersDetailsContents = document.getElementById('profileCharactersDetailsContents');
    const profileCharactersDetailsPopup = document.getElementById('profileCharactersDetailsPopup');
    profileCharactersDetailsImg.innerHTML = '';
    profileCharactersDetailsContents.innerHTML = '';
    profileCharactersDetailsPopup.style.display = 'block';

    // create img element then append to the div
    const characterElement = document.createElement('div');
    const characterImg = document.createElement('img');
    characterImg.src = character.char_img_src;
    characterImg.alt = character.char_name;

    const charNameTextElement = document.createElement('p');
    charNameTextElement.textContent = character.char_name;

    characterElement.appendChild(characterImg);
    characterElement.appendChild(charNameTextElement);
    profileCharactersDetailsImg.appendChild(characterElement);

    // create table element for the character details then append to the div
    const characterDetailTable = document.createElement('table');
    const orderDetails = ['char_name', 'char_hp', 'char_atk'];
    // Populate details as rows in the table based on the specified order
    orderDetails.forEach((detailKey) => {
        if (character.hasOwnProperty(detailKey)) {
            const row = document.createElement('tr');
            const cell1 = document.createElement('td');
            const cell2 = document.createElement('td');
            cell1.textContent = detailKey;
            cell2.textContent = character[detailKey];
            row.appendChild(cell1);
            row.appendChild(cell2);
            characterDetailTable.appendChild(row);
        }
    });
    profileCharactersDetailsContents.appendChild(characterDetailTable);
}
function drawTotalQuestionsAndCorrectAnswersChart(userData) {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Category');
    data.addColumn('number', 'Value');

    userData.forEach(user => {
        data.addRow(['Total Questions Taken', user.userTotalQuestionTaken]);
        data.addRow(['Total Correct Answers', user.userTotalCorrectAnswer]);
    });

    const options = {
        title: 'Total Questions Taken vs Total Correct Answers',
        chartArea: {width: '50%'},
        hAxis: {
            title: 'Value',
            minValue: 0
        },
        vAxis: {
            title: 'Category'
        }
    };

    const chart = new google.visualization.BarChart(document.getElementById('totalQuestionsCorrectAnswersChart'));
    chart.draw(data, options);
}
function drawAnswerRateChart(userData) {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Answer');
    data.addColumn('number', 'Rate');

    userData.forEach(user => {
        data.addRow(['Correct Answer Rate', user.userCorrectAnswerRate]);
        data.addRow(['Wrong Answer Rate', user.userWrongAnswerRate]);
    });

    const options = {
        title: 'Correct vs Wrong Answer Rate',
    };

    const chart = new google.visualization.PieChart(document.getElementById('answerRateChart'));
    chart.draw(data, options);
}
function drawAnswerTimeChart(userData) {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Category');
    data.addColumn('number', 'Time (ms)');

    userData.forEach(user => {
        data.addRow(['Total Answer Time', user.userTotalAnswerTime]);
        data.addRow(['Average Answer Time', user.userAverageAnswerTime]);
    });

    const options = {
        title: 'Total Answer Time vs Average Answer Time',
        chartArea: {width: '50%'},
        hAxis: {
            title: 'Time (ms)',
            minValue: 0
        },
        vAxis: {
            title: 'Category'
        }
    };

    const chart = new google.visualization.BarChart(document.getElementById('answerTimeChart'));
    chart.draw(data, options);
}
function drawStageClearedChart(userData) {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Stage');
    data.addColumn('number', 'Count');

    const stageCounts = {};
    userData.forEach(user => {
        const stage = user.userStageCleared;
        stageCounts[stage] = (stageCounts[stage] || 0) + 1;
    });

    for (const stage in stageCounts) {
        if (stageCounts.hasOwnProperty(stage)) {
            data.addRow([stage, stageCounts[stage]]);
        }
    }

    const options = {
        title: 'Stage Cleared',
        pieHole: 0.4,
    };

    const chart = new google.visualization.PieChart(document.getElementById('stageClearedChart'));
    chart.draw(data, options);
}


const editProfile = () => {
    const editUserDisplayName = document.getElementById('editUserDisplayName');
    const displayUserAvatars = document.getElementById('displayUserAvatars');
    const editProfilePopup = document.getElementById('editProfilePopup');
    editProfilePopup.style.display = 'block';
    displayUserAvatars.innerHTML = '';
    editUserDisplayName.innerHTML = '';

    // create h2 element for the title
    const editProfileAvatarTitle = document.createElement('h2');
    editProfileAvatarTitle.classList = 'edit-profile-avatar-title';
    editProfileAvatarTitle.textContent = 'Edit User Display Name';

    // Create the form element
    const form = document.createElement('form');
    form.id = 'editUserDisplayNameForm';

    // Create the label element
    const label = document.createElement('label');
    label.setAttribute('for', 'newDisplayName');
    label.textContent = 'New Display Name:';

    // Create the input element
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.id = 'newDisplayName';
    input.setAttribute('name', 'newDisplayName');
    input.setAttribute('required', 'true');
    input.setAttribute('placeholder', 'Enter your new display name...');

    // Append the label, input, and button elements to the form
    form.appendChild(label);
    form.appendChild(input);

    // Append the form to the container
    editUserDisplayName.appendChild(editProfileAvatarTitle);
    editUserDisplayName.appendChild(form);



    // display user owned chara to select as their avatar
    // get instance of the current user data
    const currUser = currentUser[0];
    // get instance of the owned chars
    const currEditOwnedChars = currUser.userCharacterOwned;

    // append default avatar
    const defaultAvatar = {
        char_img_src: "https://media.tenor.com/iuoG1q_2oYUAAAAM/shrek-smirk-shrek-horny.gif",
        char_name: "Default Avatar",
    };
    currEditOwnedChars.push(defaultAvatar);


    let rowCounter = 0;
    let currentRow;
    let selectedCharacter = null;
    let prevSelectedElement = null;

    currEditOwnedChars.forEach((character) => {
        if (rowCounter % 5 === 0) {
            // Create a new row every 5 items
            currentRow = document.createElement('div');
            currentRow.className = 'edit-display-owned-chars';
            displayUserAvatars.appendChild(currentRow);
        }
        const currEditOwnedCharsElement = document.createElement('span');

        // Add click event to show character details
        currEditOwnedCharsElement.addEventListener('click', function () {
            // If this character is already selected, deselect it
            if (selectedCharacter === character) {
                currEditOwnedCharsElement.style.background = 'rgba(0, 0, 0, 0.7)';
                selectedCharacter = null;
            } else {
                // Remove selection from the previously selected character, if any
                if (selectedCharacter) {
                    prevSelectedElement.style.background = 'rgba(0, 0, 0, 0.7)';
                }
                // Add selection to the clicked character
                currEditOwnedCharsElement.style.background = 'rgba(255, 129, 129, 0.7)';
                prevSelectedElement = currEditOwnedCharsElement;
                selectedCharacter = character;
            }
            console.log('selectedCharacter: ', selectedCharacter);
        });

        const currOwnedCharsImg = document.createElement('img');
        currOwnedCharsImg.src = character.char_img_src;
        currOwnedCharsImg.alt = character.char_name;

        const currOwnedCharsNameTextElement = document.createElement('p');
        currOwnedCharsNameTextElement.textContent = character.char_name;

        currEditOwnedCharsElement.appendChild(currOwnedCharsImg);
        currEditOwnedCharsElement.appendChild(currOwnedCharsNameTextElement);
        currentRow.appendChild(currEditOwnedCharsElement);
        rowCounter++;
    });

    // add event listener to update user profile
    const confirmEditProfileButton = document.getElementById('confirmEditProfileButton');
    confirmEditProfileButton.addEventListener('click', async function () {
        if (input.value == '' && selectedCharacter == null){
            // alert('Nothing to edit');
            console.log('Nothing to edit');
            // this is holy sheesh i dont know what is happening but 
            // without this condition it becomes buggy as hell
            // i dont quite get it holy sheesh
        }else {
            console.log('edit display name: ', input.value);
            console.log('edit selectedCharacter: ', selectedCharacter);
            await editUserProfileFirebase(input.value, selectedCharacter);
            // remove appended default avatar
            const indexToRemove = currEditOwnedChars.findIndex(char => char === defaultAvatar);
            if (indexToRemove !== -1) {
                currEditOwnedChars.splice(indexToRemove, 1);
            }
            input.value = '';
            selectedCharacter = null;
            closeEditProfilePopup();
            // update the profile
            showProfileContent();
        }
    });
    const cancelEditProfilePopup = document.getElementById('cancelEditProfilePopup');
    cancelEditProfilePopup.addEventListener('click', function() {
        // remove appended default avatar
        const indexToRemove = currEditOwnedChars.findIndex(char => char === defaultAvatar);
        if (indexToRemove !== -1) {
            currEditOwnedChars.splice(indexToRemove, 1);
        }
    });
}
const editUserProfileFirebase = async (inputValue, selectedChar) => {
    // Retrieve the user document from Firestore
    const userRef = doc(db, 'users', currentUser[0].currUser_uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        if(inputValue != '') {
            await updateDoc(userRef, {
                userDisplayName: inputValue,
            });
            console.log('User Display name Updated successfully: ', inputValue);
        }
        if(selectedChar != null){
            await updateDoc(userRef, {
                userAvatar: selectedChar.char_img_src,
            });
            console.log('User profile avatar Updated successfully: ', selectedChar.char_img_src);
        }
    } else {
        console.log('User document not found');
    }
}
const profileUserAvatarSelection = document.getElementById('profileUserAvatarSelection');
profileUserAvatarSelection.addEventListener('click', function() {
    editProfile();
})

let previousCategory = null;
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', function() {
        const contentId = this.getAttribute('data-content');
        const content = document.getElementById(contentId);
        const category = this.textContent;

        if (previousCategory !== null) {
            // If the previous category is the same as the current one
            if (previousCategory === content) {
                // Toggle the display of the content
                content.style.display = content.style.display === 'none' ? 'block' : 'none';
                // Update the previous category to null since it's toggled
                previousCategory = null;
            } else {
                // Hide the previous category
                previousCategory.style.display = 'none';
                // Show the clicked category
                content.style.display = 'block';
                // Update the previous category to the current one
                previousCategory = content;
            }
        } else {
            // Show the clicked category if there's no previous category
            content.style.display = 'block';
            // Update the previous category to the current one
            previousCategory = content;
        }

        // If the category is Profile and the content is displayed, show the profile content
        if (category === 'Profile' && content.style.display === 'block') {
            showProfileContent();
        }
        
        // Toggle active class
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
        this.classList.toggle('active');
    });
});