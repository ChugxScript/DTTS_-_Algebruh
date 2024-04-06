import { 
    db,
    getCurrentUserFromFirestore,
    getEnemyFromFirestore,
    getPreludeEasyQuestionsFromFirestore,
    getPreludeDifficultQuestionsFromFirestore,
    getPreludeBonusFromFirestore
} from "./getFirestore.js"
import { 
    getDoc,
    doc, 
    updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
import {
    simulateDTTS,
    getNextQuestion,
    getNextBonus,
    getFeedback
}from "./dtts.js"


const displayPreludeEnemyBattle = (enemy) => {
    const enemyIMG = document.getElementById('enemyIMG');
    const enemyStats = document.getElementById('enemyStats');
    enemyIMG.innerHTML = '';
    enemyStats.innerHTML = '';

    // get only the desired enemy
    // enemies.forEach((enemy) => {
    //     if (enemy.enememe_name == 'ni-bruh'){
    //         // enemyIMG_element = document.createElement('img');
    //         // enemyIMG_element.src = enemy.enememe_img;
            
    //     }
    // })

    enemyIMG.src = enemy.enememe_img;
    // create table element for the enemy details then append to the div
    const enemyDetailTable = document.createElement('table');
    const orderDetails = ['enememe_name', 'enememe_hp', 'enememe_atk'];
    
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

        if (orderDetails[i] == 'enememe_hp') {
            cell1.textContent = 'HP';
        } else if (orderDetails[i] == 'enememe_atk') {
            cell1.textContent = 'ATK';
        }
        cell2.textContent = enemy[orderDetails[i]];

        row.appendChild(cell1);
        row.appendChild(cell2);
        enemyDetailTable.appendChild(row);
    }
    enemyStats.appendChild(enemyDetailTable);
}

