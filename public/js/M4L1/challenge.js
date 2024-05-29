import { 
    db,
    getCurrentUserFromFirestore,
    getEnemyFromFirestore,
    getEasyQuestionsFromFirestore,
    getDifficultQuestionsFromFirestore,
    getBonusFromFirestore
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
    getFeedback,
    initValue
}from "../prelude/dtts.js" 


const takeChallBTN = document.getElementById('takeChallBTN');
const gotoDashboardBTN = document.getElementById('gotoDashboardBTN');
const gigaGuide = document.getElementById('gigaGuide');

const battleCanvas = document.getElementById("battleCanvas");
const pmemeQUES = document.getElementById('pmemeQUES');
const pmemeQUES2 = document.getElementById('pmemeQUES2');
const gigaGuide2 = document.getElementById('gigaGuide2');
const gameResultCanvas = document.getElementById('gameResultCanvas');
const script0 = document.getElementById("script0");
const prompt1 = document.getElementById("prompt1");
gigaGuide2.style.display = 'none';

let curr_bruh = 0;
let total_score = 0;
let total_CF = 0;

takeChallBTN.addEventListener('click', function() {
    gigaGuide.style.display = 'none';
    script0.style.display = 'none';
    prompt1.style.display = 'none';
    battleCanvas.style.display = 'block';
    decisionTreeThompsonSampling();
})


gotoDashboardBTN.addEventListener('click', async function () {
    const user = await getCurrentUserFromFirestore();
    const queryParams = `?uid=${user.user_uid}`;
    window.location.href = `../../html/dashboard.html${queryParams}`;
})

window.onload = async () => {
    const user = await getCurrentUserFromFirestore();
    if (user.user_stageCleared.includes("module4Lecture1")) {
        curr_script = 1;
    }
};


