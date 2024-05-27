import { getStagesFromFirestore, getCurrentUserFromFirestore } from "./getFirestore.js";

export const showJourneyStages = async () => { 
    const journeyContainer = document.getElementById('journeyContainer');
    const stagesContainer = document.getElementById('stagesContainer');
    journeyContainer.style.display = 'flex';
    stagesContainer.innerHTML = '';


    const user = await getCurrentUserFromFirestore();
    const clearedStages = user.user_stageCleared;
    const stages = await getStagesFromFirestore();

    console.log(`clearedStages: ${JSON.stringify(clearedStages)}`);
    console.log(`stages: ${JSON.stringify(stages)}`);

    const stageList = [
        'module1Lecture1',
        'module1Lecture2',
        'module1Lecture3',
        'module2',
        'module3',
        'module4',
        'module5',
        'module6',
        'module7',
        'module8',
        'module9',
    ]

    let stageClearedDiv;
    let stageNotClearedDiv;
    stages.forEach(stage => {
        if (clearedStages.includes(stage.stage_requirement) && stageList.includes(stage.stage_uid)) {
            // Stage is cleared and in the stageList
            stageClearedDiv = document.createElement('div');
            stageClearedDiv.className = 'stage-cleared-div';

            stageClearedDiv.addEventListener('click', function() {
                redirectToStage(user, stage.stage_uid);
            })

            const stagePElement = document.createElement('p');
            stagePElement.textContent = alterName(stage.stage_uid);
            stageClearedDiv.appendChild(stagePElement);
            stagesContainer.appendChild(stageClearedDiv);

        } else if (!clearedStages.includes(stage.stage_requirement) && stageList.includes(stage.stage_uid)) {
            // Stage is not cleared and in the stageList
            stageNotClearedDiv = document.createElement('div');
            stageNotClearedDiv.className = 'stage-not-cleared-div';
            const stagePElement = document.createElement('p');
            stagePElement.textContent = alterName(stage.stage_uid);
            stageNotClearedDiv.appendChild(stagePElement);
            stagesContainer.appendChild(stageNotClearedDiv);
        }
    });
}

function alterName(stageName) {
    switch (stageName) {
        case 'module1Lecture1':
            return 'STAGE 1 | MODULE-1 LEC-1';
        case 'module1Lecture2':
            return 'STAGE 1 | MODULE-1 LEC-2';
        case 'module1Lecture3':
            return 'STAGE 1 | MODULE-1 LEC-3';
        case 'module2':
            return 'STAGE 2 | MODULE-2';
        case 'module3':
            return 'STAGE 3 | MODULE-3';
        case 'module4':
            return 'STAGE 4 | MODULE-4';
        case 'module5':
            return 'STAGE 5 | MODULE-5';
        case 'module6':
            return 'STAGE 6 | MODULE-6';
        case 'module7':
            return 'STAGE 7 | MODULE-7';
        case 'module8':
            return 'STAGE 8 | MODULE-8';
        case 'module9':
            return 'STAGE 9 | MODULE-9';
        default:
            return '';
    }
}

function redirectToStage(user, stageUID) {
    const queryParams = `?uid=${user.currUser_uid}`;
    switch(stageUID) {
        case 'module1Lecture1':
            window.location.href = `../js/M1L1/M1L1.html${queryParams}`;
            break;
        case 'module1Lecture2':
            window.location.href = `../js/M1L2/M1L2.html${queryParams}`;
            break;
        case 'module1Lecture3':
            window.location.href = `../js/M1L3/M1L3.html${queryParams}`;
            break;
        case 'module4':
            window.location.href = `../js/M4/m4.html${queryParams}`;
            break;
        case 'module5':
            window.location.href = `../js/M5/m5.html${queryParams}`;
            break;
        case 'module6':
            window.location.href = `../js/M6/m6.html${queryParams}`;
            break;
        case 'module7':
            window.location.href = `../js/M7/m7.html${queryParams}`;
            break;
        default:
            console.log(`invalid stageUID: ${stageUID}`);
            break;
    }
}

// module1Lecture1
// bonus
    // HP + 1
    // HP + 2
    // HP + 5
    // HP + 10
    // HP + 20
    // ATK + 1
    // ATK + 2
    // ATK + 5
    // If answer is wrong you will not recieve DMG
// difficultQuestions - array
//      map
//          choices - array
//          question - string
//          answer - string
// easyQuestions
// stage_requirement
// sample