const displayPreludeSelectedCharacter = (currUser) => {
    console.log(`currUser: ${currUser}`);
    const userIMG = document.getElementById('userIMG');
    const userStats = document.getElementById('userStats');
    userIMG.innerHTML = '';
    userStats.innerHTML = '';

    // get the characters owned by the user then display it to battle
    const preludeSelectedCharacter = currUser.user_bruhs[0];
    userIMG.src = preludeSelectedCharacter.bruh_img;

    // create table element for the selectedCharacter details then append to the div
    const selectedCharacterDetailTable = document.createElement('table');
    const orderDetails = ['bruh_name', 'bruh_hp', 'bruh_atk'];
    
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

        if (orderDetails[i] == 'bruh_hp') {
            cell1.textContent = 'HP';
        } else if (orderDetails[i] == 'bruh_atk') {
            cell1.textContent = 'ATK';
        }
        cell2.textContent = preludeSelectedCharacter[orderDetails[i]];

        row.appendChild(cell1);
        row.appendChild(cell2);
        selectedCharacterDetailTable.appendChild(row);
    }
    userStats.appendChild(selectedCharacterDetailTable);
}
const currentUser = await getCurrentUserFromFirestore();
nextScript(currentUser.currUser_uid);
const decisionTreeThompsonSampling = async () => {
    const preludeBattleCanvas = document.getElementById('preludeBattleCanvas');
    const enemyQbox = document.getElementById('enemyQbox');
    const userQbox = document.getElementById('userQbox');
    enemyQbox.innerHTML = '';
    userQbox.innerHTML = '';
    preludeBattleCanvas.style.display = 'block';

    const currentUser = await getCurrentUserFromFirestore();
    const enemy = await getEnemyFromFirestore();
    
    // get instance of enemy and userChar details
    let currEnemy;
    let userChar = currentUser;
    let timeDifference = 0;
    let scriptRunning = false;
    let immuneDMG = false;
    let origATK = 0;
    let prevLevel = '';
    let isCorrect = false;
    let isDisplayWarning = false;
    let clickSpam2 = false;
    let clickSpam3 = false;
    let reviveIndex = -1;
    let reviveLen = revive_scripts.length;

    enemy.forEach((enemies) => {
        if (enemies.enememe_name == 'ni-bruh') {
            currEnemy = enemies;
        }
    })

    displayPreludeSelectedCharacter(currentUser);
    displayPreludeEnemyBattle(currEnemy);

    // get instances of questions
    const easyQuestions = await getPreludeEasyQuestionsFromFirestore();
    const difficultQuestions = await getPreludeDifficultQuestionsFromFirestore();
    const bonus = await getPreludeBonusFromFirestore();

    const checkReturnPrompt = (prompt) => {
        if (prompt == 'easy') {
            prevLevel = prompt;
            displayQuestion(getNextQuestion(easyQuestions));
        } else if (prompt == 'difficult') {
            prevLevel = prompt;
            displayQuestion(getNextQuestion(difficultQuestions));
        } else if (prompt == 'bonus') {
            displayBonus(getNextBonus(bonus));
        } else if (prompt == 'warning') {
            displayWarning();
        } else {
            console.log('[error] simulateDTTS: Invalid difficulty level');
        }
    }

    const displayQuestion = (question) => {
        enemyQbox.innerHTML = '';
        const enemyQues = document.createElement('p');
        enemyQues.textContent = question.question;
        enemyQbox.appendChild(enemyQues);

        userQbox.innerHTML = '';
        answerStartTime = 0;
        answerEndTime = 0;
        startAnswerTimer();
        let currentRow;

        question.choices.forEach((choice, index) => {
            if (index % 2 === 0) {
                // Create a new row every 2 items
                currentRow = document.createElement('div');
                currentRow.className = 'user-qbox-selection-row';
                userQbox.appendChild(currentRow);
            }
            const choiceSpan = document.createElement('span');
            
            choiceSpan.addEventListener('click', () => {
                handleUserChoice(choice, question, currEnemy, userChar);
            });

            const choiceSpanText = document.createElement('p');
            choiceSpanText.textContent = choice;

            choiceSpan.appendChild(choiceSpanText);
            currentRow.appendChild(choiceSpan);
        });
    };

    const handleUserChoice = async (choice, question, currEnemy, userChar) => {
        if (scriptRunning) {
            return; // Do nothing if the script is running
        }
        
        console.log(`You clicked on choice: ${choice}`);
        let correctAnswerChecker = 0;
        let wrongAnswerChecker = 0;
        timeDifference = stopAnswerTimer();

        if (choice === question.answer) {
            correctAnswerChecker = 1;
            wrongAnswerChecker = 0;
            isCorrect = true;
            currEnemy.enememe_hp -= userChar.user_bruhs[0].bruh_atk;
            
            if (origATK != 0) {
                userChar.user_bruhs[0].bruh_atk = origATK;
                origATK = 0;
            }

            const prompt1 = document.getElementById('prompt1');
            prompt1.style.display = 'flex';
            prompt1.style.border = '5px solid green';
            prompt1.style.color = 'green';
            prompt1.innerHTML = '';
            prompt1.textContent = 'CORRRRRECT!';
            setTimeout(() => {
                prompt1.style.display = 'none';
            }, 1000);

        } else {
            correctAnswerChecker = 0;
            wrongAnswerChecker = 1;
            isCorrect = false;

            if (!immuneDMG) {
                userChar.user_bruhs[0].bruh_hp -= currEnemy.enememe_atk;
            } else {
                immuneDMG = false;
            }

            const prompt1 = document.getElementById('prompt1');
            prompt1.style.display = 'flex';
            prompt1.style.border = '5px solid red';
            prompt1.style.color = 'red';
            prompt1.innerHTML = '';
            prompt1.textContent = 'NOPE!';
            setTimeout(() => {
                prompt1.style.display = 'none';
            }, 1000);
        }

        console.log(`userChar ${userChar}`);
        console.log(`timeDifference ${timeDifference}`);
        console.log(`correctAnswerChecker ${correctAnswerChecker}`);
        console.log(`wrongAnswerChecker ${wrongAnswerChecker}`);
        console.log(`prevLevel ${prevLevel}`);
        await updateUserData(userChar, timeDifference, correctAnswerChecker, wrongAnswerChecker, prevLevel, 'question');
        displayPreludeEnemyBattle(currEnemy);
        displayPreludeSelectedCharacter(userChar);

        if (userChar.user_bruhs[0].bruh_hp <= 0) {
            scriptRunning = true;
            displayReviveScript();
        } else if (currEnemy.enememe_hp <= 0) {
            await updateUserDataStageCleared(userChar, 'prelude');
            nextScript(userChar.currUser_uid);
        }
        nextQuestion();
    };

    const displayBonus = (currBonus) => {
        enemyQbox.innerHTML = '';
        const enemyQues = document.createElement('p');
        enemyQues.textContent = 'GET SOME HANDICUF WEAKLING!';
        enemyQbox.appendChild(enemyQues);

        userQbox.innerHTML = '';
        let currentRow;
        currBonus.forEach((bns, index) => {
            // const choiceSpan = document.createElement('span');
            // choiceSpan.textContent = bns;
            
            // choiceSpan.addEventListener('click', () => {
            //     handleUserBonus(bns, userChar);
            // });

            // userQbox.appendChild(choiceSpan);

            if (index % 2 === 0) {
                // Create a new row every 2 items
                currentRow = document.createElement('div');
                currentRow.className = 'user-qbox-selection-row';
                userQbox.appendChild(currentRow);
            }
            const choiceSpan = document.createElement('span');
            
            choiceSpan.addEventListener('click', () => {
                handleUserBonus(bns, userChar);
            });

            const choiceSpanText = document.createElement('p');
            choiceSpanText.textContent = bns;

            choiceSpan.appendChild(choiceSpanText);
            currentRow.appendChild(choiceSpan);
        })
    }

    const handleUserBonus = async (bns, userChar) => {
        console.log(`You clicked on bonus: ${bns}`);

        if (bns.startsWith("HP")) {
            // Increase player character's HP
            userChar.user_bruhs[0].bruh_hp += parseInt(bns.split(" ")[2]);
        } else if (bns.startsWith("ATK")) {
            // Increase player character's attack power
            origATK = userChar.user_bruhs[0].bruh_atk;
            userChar.user_bruhs[0].bruh_atk += parseInt(bns.split(" ")[2]);
        } else if (bns.startsWith("If answer is wrong")) {
            // Apply immunity to damage from incorrect answers
            immuneDMG = true;
        }

        await updateUserData(userChar, 0, 0, 0, prevLevel, 'bonus');
        displayPreludeEnemyBattle(currEnemy);
        displayPreludeSelectedCharacter(userChar);
        checkReturnPrompt(simulateDTTS(userChar, 'bonus'));
    }

    const displayWarning = () => {
        const gigaGuide2 = document.getElementById('gigaGuide2');
        const scr2 = document.getElementById('scr2');

        gigaGuide2.style.display = 'block';
        scr2.style.display = 'block';
        gigaGuide2.classList.add('bring-top');
        scr2.classList.add('bring-top');
        getFeedback(scr2, prevLevel, timeDifference, isCorrect);
        isDisplayWarning = true;
        // document, difficulty level, time, isCorrect
        // src2, prevLevel, timeDifference, isCorrect

        document.addEventListener('click', () => {
            if (isDisplayWarning) {
                gigaGuide2.style.display = 'none';
                scr2.style.display = 'none';
                gigaGuide2.classList.remove('bring-top');
                scr2.classList.remove('bring-top');
                isDisplayWarning = false;
                checkReturnPrompt(simulateDTTS(userChar, 'warning'));
            }
        });
    }

    const displayFirstScript = () => {
        const gigaGuide2 = document.getElementById('gigaGuide2');
        const scr2 = document.getElementById('scr2');
    
        gigaGuide2.style.display = 'block';
        scr2.style.display = 'block';
        gigaGuide2.classList.add('bring-top');
        scr2.classList.add('bring-top');
    
        clickSpam2 = true;

        document.addEventListener('click', () => {
            if (clickSpam2) {
                if (curr_script < 21) {
                    curr_script += 1;
                    scr2.textContent = scripts[curr_script];
                    displayFirstScript();
                } else {
                    // hide content
                    gigaGuide2.style.display = 'none';
                    scr2.style.display = 'none';
                    gigaGuide2.classList.remove('bring-top');
                    scr2.classList.remove('bring-top');
                    clickSpam2 = false;
                    checkReturnPrompt(simulateDTTS(userChar, 'bonus'));
                }
            }
        });
    }

    const displayReviveScript = async () => {
        const gigaGuide2 = document.getElementById('gigaGuide2');
        const scr2 = document.getElementById('scr2');

        gigaGuide2.style.display = 'block';
        scr2.style.display = 'block';
        gigaGuide2.classList.add('bring-top');
        scr2.classList.add('bring-top');

        clickSpam3 = true;

        document.addEventListener('click', () => {
            if (clickSpam3) {
                if (reviveIndex <= reviveLen) {
                    reviveIndex += 1;
                    scr2.textContent = revive_scripts[reviveIndex];
                    displayReviveScript();
                } else {
                    // hide content
                    gigaGuide2.style.display = 'none';
                    scr2.style.display = 'none';
                    gigaGuide2.classList.remove('bring-top');
                    scr2.classList.remove('bring-top');

                    scriptRunning = false;
                    clickSpam3 = false;
                    reviveIndex = -1;
                    userChar.user_bruhs[0].bruh_hp = 10;
                    displayPreludeSelectedCharacter(userChar);
                    console.log('script is finished');
                }
            }
        });
        
    }

    const nextQuestion = () => {
        checkReturnPrompt(simulateDTTS(userChar, 'all'));
    };

    // Start with the first question
    // checkReturnPrompt(simulateDTTS(userChar, 'bonus'));
    displayFirstScript();
};



