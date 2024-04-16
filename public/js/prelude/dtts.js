let curr_level;
let curr_time;
let curr_isCorrect;
export const initValue = (level, time, isCorect) => {
    curr_level = level;
    curr_time = time;
    curr_isCorrect = isCorect;
}

export const simulateDTTS = (currUser, phase) => {
    switch (phase) {
        case 'all':
            // Calculate weights based on user attributes
            const easyWeight = calculateWeight(currUser, 'easy');
            const difficultWeight = calculateWeight(currUser, 'difficult');
            const bonusWeight = calculateWeight(currUser, 'bonus');
            const warningWeight = calculateWeight(currUser, 'warning');
            
            // Randomly choose a difficulty level based on weights
            const difficultyLevels = ['easy', 'difficult', 'bonus', 'warning'];
            return weightedRandom(difficultyLevels, [easyWeight, difficultWeight, bonusWeight, warningWeight]);

        case 'warning':
            curr_level = 'warning';
            return regulateReturnValue();

        case 'bonus':
            curr_level = 'bonus';
            return regulateReturnValue();

        default:
            console.error(`Invalid phase: ${phase}`);
            return null;
    }
};

const calculateWeight = (user, level) => {
    let weight_answerTotalTime = 0;
    let weight_bonusTaken = 0;
    let weight_correctAnswers = 0;
    let weight_difficultQuestionsAnswered = 0;
    let weight_easyQuestionsAnswered = 0;
    let weight_incorrectAnswers = 0;

    if (level == 'easy') {
        weight_answerTotalTime = 0.1;
        weight_bonusTaken = 0.05;
        weight_correctAnswers = 0.05;
        weight_difficultQuestionsAnswered = 0.9;
        weight_easyQuestionsAnswered = 0.3;
        weight_incorrectAnswers = 0.7;

    } else if (level == 'difficult') {
        weight_answerTotalTime = 0.5;
        weight_bonusTaken = 0.1;
        weight_correctAnswers = 0.1;
        weight_difficultQuestionsAnswered = 0.1;
        weight_easyQuestionsAnswered = 0.9;
        weight_incorrectAnswers = 0.1;

    } else if (level == 'bonus') {
        weight_answerTotalTime = 0.5;
        weight_bonusTaken = 0.9;
        weight_correctAnswers = 0.1;
        weight_difficultQuestionsAnswered = 0.9;
        weight_easyQuestionsAnswered = 0.9;
        weight_incorrectAnswers = 0.9;

    } else {
        weight_answerTotalTime = 0.9;
        weight_bonusTaken = 0.3;
        weight_correctAnswers = 0.7;
        weight_difficultQuestionsAnswered = 0.3;
        weight_easyQuestionsAnswered = 0.3;
        weight_incorrectAnswers = 0.7;

    }

    // Calculate the weighted sum of user attributes
    const weightedSum =
        user.user_answerTotalTime * weight_answerTotalTime +
        user.user_bonusTaken * weight_bonusTaken +
        user.user_correctAnswers * weight_correctAnswers +
        user.user_difficultQuestionsAnswered * weight_difficultQuestionsAnswered +
        user.user_easyQuestionsAnswered * weight_easyQuestionsAnswered +
        user.user_incorrectAnswers * weight_incorrectAnswers;

    return weightedSum;
};

// Helper function for weighted random selection
const weightedRandom = (items, weights) => {
    const totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
    // const randomValue = Math.random() * totalWeight;
    const randomValue = Math.random();

    let cumulativeWeight = 0;
    for (let i = 0; i < items.length; i++) {
        cumulativeWeight += weights[i] / totalWeight;
        if (randomValue <= cumulativeWeight) {
            console.log(`items[i]: ${items[i]}`);
            return items[i];
        }
    }

    // Fallback in case of unexpected values
    return regulateReturnValue();
};

const regulateReturnValue = () =>  {
    switch (curr_level) {
        case 'easy':
            if (curr_time < 3) {
                return chooseLevel(['warning', 'bonus', 'difficult'], [0.7, 0.1, 0.2]);
            } else {
                return curr_isCorrect ? 'difficult' : chooseLevel(['bonus', 'easy'], [0.7, 0.3]);
            }

        case 'difficult':
            if (curr_time < 3) {
                return chooseLevel(['warning', 'bonus', 'easy'], [0.5, 0.3, 0.2]);
            } else {
                return curr_isCorrect ? 'bonus' : chooseLevel(['bonus', 'easy', 'difficult'], [0.5, 0.3, 0.2]);
            }

        case 'bonus':
            return chooseLevel(['easy', 'difficult'], [0.3, 0.7]);
        case 'warning':
            return chooseLevel(['easy', 'difficult'], [0.5, 0.5]);

        default:
            console.error(`Invalid curr_level: ${curr_level}`);
            return null;
    }
}
const chooseLevel = (options, probabilities) => {
    const randomNumber = Math.random();
    console.log(`chooseLevel randomNumber: ${randomNumber}`);
    let cumulativeProbability = 0;

    for (let i = 0; i < options.length; i++) {
        cumulativeProbability += probabilities[i];
        console.log(`cumulativeProbability: ${cumulativeProbability}`);
        if (randomNumber <= cumulativeProbability) {
            console.log(`options[i]: ${options[i]}`);
            return options[i];
        }
    }

    // If no value is returned from the loop, return a fallback option
    const fallbackIndex = Math.floor(Math.random() * options.length);
    return options[fallbackIndex];
};


export const getNextQuestion = (questionsArray) => {
    const randomIndex = Math.floor(Math.random() * questionsArray.length);
    return questionsArray[randomIndex];
};

export const getNextBonus = (bonus) => {
    // Create a copy of the bonus array to avoid modifying the original array
    const bonusCopy = [...bonus];
    const selectedBonusItems = [];

    // Select four random items from the bonus array
    for (let i = 0; i < 4; i++) {
        // Generate a random index within the range of the bonus array length
        const randomIndex = Math.floor(Math.random() * bonusCopy.length);

        // Add the selected item to the result array and remove it from the bonusCopy array
        selectedBonusItems.push(bonusCopy.splice(randomIndex, 1)[0]);
    }

    return selectedBonusItems;
};



export const getFeedback = (scriptElement, prevLevel, timeDifference, isCorrect) => {
    if (prevLevel == 'difficult') {
        if (timeDifference <= 3) {
            if (!isCorrect) {
                scriptElement.textContent = 'I know that the problem is difficult, but please take this seriously :(';
            } else {
                scriptElement.textContent = 'YOU F*cking LUCKY nang hula ka lang naman >:(';
            }
        } else {
            if (!isCorrect) {
                scriptElement.textContent = 'Thats alright! Keep moving!';
            } else {
                scriptElement.textContent = 'YOU F*cking GENIUS! :O';
            }
        }
    } else {
        if (timeDifference <= 3) {
            if (!isCorrect) {
                scriptElement.textContent = 'WAG MO HULAAN! MADALI LANG ANG PROBLEM! >:(';
            } else {
                scriptElement.textContent = 'O diba! BAAAAAAAAAAASIC!'
            }
        } else {
            if (!isCorrect) {
                scriptElement.textContent = 'idunno what to say. even a baby can answer it but you guess it wrong :(';
            } else {
                scriptElement.textContent = 'OKAY! NOW DO IT FASTER!'
            }
        }
    }
    
}