const decisionTreeThompsonSampling = async () => {
    
    const userCHOICES = document.getElementById('userCHOICES');
    pmemeQUES.innerHTML = '';
    userCHOICES.innerHTML = '';
    pmemeQUES2.style.display = 'none';
    pmemeQUES.style.display = 'none';

    const currUser = await getCurrentUserFromFirestore();
    const enemy = await getEnemyFromFirestore();
    
    // get instance of enemy and userChar details
    let currEnemy;
    let timeDifference = 0;
    let correctAnswerChecker = 0;
    let wrongAnswerChecker = 0;
    let scriptRunning = false;
    let immuneDMG = false;
    let origATK = currUser.user_bruhs[curr_bruh].bruh_atk;
    let prevLevel = '';
    let level_stat = '';
    let isCorrect = false;
    let curr_question;

    const bruhs_btn = document.getElementById('bruhs_btn');
    bruhs_btn.addEventListener('click', function() {
        showPopupBruhs();
    })

    const items_btn = document.getElementById('items_btn');
    items_btn.addEventListener('click', function() {
        showPopupItems();
    })

    const gotoLesson1 = document.querySelectorAll('.gotoLesson1');
    gotoLesson1.forEach(button => {
        button.addEventListener('click', function() {
            gameResultCanvas.style.display = 'none';
            battleCanvas.style.display = 'none';
            gigaGuide.style.display = 'block';
            curr_script = 2;
        });
    });

    const gotoDashboard1 = document.querySelectorAll('.gotoDashboard1');
    gotoDashboard1.forEach(button => {
        button.addEventListener('click', function() {
            const queryParams = `?uid=${currUser.user_uid}`;
            window.location.href = `../../html/dashboard.html${queryParams}`;
        });
    });

    enemy.forEach((enemies) => {
        if (enemies.enememe_name == 'COCKroach') {
            currEnemy = enemies;
        }
    })

    displayBruh(currUser);
    displayPokememe(currEnemy);

    // get instances of questions
    const easyQuestions = await getEasyQuestionsFromFirestore();
    const difficultQuestions = await getDifficultQuestionsFromFirestore();
    const bonus = await getBonusFromFirestore();

    const checkReturnPrompt = (prompt) => {
        if (prompt == 'easy') {
            prevLevel = prompt;
            level_stat = prompt;
            displayQuestion(getNextQuestion(easyQuestions));
        } else if (prompt == 'difficult') {
            prevLevel = prompt;
            level_stat = prompt;
            displayQuestion(getNextQuestion(difficultQuestions));
        } else if (prompt == 'bonus') {
            level_stat = prompt;
            displayBonus(getNextBonus(bonus));
        } else if (prompt == 'warning') {
            level_stat = prompt;
            displayWarning();
        } else {
            console.log(`[error] simulateDTTS: Invalid difficulty level ${prompt}`);
        }
    }

    const displayQuestion = (question) => {
        pmemeQUES.innerHTML = '';
        // const enemyQues = document.createElement('p');
        // enemyQues.textContent = question.question;
        // pmemeQUES.appendChild(enemyQues);
        pmemeQUES.style.display = 'none';
        pmemeQUES2.style.display = 'flex';
        const questionElement = document.getElementById(question.question);
        curr_question = questionElement;
        if (questionElement) {
            questionElement.style.display = 'block';
        } else {
            console.log(`Invalid question: ${question.question}`);
        }

        userCHOICES.innerHTML = '';
        answerStartTime = 0;
        answerEndTime = 0;
        startAnswerTimer();
        let currentRow;

        question.choices.forEach((choice, index) => {
            if (index % 2 === 0) {
                // Create a new row every 2 items
                currentRow = document.createElement('div');
                currentRow.className = 'user-choices';
                userCHOICES.appendChild(currentRow);
            }
            const choiceSpan = document.createElement('span');
            
            choiceSpan.addEventListener('click', () => {
                handleUserChoice(choice, question, currEnemy, currUser);
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
        correctAnswerChecker = 0;
        wrongAnswerChecker = 0;
        timeDifference = stopAnswerTimer();

        if (choice === question.answer) {
            correctAnswerChecker = 1;
            wrongAnswerChecker = 0;
            isCorrect = true;
            currEnemy.enememe_hp -= userChar.user_bruhs[curr_bruh].bruh_atk;
            
            if (origATK != userChar.user_bruhs[curr_bruh].bruh_atk) {
                userChar.user_bruhs[curr_bruh].bruh_atk = origATK;
            }

            const feedback_prompt = document.getElementById('feedback_prompt');
            feedback_prompt.style.display = 'flex';
            feedback_prompt.style.border = '5px solid green';
            feedback_prompt.style.color = 'green';
            feedback_prompt.innerHTML = '';
            feedback_prompt.textContent = 'CORRRRRECT!';
            setTimeout(() => {
                feedback_prompt.style.display = 'none';
            }, 1000);

        } else {
            correctAnswerChecker = 0;
            wrongAnswerChecker = 1;
            isCorrect = false;

            if (!immuneDMG) {
                userChar.user_bruhs[curr_bruh].bruh_hp -= currEnemy.enememe_atk;
            } else {
                immuneDMG = false;
            }

            const feedback_prompt = document.getElementById('feedback_prompt');
            feedback_prompt.style.display = 'flex';
            feedback_prompt.style.border = '5px solid red';
            feedback_prompt.style.color = 'red';
            feedback_prompt.innerHTML = '';
            feedback_prompt.textContent = 'NOPE!';
            setTimeout(() => {
                feedback_prompt.style.display = 'none';
            }, 1000);
        }

        console.log(`userChar ${JSON.stringify(userChar)}`);
        console.log(`timeDifference ${timeDifference}`);
        console.log(`correctAnswerChecker ${correctAnswerChecker}`);
        console.log(`wrongAnswerChecker ${wrongAnswerChecker}`);
        console.log(`prevLevel ${prevLevel}`);
        await updateUserData(userChar, timeDifference, correctAnswerChecker, wrongAnswerChecker, prevLevel, 'question');
        displayPokememe(currEnemy);
        displayBruh(userChar);

        curr_question.style.display = 'none';
        if (userChar.user_bruhs[curr_bruh].bruh_hp <= 0) {
            scriptRunning = true;
            displayGameResult('LOSE');
        } else if (currEnemy.enememe_hp <= 0) {
            await updateUserDataStageCleared(userChar, 'module1Lecture2');
            displayGameResult('WON');
        } else {
            initValue(level_stat, timeDifference, correctAnswerChecker);
            nextQuestion();
        }
    };

    const displayBonus = (currBonus) => {
        pmemeQUES.innerHTML = '';
        pmemeQUES2.style.display = 'none';
        pmemeQUES.style.display = 'flex';
        const enemyQues = document.createElement('p');
        enemyQues.textContent = 'GET SOME HANDI WEAKLING!';
        pmemeQUES.appendChild(enemyQues);

        userCHOICES.innerHTML = '';
        let currentRow;
        currBonus.forEach((bns, index) => {
            if (index % 2 === 0) {
                // Create a new row every 2 items
                currentRow = document.createElement('div');
                currentRow.className = 'user-choices';
                userCHOICES.appendChild(currentRow);
            }
            const choiceSpan = document.createElement('span');
            
            choiceSpan.addEventListener('click', () => {
                handleUserBonus(bns, currUser);
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
            userChar.user_bruhs[curr_bruh].bruh_hp += parseInt(bns.split(" ")[2]);
        } else if (bns.startsWith("ATK")) {
            // Increase player character's attack power
            userChar.user_bruhs[curr_bruh].bruh_atk += parseInt(bns.split(" ")[2]);
        } else if (bns.startsWith("If answer is wrong")) {
            // Apply immunity to damage from incorrect answers
            immuneDMG = true;
        }

        await updateUserData(userChar, 0, 0, 0, prevLevel, 'bonus');
        displayPokememe(currEnemy);
        displayBruh(userChar);
        curr_question.style.display = 'none';
        checkReturnPrompt(simulateDTTS(userChar, 'bonus'));
    }

    const displayWarning = () => {
        const gigaGuide2 = document.getElementById('gigaGuide2');
        const script0A = document.getElementById('script0A');

        gigaGuide2.style.display = 'block';
        script0A.style.display = 'block';
        gigaGuide2.classList.add('bring-top');
        script0A.classList.add('bring-top');
        getFeedback(script0A, prevLevel, timeDifference, isCorrect);
        // document, difficulty level, time, isCorrect
        // src2, prevLevel, timeDifference, isCorrect

        setTimeout(() => {
            gigaGuide2.style.display = 'none';
            script0A.style.display = 'none';
            gigaGuide2.classList.remove('bring-top');
            script0A.classList.remove('bring-top');
            curr_question.style.display = 'none';
            checkReturnPrompt(simulateDTTS(currUser, 'warning'));
        }, 1000);
    }

    const nextQuestion = () => {
        checkReturnPrompt(simulateDTTS(currUser, 'all'));
    };

    // pop ups
    const showPopupBruhs = async () => {
        const battle_bruhs_option = document.getElementById('battle_bruhs_option');
        battle_bruhs_option.style.display = 'flex';

        const ownedBruhs = currUser.user_bruhs;

        const bruh_list = document.getElementById('bruh_list');
        bruh_list.innerHTML = '';

        let rowCounter = 0;
        let currentRow;

        ownedBruhs.forEach((character) => {
            if (rowCounter % 2 === 0) {
                // Create a new row every 2 items
                currentRow = document.createElement('div');
                currentRow.className = 'list-popups';
                bruh_list.appendChild(currentRow);
            }
            const characterElement = document.createElement('span');

            // Add click event to get the character index
            characterElement.addEventListener('click', function () {
                curr_bruh = ownedBruhs.indexOf(character);
                origATK = character.bruh_atk;
                displayBruh(currUser);
                battle_bruhs_option.style.display = 'none';
            });

            // right side
            const rightDiv = document.createElement('div');
            rightDiv.classList.add('bruh-popup-rightDiv');

            const characterImg = document.createElement('img');
            characterImg.src = character.bruh_img;
            characterImg.alt = character.bruh_name;

            const charNameTextElement = document.createElement('p');
            charNameTextElement.textContent = character.bruh_name;

            rightDiv.appendChild(characterImg);
            rightDiv.appendChild(charNameTextElement);

            // left side
            const leftDiv = document.createElement('div');
            leftDiv.classList.add('bruh-popup-leftDiv');

            const itemDetailTable = document.createElement('table');
            const orderDetails = ['bruh_hp', 'bruh_atk'];
            // Populate details as rows in the table based on the specified order
            orderDetails.forEach((detailKey) => {
                if (character.hasOwnProperty(detailKey)) {
                    const row = document.createElement('tr');
                    const cell1 = document.createElement('td');
                    const cell2 = document.createElement('td');
                    cell1.textContent = alterDetailKey(detailKey);
                    cell2.textContent = character[detailKey];
                    row.appendChild(cell1);
                    row.appendChild(cell2);
                    itemDetailTable.appendChild(row);
                }
            });
            leftDiv.appendChild(itemDetailTable);

            characterElement.appendChild(rightDiv);
            characterElement.appendChild(leftDiv);
            currentRow.appendChild(characterElement);
            rowCounter++;
        });
    }

    const showPopupItems = async () => {
        const battle_items_option = document.getElementById('battle_items_option');
        battle_items_option.style.display = 'flex';
        
        const user = await getCurrentUserFromFirestore();
        const ownedItems = user.user_inventoryItems;
    
    
        const item_list = document.getElementById('item_list');
        item_list.innerHTML = '';
    
        if (ownedItems.length === 0) {
            item_list.textContent = 'No items';
        }
    
        let rowCounter = 0;
        let currentRow;
    
        ownedItems.forEach((item) => {
            if (rowCounter % 2 === 0) {
                // Create a new row every 2 items
                currentRow = document.createElement('div');
                currentRow.className = 'list-popups';
                item_list.appendChild(currentRow);
            }
            const itemElement = document.createElement('span');
    
            // Add click event to show item details
            itemElement.addEventListener('click', async function() {
                switch(item.item_description) {
                    case "Attack + 2":
                        currUser.user_bruhs[curr_bruh].bruh_atk += 2;
                        break;
                    case "hp + 10":
                        currUser.user_bruhs[curr_bruh].bruh_hp += 10;
                        break;
                    case "Attack + 2, hp + 3":
                        currUser.user_bruhs[curr_bruh].bruh_atk += 2;
                        currUser.user_bruhs[curr_bruh].bruh_hp += 3;
                        break;
                    default:
                        console.log(`Can't read item: ${item.item_description}`);
                        break;
                }
                await updateUserItems(currUser, ownedItems.indexOf(item));
                displayBruh(currUser);
                battle_items_option.style.display = 'none';
            });
    
            // right side
            const rightDiv = document.createElement('div');
            rightDiv.classList.add('bruh-popup-rightDiv');
    
            const itemImg = document.createElement('img');
            itemImg.src = item.item_img;
            itemImg.alt = item.item_name;
    
            const charNameTextElement = document.createElement('p');
            charNameTextElement.textContent = item.item_name;
    
            rightDiv.appendChild(itemImg);
            rightDiv.appendChild(charNameTextElement);
    
            // left side
            const leftDiv = document.createElement('div');
            leftDiv.classList.add('bruh-popup-leftDiv');
    
            const itemDetailTable = document.createElement('table');
            const orderDetails = ['item_description'];
            // Populate details as rows in the table based on the specified order
            orderDetails.forEach((detailKey) => {
                if (item.hasOwnProperty(detailKey)) {
                    const row = document.createElement('tr');
                    const cell1 = document.createElement('td');
                    cell1.textContent = item[detailKey];
                    cell1.style.fontSize = '10px';
                    row.appendChild(cell1);
                    itemDetailTable.appendChild(row);
                }
            });
            leftDiv.appendChild(itemDetailTable);
    
            itemElement.appendChild(rightDiv);
            itemElement.appendChild(leftDiv);
            currentRow.appendChild(itemElement);
            rowCounter++;
        });
    }
    
    const displayGameResult = (result) => {
        const userWon = document.getElementById('userWon');
        const userLose = document.getElementById('userLose');
        const alreadyClear = document.getElementById('alreadyClear');
        gameResultCanvas.style.display = 'block';

        const scoreResult = document.querySelectorAll('.scoreResult');
        scoreResult.forEach(result => {
            result.innerHTML = '';
            result.textContent = total_score;
        });

        const CF_result = document.querySelectorAll('.CF_result');
        CF_result.forEach(CF => {
            CF.innerHTML = '';
            CF.textContent = total_CF;
        });

        switch(result){
            case 'WON':
                userWon.style.display = 'block';
                userLose.style.display = 'none';
                alreadyClear.style.display = 'none';
                break;
            case 'LOSE':
                userWon.style.display = 'none';
                userLose.style.display = 'block';
                alreadyClear.style.display = 'none';
                break;
            case 'CLEAR':
                userWon.style.display = 'none';
                userLose.style.display = 'none';
                alreadyClear.style.display = 'block';
                break;
            default:
                console.log(`invalid result: ${result}`);
                gameResultCanvas.style.display = 'none';
                break;
        }
    }

    if (currUser.user_stageCleared.includes("module1Lecture2")) {
        displayGameResult('CLEAR');
    } else {
        // Start with the first question
        checkReturnPrompt(simulateDTTS(currUser, 'bonus'));
    }
};


const displayPokememe = (enemy) => {
    const pmemeIMG = document.getElementById('pmemeIMG');
    const pmemeSTATS = document.getElementById('pmemeSTATS');
    pmemeIMG.innerHTML = '';
    pmemeSTATS.innerHTML = '';

    pmemeIMG.src = enemy.enememe_img;
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
    pmemeSTATS.appendChild(enemyDetailTable);
}

const displayBruh = (currUser) => {
    console.log(`currUser: ${currUser}`);
    const userIMG = document.getElementById('userIMG');
    const userSTATS = document.getElementById('userSTATS');
    userIMG.innerHTML = '';
    userSTATS.innerHTML = '';

    // get the characters owned by the user then display it to battle
    const selectedBruh = currUser.user_bruhs[curr_bruh];
    userIMG.src = selectedBruh.bruh_img;

    // create table element for the selectedCharacter details then append to the div
    const selectedBruhTable = document.createElement('table');
    const orderDetails = ['bruh_name', 'bruh_hp', 'bruh_atk'];
    
    // Add the first row with merged cells
    const firstRow = document.createElement('tr');
    const cell = document.createElement('td');
    cell.textContent = selectedBruh[orderDetails[0]]; // Use the first detailKey
    cell.setAttribute('colspan', '2'); // Merge two cells
    firstRow.appendChild(cell);
    selectedBruhTable.appendChild(firstRow);

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
        cell2.textContent = selectedBruh[orderDetails[i]];

        row.appendChild(cell1);
        row.appendChild(cell2);
        selectedBruhTable.appendChild(row);
    }
    userSTATS.appendChild(selectedBruhTable);
}

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
    const currUserRef = doc(db, 'users', currUser.user_uid);
    const userStatDoc = await getDoc(currUserRef);
    const userStatData = userStatDoc.data();
    const userStats = userStatData.user_stats;

    
    let difficultQuestionsAnswered = userStats.user_difficultQuestionsAnswered;
    let easyQuestionsAnswered = userStats.user_easyQuestionsAnswered;
    let bonusTaken = userStats.user_bonusTaken;
    
    if (prevLevel === 'difficult') {
        difficultQuestionsAnswered += 1;
    } else if (prevLevel === 'easy') {
        easyQuestionsAnswered += 1;
    }

    if (mode === 'bonus') {
        bonusTaken += 1;
    }

    const totalScore = await computeScore(timeDifference, correctAnswerChecker, prevLevel, wrongAnswerChecker);
    total_score += totalScore;

    const updatedUserStats = {
        user_level: userStats.user_level,
        user_score: userStats.user_score + totalScore,
        user_answerTotalTime: userStats.user_answerTotalTime + timeDifference,
        user_correctAnswers: userStats.user_correctAnswers + correctAnswerChecker,
        user_difficultQuestionsAnswered: difficultQuestionsAnswered,
        user_easyQuestionsAnswered: easyQuestionsAnswered,
        user_bonusTaken: bonusTaken,
        user_incorrectAnswers: userStats.user_incorrectAnswers + wrongAnswerChecker,
        user_confidentialFund: userStats.user_confidentialFund
    };  
    await updateDoc(currUserRef, { 
        user_stats: updatedUserStats
    });
    console.log('User data updated to Firestore');
}

const computeScore = (timeDifference, correctAnswerChecker, prevLevel, wrongAnswerChecker) => {
    let timeScore;
    if (timeDifference <= 3) {
        timeScore = timeDifference * (timeDifference * 2);
    } else {
        timeScore = timeDifference / (timeDifference / 2);
    }
    let answerScore = (correctAnswerChecker * 10) - (wrongAnswerChecker * 5);
    let levlScore;
    if (prevLevel === 'difficult') {
        levlScore = 50;
    } else if (prevLevel === 'easy') {
        levlScore = 20;
    }
    return levlScore + timeScore + answerScore;
}

const updateUserDataStageCleared = async (currUser, stageCleared) => {
    // get user document from the firebase
    const currUserRef = doc(db, 'users', currUser.user_uid);
    const userDoc = await getDoc(currUserRef);

    if (userDoc.exists()) {
        // Get the current user data
        const userData = userDoc.data();
        const updatedUserStageCleared = [...userData.user_stageCleared, stageCleared];
        const userStats = userData.user_stats;

        let stageClearedBonusScore = 1000;
        let stageClearedCF_reward = 1234;
        total_score += stageClearedBonusScore;
        total_CF += stageClearedCF_reward;

        const updatedUserStats = {
            user_level: userStats.user_level + 1,
            user_score: userStats.user_score + stageClearedBonusScore,
            user_answerTotalTime: userStats.user_answerTotalTime,
            user_correctAnswers: userStats.user_correctAnswers,
            user_difficultQuestionsAnswered: userStats.user_difficultQuestionsAnswered,
            user_easyQuestionsAnswered: userStats.user_easyQuestionsAnswered,
            user_bonusTaken: userStats.user_bonusTaken,
            user_incorrectAnswers: userStats.user_incorrectAnswers,
            user_confidentialFund: userStats.user_confidentialFund + stageClearedCF_reward
        }; 

        await updateDoc(currUserRef, { 
            user_stageCleared: updatedUserStageCleared,
            user_stats: updatedUserStats
        });
        console.log('User stageCleared updated to Firestore');
    }
}

const updateUserItems = async (currUser, itemIndex) => {
    // get user document from the firebase
    const currUserRef = doc(db, 'users', currUser.user_uid);
    const userDoc = await getDoc(currUserRef);

    if (userDoc.exists()) {
        // Get the current user data
        const userData = userDoc.data();
        let invItems = userData.user_inventoryItems;

        invItems.splice(itemIndex, 1);

        await updateDoc(currUserRef, { 
            user_inventoryItems: invItems,
        });
        console.log('Item removed from firestore');
    }
}


function alterDetailKey(detailKey) {
    switch (detailKey) {
        case 'bruh_name':
        case 'item_name':
            return 'Name';
        case 'bruh_hp':
            return 'HP';
        case 'bruh_atk':
            return 'ATK';
        case 'bruh_description':
        case 'item_description':
            return 'Description';
        default:
            return '';
    }
}

const exit_btn = document.getElementById('exit_btn');
exit_btn.addEventListener('click', () => {
    const battle_exit_option = document.getElementById('battle_exit_option');
    battle_exit_option.style.display = 'flex';
})