const battleStartButton = document.getElementById('battleStartButton');
battleStartButton.addEventListener('click', function () {
    const gigaGuide = document.getElementById('gigaGuide');
    const battleStartButton = document.getElementById('battleStartButton');
    gigaGuide.style.display = 'none';
    battleStartButton.style.display = 'none';
    decisionTreeThompsonSampling();
})

let answerStartTime;
let answerEndTime;

function startAnswerTimer() {
    answerStartTime = new Date().getTime();
}
function stopAnswerTimer() {
    answerEndTime = new Date().getTime();
    const answerTime = (answerEndTime - answerStartTime) / 1000; // Convert milliseconds to seconds
    const minutes = Math.floor(answerTime / 60);
    const seconds = Math.floor(answerTime % 60);
    console.log('Answer time:', minutes + ' minutes ' + seconds + ' seconds');
    return seconds;
    // You can handle the answer time as needed here (e.g., display it to the player)
}

const updateUserData = async (currUser, timeDifference, correctAnswerChecker, wrongAnswerChecker, prevLevel, mode) => {
    // get user document from the firebase
    const currUserRef = doc(db, 'sample_user', currUser.currUser_uid);
    const userStatDoc = await getDoc(currUserRef);

    if (mode == 'bonus') {
        let bonusTaken = currUser.user_bonusTaken + 1;
        await updateDoc(currUserRef, { 
            user_bonusTaken: bonusTaken,
        });
    } else {
        let difficultQuestionsAnswered = currUser.user_difficultQuestionsAnswered;
        let easyQuestionsAnswered = currUser.user_easyQuestionsAnswered;
        if (prevLevel == 'difficult') {
            difficultQuestionsAnswered += 1;
        } else if (prevLevel == 'easy') {
            easyQuestionsAnswered += 1;
        }

        const userStatData = userStatDoc.data();
        const userStats = userStatData.user_stats;

        const updatedUserStats = {
            ...userStats, // Spread the properties of userStats
            user_answerTotalTime: userStats.user_answerTotalTime + timeDifference,
            user_correctAnswers: userStats.user_correctAnswers + correctAnswerChecker,
            user_difficultQuestionsAnswered: difficultQuestionsAnswered,
            user_easyQuestionsAnswered: easyQuestionsAnswered,
            user_incorrectAnswers: userStats.user_incorrectAnswers + wrongAnswerChecker
        };

        // userStats.user_answerTotalTime = currUser.user_answerTotalTime + timeDifference;
        // userStats.user_correctAnswers = currUser.user_correctAnswers + correctAnswerChecker;
        // userStats.user_difficultQuestionsAnswered = difficultQuestionsAnswered;
        // userStats.user_easyQuestionsAnswered = easyQuestionsAnswered;
        // userStats.user_incorrectAnswers = currUser.user_incorrectAnswers + wrongAnswerChecker;

        console.log(`currUser: ${JSON.stringify(currUser)}`);
        console.log(`userStats: ${JSON.stringify(userStats)}`);
        await updateDoc(currUserRef, { 
            user_stats: userStats
        });
    }
    console.log('User data updated to Firestore');
}

const updateUserDataStageCleared = async (currUser, stageCleared) => {
    // get user document from the firebase
    const currUserRef = doc(db, 'sample_user', currUser.currUser_uid);
    const userDoc = await getDoc(currUserRef);

    if (userDoc.exists()) {
        // Get the current user data
        const userData = userDoc.data();
        const updatedUserStageCleared = [...userData.user_stageCleared, stageCleared];

        await updateDoc(currUserRef, { 
            user_stageCleared: updatedUserStageCleared,
        });
        console.log('User stageCleared updated to Firestore');
    }
}
