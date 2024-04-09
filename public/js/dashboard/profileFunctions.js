import { getCurrentUserFromFirestore, db } from "./getFirestore.js";
import { 
    getDoc,
    doc, 
    updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

export const showProfilePart1 = async () => {
    const profileContainer = document.getElementById('profileContainer');
    const profileAvatar = document.getElementById('profileAvatar');
    const profileTable = document.getElementById('profileTable');
    profileContainer.style.display = 'flex';
    profileAvatar.innerHTML = '';
    profileTable.innerHTML = '';

    const user = await getCurrentUserFromFirestore();

    // user avatar
    const avatarIMGElement = document.createElement('img');
    avatarIMGElement.src = user.user_avatar;

    // user name
    const usernameElement = document.createElement('p');
    usernameElement.textContent = user.user_name;

    profileAvatar.appendChild(avatarIMGElement);
    profileAvatar.appendChild(usernameElement);

    // table
    const tableDetailsDiv = document.createElement('div');
    const tableDetails = document.createElement('table');
    const userInfo = [
        'user_name', 
        'user_email', 
        'user_level', 
        'user_score', 
        'user_confidentialFund', 
        'user_daysActive', 
        'user_bruhs',
        'user_inventoryItems',
        'user_stageCleared'
    ];

    userInfo.forEach((detailKey) => {
        if(user.hasOwnProperty(detailKey) || (user.user_stats && user.user_stats.hasOwnProperty(detailKey))) {
            const row = document.createElement('tr');
            const cell1 = document.createElement('td');
            const cell2 = document.createElement('td');
            cell1.textContent = alterDetailKey('cell1', detailKey, user);
            cell2.textContent = alterDetailKey('cell2', detailKey, user);
            row.appendChild(cell1);
            row.appendChild(cell2);
            tableDetails.appendChild(row);
        }
    })
    tableDetailsDiv.appendChild(tableDetails);
    profileTable.appendChild(tableDetailsDiv);


    // Load the Google Charts library
    google.charts.load('current', {'packages':['corechart']});
    // Set a callback to run when the Google Charts library is loaded
    google.charts.setOnLoadCallback(drawCharts);
    function drawCharts() {
        drawQuestionTakenRateChart(user);
        drawCorrectAnsRateChart(user);
    }
}
// showProfilePart1();

function alterDetailKey(mode, detailKey, user) {
    if (mode === 'cell1') {
        switch (detailKey) {
            case 'user_name':
                return 'User name';
            case 'user_email':
                return 'Email';
            case 'user_level':
                return 'Level';
            case 'user_score':
                return 'Score';
            case 'user_confidentialFund':
                return 'Confidential Fund';
            case 'user_daysActive':
                return 'Days active';
            case 'user_bruhs':
                return 'Total bruhs';
            case 'user_inventoryItems':
                return 'Total inventory items';
            case 'user_stageCleared':
                return 'Stage cleared';
            default:
                return '';
        }
    } else if (mode === 'cell2') {
        switch (detailKey) {
            case 'user_level':
                return user.user_stats?.user_level || '0';
            case 'user_score':
                return user.user_stats?.user_score || '0';
            case 'user_confidentialFund':
                return user.user_stats?.user_confidentialFund || '0';
            case 'user_daysActive':
                return user.user_daysActive?.length || '0';
            case 'user_bruhs':
                return user.user_bruhs?.length || '0';
            case 'user_inventoryItems':
                return user.user_inventoryItems?.length || '0';
            case 'user_stageCleared':
                return user.user_stageCleared?.length || '0';
            default:
                return user[detailKey] || '';
        }
    }
}

const editProfile = async () => {
    const editProfileForm = document.getElementById('editProfileForm');
    editProfileForm.style.display = 'flex';

    const user = await getCurrentUserFromFirestore();
    const bruhs_owned = user.user_bruhs;

    const defaultAvatar = {
        bruh_img: "https://media.tenor.com/iuoG1q_2oYUAAAAM/shrek-smirk-shrek-horny.gif",
        bruh_name: "Default Avatar",
    }
    bruhs_owned.push(defaultAvatar);


    const availableAvatars = document.getElementById('availableAvatars');
    availableAvatars.innerHTML = '';

    let rowCounter = 0;
    let currentRow;
    let selectedCharacter = null;
    let prevSelectedElement = null;

    bruhs_owned.forEach((character) => {
        if (rowCounter % 3 === 0) {
            // Create a new row every 2 items
            currentRow = document.createElement('div');
            currentRow.className = 'prelude-character-selection-row';
            availableAvatars.appendChild(currentRow);
        }
        const characterElement = document.createElement('span');

        // Add click event to show character details
        characterElement.addEventListener('click', function () {
            if (selectedCharacter === character) {
                characterElement.style.background = 'rgba(0, 0, 0, 0.7)';
                selectedCharacter = null;
            } else {
                // Remove selection from the previously selected character, if any
                if (selectedCharacter) {
                    prevSelectedElement.style.background = 'rgba(0, 0, 0, 0.7)';
                }
                // Add selection to the clicked character
                characterElement.style.background = 'rgba(255, 129, 129, 0.7)';
                prevSelectedElement = characterElement;
                selectedCharacter = character;
            }
        });

        const characterImg = document.createElement('img');
        characterImg.src = character.bruh_img;
        characterImg.alt = character.bruh_name;

        const charNameTextElement = document.createElement('p');
        charNameTextElement.textContent = character.bruh_name;

        characterElement.appendChild(characterImg);
        characterElement.appendChild(charNameTextElement);
        currentRow.appendChild(characterElement);
        rowCounter++;
    });


    // add event listener to update user profile
    const saveEditProfile = document.getElementById('saveEditProfile');
    const newDisplayName = document.getElementById('newDisplayName');
    saveEditProfile.addEventListener('click', async function () {
        if (newDisplayName.value == '' && selectedCharacter == null){
            // alert('Nothing to edit');
            console.log('Nothing to edit');
            const editWarningMessage = document.getElementById('editWarningMessage');
            editWarningMessage.style.display = 'block';
            editWarningMessage.textContent = 'Nothing to edit';

            setTimeout(() => {
                editWarningMessage.style.display = 'none';
            }, 2000);
            // this is holy sheesh i dont know what is happening but 
            // without this condition it becomes buggy as hell
            // i dont quite get it holy sheesh
        }else {
            console.log('edit display name: ', newDisplayName.value);
            console.log('edit selectedCharacter: ', selectedCharacter);
            await editUserProfileFirebase(newDisplayName.value, selectedCharacter);
            // remove appended default avatar
            const indexToRemove = bruhs_owned.findIndex(char => char === defaultAvatar);
            if (indexToRemove !== -1) {
                bruhs_owned.splice(indexToRemove, 1);
            }
            newDisplayName.value = '';
            selectedCharacter = null;
            editProfileForm.style.display = 'none';
            showProfilePart1();
        }
    });
    const cancelEditProfile = document.getElementById('cancelEditProfile');
    cancelEditProfile.addEventListener('click', function() {
        // remove appended default avatar
        const indexToRemove = bruhs_owned.findIndex(char => char === defaultAvatar);
        if (indexToRemove !== -1) {
            bruhs_owned.splice(indexToRemove, 1);
        }
        editProfileForm.style.display = 'none';
    });
}
const editProfileBtn = document.getElementById('editProfileBtn');
editProfileBtn.addEventListener('click', editProfile);

const editUserProfileFirebase = async (inputValue, selectedChar) => {
    // Retrieve the user document from Firestore
    const currentUser = await getCurrentUserFromFirestore();
    const userRef = doc(db, 'users', currentUser.currUser_uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
        if(inputValue != '') {
            await updateDoc(userRef, {
                user_name: inputValue,
            });
            console.log('User Display name Updated successfully: ', inputValue);
        }
        if(selectedChar != null){
            await updateDoc(userRef, {
                user_avatar: selectedChar.bruh_img,
            });
            console.log('User profile avatar Updated successfully: ', selectedChar.char_img_src);
        }
    } else {
        console.log('User document not found');
    }
}




function drawQuestionTakenRateChart(user) {
    var data = google.visualization.arrayToDataTable([
        ['Category', 'Value'],
        ['Bonus Taken', user.user_stats.user_bonusTaken],
        ['Difficult Questions Answered', user.user_stats.user_difficultQuestionsAnswered],
        ['Easy Questions Answered', user.user_stats.user_easyQuestionsAnswered]
    ]);

    var options = {
        title: 'Question Taken Rate',
        pieHole: 0.4
    };

    var chartContainer = document.getElementById('questionTakenRate');
    chartContainer.style.width = chartContainer.clientHeight + 'px'; // Set width equal to height

    var chart = new google.visualization.PieChart(chartContainer);
    chart.draw(data, options);
}

function drawCorrectAnsRateChart(user) {
    var data = google.visualization.arrayToDataTable([
        ['Category', 'Value'],
        ['Correct Answers', user.user_stats.user_correctAnswers],
        ['Incorrect Answers', user.user_stats.user_incorrectAnswers]
    ]);

    var options = {
        title: 'Correct vs Incorrect Answers',
        legend: { position: 'none' },
        chart: {
            subtitle: 'Correct and Incorrect Answers',
        },
        hAxis: {
            title: 'Number of Answers', // Set label for x-axis
        },
        vAxis: {
            title: 'Question', // Set label for y-axis
        },
        bar: { groupWidth: "90%" } // Set width of bars
    };

    var chartContainer = document.getElementById('correctAnsRate');
    chartContainer.style.width = chartContainer.clientHeight + 'px'; // Set width equal to height

    var chart = new google.visualization.BarChart(chartContainer);
    chart.draw(data, options);
}
