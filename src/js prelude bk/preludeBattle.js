import { 
    db,
    getCurrentUserFromFirestore,
    getEnemyFromFirestore,
    getPreludeEasyQuestionsFromFirestore,
    getPreludeDifficultQuestionsFromFirestore
} from "./getFirestore.js"
import { 
    getDoc,
    doc, 
    updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
const reviveScripts = [
    {
        texts: [
            "Grabe ka naman! ",
            "Prelude palang patay ka na agad! ",
            "Revive! ",
            "Revive! Revive! ",
            "Revive! Revive! Revive! ",
        ],
        imageSrc:'https://cdn.discordapp.com/attachments/1200058397236666378/1208355486248865792/simplier-textbox_-_Copy.png?ex=65e2fbbe&is=65d086be&hm=f8db87a45bc3b9327e8663ce823731a6d133a2899c6b7b3fcba493251f6ab4dd&',
    },
];


// Function to display prelude enemy on the page
const displayPreludeEnemyBattle = (enemies) => {
    const unknownPokeminImg = document.getElementById('unknownPokeminImg');
    const unknownPokeminDetails = document.getElementById('unknownPokeminDetails');
    unknownPokeminImg.innerHTML = '';
    unknownPokeminDetails.innerHTML = '';

    // get only the desired enemy
    enemies.forEach((enemy) => {
        if (enemy.enemy_name == 'ni-bruh'){
            unknownPokeminImg.src = enemy.enemy_img_src;

            // create table element for the enemy details then append to the div
            const enemyDetailTable = document.createElement('table');
            const orderDetails = ['enemy_name', 'enemy_hp', 'enemy_atk'];
            let enemy_hp = 'hp';
            let enemy_atk = 'atk';
            
            // Add the first row with merged cells
            const firstRow = document.createElement('tr');
            const cell = document.createElement('td');
            cell.textContent = enemy[orderDetails[0]]; // Use the first detailKey
            cell.setAttribute('colspan', '2'); // Merge two cells
            firstRow.appendChild(cell);
            enemyDetailTable.appendChild(firstRow);

            // Add the remaining rows with two columns containing detailKey and enemy[detailKey]
            for (let i = 1; i < orderDetails.length; i++) {
                const row = document.createElement('tr');
                const cell1 = document.createElement('td');
                const cell2 = document.createElement('td');

                if (orderDetails[i] == 'enemy_hp') {
                    cell1.textContent = enemy_hp;
                } else if (orderDetails[i] == 'enemy_atk') {
                    cell1.textContent = enemy_atk;
                }
                cell2.textContent = enemy[orderDetails[i]];

                row.appendChild(cell1);
                row.appendChild(cell2);
                enemyDetailTable.appendChild(row);
            }
            unknownPokeminDetails.appendChild(enemyDetailTable);
        }
    })
}


// display prelude selected character of the user
const displayPreludeSelectedCharacter = (currUser) => {
    const preludeUserSelectedCharacter = document.getElementById('preludeUserSelectedCharacter');
    const preludeUserCharacterDetails = document.getElementById('preludeUserCharacterDetails');
    preludeUserSelectedCharacter.innerHTML = '';
    preludeUserCharacterDetails.innerHTML = '';

    // get the characters owned by the user then display it to battle
    const preludeSelectedCharacter = currUser[0].userCharacterOwned[0];
    preludeUserSelectedCharacter.src = preludeSelectedCharacter.char_img_src;

    // create table element for the selectedCharacter details then append to the div
    const selectedCharacterDetailTable = document.createElement('table');
    const orderDetails = ['char_name', 'char_hp', 'char_atk'];
    let selectedCharacter_hp = 'hp';
    let selectedCharacter_atk = 'atk';
    
    // Add the first row with merged cells
    const firstRow = document.createElement('tr');
    const cell = document.createElement('td');
    cell.textContent = preludeSelectedCharacter[orderDetails[0]]; // Use the first detailKey
    cell.setAttribute('colspan', '2'); // Merge two cells
    firstRow.appendChild(cell);
    selectedCharacterDetailTable.appendChild(firstRow);

    // Add the remaining rows with two columns containing detailKey and enemy[detailKey]
    for (let i = 1; i < orderDetails.length; i++) {
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');

        if (orderDetails[i] == 'char_hp') {
            cell1.textContent = selectedCharacter_hp;
        } else if (orderDetails[i] == 'char_atk') {
            cell1.textContent = selectedCharacter_atk;
        }
        cell2.textContent = preludeSelectedCharacter[orderDetails[i]];

        row.appendChild(cell1);
        row.appendChild(cell2);
        selectedCharacterDetailTable.appendChild(row);
    }
    preludeUserCharacterDetails.appendChild(selectedCharacterDetailTable);
}


// simple implementation of DTTS algorithm in javascript
// why simple? i dunnow cus were using javascript so there are some other factors
// that the javascript cant handle and the devs cant implement as of the moment
// char tinatamad lang talaga ko HAHAHAHAHAHA

// Function to simulate DTTS algorithm
const decisionTreeThompsonSampling = async () => {
    const unknownPokeminTextBoxQuestion = document.getElementById('unknownPokeminTextBoxQuestion');
    const preludeUserSkillOptions = document.getElementById('preludeUserSkillOptions');
    const preludeUserStageScore = document.getElementById('preludeUserStageScore');
    unknownPokeminTextBoxQuestion.innerHTML = '';
    preludeUserSkillOptions.innerHTML = '';
    preludeUserStageScore.innerHTML = '';

    const currentUser = await getCurrentUserFromFirestore();
    const enemy = await getEnemyFromFirestore();
    displayPreludeSelectedCharacter(currentUser);
    displayPreludeEnemyBattle(enemy);

    // get instance of enemy and userChar details
    let currEnemy = enemy;
    let userChar = currentUser;
    let startTime = 0;
    let endTime = 0;
    let timeDifference = 0;
    let scriptRunning = false;

    // get instances of questions
    const easyQuestions = await getPreludeEasyQuestionsFromFirestore();
    const difficultQuestions = await getPreludeDifficultQuestionsFromFirestore();

    const displayQuestion = (question) => {
        unknownPokeminTextBoxQuestion.textContent = question.question;
        preludeUserStageScore.textContent = userChar[0].userScore;
        preludeUserSkillOptions.innerHTML = '';
        startTime = new Date().getTime() / 1000;
        displayFeedbackScriptFunction(0);

        question.choices.forEach((choice) => {
            const choiceSpan = document.createElement('span');
            choiceSpan.textContent = choice;
            
            choiceSpan.addEventListener('click', () => {
                handleUserChoice(choice, question, currEnemy, userChar);
            });

            preludeUserSkillOptions.appendChild(choiceSpan);
        });
    };

    const handleUserChoice = async (choice, question, currEnemy, userChar) => {
        if (scriptRunning) {
            return; // Do nothing if the script is running
        }
        
        console.log(`You clicked on choice: ${choice}`);
        let correctAnswerChecker = 0;
        let wrongAnswerChecker = 0;
        endTime = new Date().getTime() / 1000;
        timeDifference = endTime - startTime;

        if (choice === question.answer) {
            correctAnswerChecker = 1;
            wrongAnswerChecker = 0;
            currEnemy[0].enemy_hp -= userChar[0].userCharacterOwned[0].char_atk;
            displayFeedbackScriptFunction(1);
        } else {
            correctAnswerChecker = 0;
            wrongAnswerChecker = 1;
            userChar[0].userCharacterOwned[0].char_hp -= currEnemy[0].enemy_atk;
            displayFeedbackScriptFunction(2);
        }

        await updateUserData(userChar, timeDifference, correctAnswerChecker, wrongAnswerChecker);
        displayPreludeEnemyBattle(currEnemy);
        displayPreludeSelectedCharacter(userChar);

        if (userChar[0].userCharacterOwned[0].char_hp <= 0) {
            scriptRunning = true;
            displayReviveScript(() => {
                // Reset the flag once the script is done
                scriptRunning = false;
                userChar[0].userCharacterOwned[0].char_hp = 10;
                displayPreludeSelectedCharacter(userChar);
                console.log('script is finished');
            });
        } else if (currEnemy[0].enemy_hp <= 0) {
            await updateUserDataStageCleared(userChar, 'prelude');
            nextScene();
        }
        nextQuestion();
    };

    const nextQuestion = () => {
        startTime = 0;
        endTime = 0;
        displayQuestion(simulateDTTS(userChar, easyQuestions, difficultQuestions));
    };

    // Start with the first question
    displayQuestion(simulateDTTS(userChar, easyQuestions, difficultQuestions));
};


const simulateDTTS = (currUser, easyQuestions, difficultQuestions) => {
    // Calculate weights based on user attributes
    const easyWeight = calculateWeight(currUser, 'easy');
    const difficultWeight = calculateWeight(currUser, 'difficult');

    // Randomly choose a difficulty level based on weights
    const difficultyLevels = ['easy', 'difficult'];
    const chosenLevel = weightedRandom(difficultyLevels, [easyWeight, difficultWeight]);

    // Get a random question from the chosen difficulty level
    let chosenQuestion;
    if (chosenLevel === 'easy') {
        chosenQuestion = getRandomQuestion(easyQuestions);
    } else if (chosenLevel === 'difficult') {
        chosenQuestion = getRandomQuestion(difficultQuestions);
    } else {
        console.log('[error] simulateDTTS: Invalid difficulty level');
        return null;
    }

    return chosenQuestion;
};


const calculateWeight = (user, level) => {
    let weightUserLevel = 0;
    let weightTotalQuestionTaken = 0;
    let weightTotalAnswerTime = 0;
    let weightAverageAnswerTime = 0;
    let weightTotalCorrectAnswer = 0;
    let weightCorrectAnswerRate = 0;
    let weightTotalWrongAnswer = 0;
    let weightWrongAnswerRate = 0;

    if (level == 'easy') {
        weightUserLevel = 0.6;
        weightTotalQuestionTaken = 0.1;
        weightTotalAnswerTime = 0.15;
        weightAverageAnswerTime = 0.1;
        weightTotalCorrectAnswer = 0.2;
        weightCorrectAnswerRate = 0.15;
        weightTotalWrongAnswer = 0.3;
        weightWrongAnswerRate = 0.9;
    } else if (level == 'difficult') {
        weightUserLevel = 0.5;
        weightTotalQuestionTaken = 0.3;
        weightTotalAnswerTime = 0.15;
        weightAverageAnswerTime = 0.1;
        weightTotalCorrectAnswer = 0.2;
        weightCorrectAnswerRate = 0.15;
        weightTotalWrongAnswer = 0.1;
        weightWrongAnswerRate = 0.1;
    }

    // Calculate the weighted sum of user attributes
    const weightedSum =
        user.userLevel * weightUserLevel +
        user.userTotalQuestionTaken * weightTotalQuestionTaken +
        user.userTotalAnswerTime * weightTotalAnswerTime +
        user.userAverageAnswerTime * weightAverageAnswerTime +
        user.userTotalCorrectAnswer * weightTotalCorrectAnswer +
        user.userCorrectAnswerRate * weightCorrectAnswerRate +
        user.userTotalWrongAnswer * weightTotalWrongAnswer +
        user.userWrongAnswerRate * weightWrongAnswerRate;

    return weightedSum;
};


// Helper function for weighted random selection
const weightedRandom = (items, weights) => {
    const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
    const randomValue = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    for (let i = 0; i < items.length; i++) {
        cumulativeWeight += weights[i];
        if (randomValue <= cumulativeWeight) {
            return items[i];
        }
    }

    // Fallback in case of unexpected values
    return items[items.length - 1];
};


const getRandomQuestion = (questionsArray) => {
    const randomIndex = Math.floor(Math.random() * questionsArray.length);
    return questionsArray[randomIndex];
};


const updateUserData = async (currUser, timeDifference, correctAnswerChecker, wrongAnswerChecker) => {
    // get user document from the firebase
    const currUserRef = doc(db, 'users', currUser[0].currUser_uid);

    // calculate matrics
    let currUserTotalQuestionTaken = currUser[0].userTotalQuestionTaken + 1;
    let currUserTotalCorrectAnswer = currUser[0].userTotalCorrectAnswer + correctAnswerChecker;
    let currUserTotalWrongAnswer = currUser[0].userTotalWrongAnswer + wrongAnswerChecker;
    let currUserTotalAnswerTime = currUser[0].userTotalAnswerTime + timeDifference;

    let currUserAverageAnswerTime = currUserTotalAnswerTime / currUserTotalQuestionTaken;
    let currUserCorrectAnswerRate = currUserTotalCorrectAnswer / currUserTotalQuestionTaken;
    let currUserWrongAnswerRate = currUserTotalWrongAnswer / currUserTotalQuestionTaken;

    let currUserScore = currUser[0].userScore += (correctAnswerChecker * 2);

    await updateDoc(currUserRef, { 
        userTotalQuestionTaken: currUserTotalQuestionTaken,
        userTotalCorrectAnswer: currUserTotalCorrectAnswer,
        userTotalWrongAnswer: currUserTotalWrongAnswer,
        userTotalAnswerTime: currUserTotalAnswerTime,
        
        userAverageAnswerTime: currUserAverageAnswerTime,
        userCorrectAnswerRate: currUserCorrectAnswerRate,
        userWrongAnswerRate: currUserWrongAnswerRate,

        userScore: currUserScore,
    });
    console.log('User data updated to Firestore');
}


const updateUserDataStageCleared = async (currUser, stageCleared) => {
    // get user document from the firebase
    const currUserRef = doc(db, 'users', currUser[0].currUser_uid);
    const userDoc = await getDoc(currUserRef);

    if (userDoc.exists()) {
        // Get the current user data
        const userData = userDoc.data();
        const updatedUserStageCleared = [...userData.userStageCleared, stageCleared];

        await updateDoc(currUserRef, { 
            userStageCleared: updatedUserStageCleared,
        });
        console.log('User stageCleared updated to Firestore');
    }
}


// Add a confirm button click event
const fightThatPokememe = document.getElementById('fightThatPokememe');
fightThatPokememe.addEventListener('click', function () {
    const preludeUnknownPokeminEnemyContainer = document.getElementById('preludeUnknownPokeminEnemyContainer');
    const preludeUserBattleContainer = document.getElementById('preludeUserBattleContainer');
    preludeUnknownPokeminEnemyContainer.style.display = 'block';
    preludeUserBattleContainer.style.display = 'block';
    fightThatPokememe.style.display = 'none';
    decisionTreeThompsonSampling();
});





// holy sheesh nakakaumay
const displayReviveScript = async (callback) => {
    const gigaGuideBattle = document.getElementById('gigaGuideBattle');
    const gigaGuideTextBoxBattle = document.getElementById('gigaGuideTextBoxBattle');
    const gigaGuideTextBoxScriptBattle = document.getElementById('gigaGuideTextBoxScriptBattle');

    gigaGuideBattle.style.display = 'block';
    gigaGuideTextBoxBattle.style.display = 'block';
    gigaGuideTextBoxScriptBattle.style.display = 'block';

    gigaGuideBattle.classList.add('bring-top');
    gigaGuideTextBoxBattle.classList.add('bring-top');
    gigaGuideTextBoxScriptBattle.classList.add('bring-top');

    let reviveIndex = 0;
    let reviveTextIndex = 0;
    gigaGuideTextBoxBattle.src = reviveScripts[reviveIndex].imageSrc;
    gigaGuideTextBoxScriptBattle.textContent = reviveScripts[reviveIndex].texts[reviveTextIndex];

    const nextReviveScript = () => {
        if (reviveTextIndex < reviveScripts[reviveIndex].texts.length - 1) {
            reviveTextIndex++;
        } else {
            // hide content
            gigaGuideBattle.style.display = 'none';
            gigaGuideTextBoxBattle.style.display = 'none';
            gigaGuideTextBoxScriptBattle.style.display = 'none';
            document.body.removeEventListener('click', nextReviveScript);
            callback();
        }
        gigaGuideTextBoxScriptBattle.textContent = reviveScripts[reviveIndex].texts[reviveTextIndex];
    };

    document.body.addEventListener('click', nextReviveScript);
    
    const currentUserRevive = await getCurrentUserFromFirestore();
    return currentUserRevive[0].userCharacterOwned[0].char_health;
};

// Add a confirm button click event to move to dashboard
const moveToDashboard = document.getElementById('moveToDashboard');
moveToDashboard.addEventListener('click', async function () {
    const currentUser = await getCurrentUserFromFirestore();
    moveToDashboard.style.display = 'none';
    const queryParams = `?uid=${currentUser[0].currUser_uid}`;
    window.location.href = `../html/dashboard.html${queryParams}`;
});