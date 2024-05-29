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
        'module2Lecture1',
        'module2Lecture2',
        'module3Lecture1',
        'module3Lecture2',
        'module4Lecture1',
        'module4Lecture2',
        'module5lecture1',
        'module5lecture2',
        'module5lecture3',
        'module6lecture1',
        'module6lecture2',
        'module7lecture1',
        'module7lecture2',
        'module89Lecture12',
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
        case 'module2Lecture1':
            return 'STAGE 2 | MODULE-2 LEC-1';
        case 'module2Lecture2':
            return 'STAGE 2 | MODULE-2 LEC-2';
        case 'module3Lecture1':
            return 'STAGE 3 | MODULE-3 LEC-1';
        case 'module3Lecture2':
            return 'STAGE 3 | MODULE-3 LEC-2';
        case 'module4Lecture1':
            return 'STAGE 4 | MODULE-4 LEC-1';
        case 'module4Lecture2':
            return 'STAGE 4 | MODULE-4 LEC-2';
        case 'module5lecture1':
            return 'STAGE 5 | MODULE-5 LEC-1';
        case 'module5lecture2':
            return 'STAGE 5 | MODULE-5 LEC-2';
        case 'module5lecture3':
            return 'STAGE 5 | MODULE-5 LEC-3';
        case 'module6lecture1':
            return 'STAGE 6 | MODULE-6 LEC-1';
        case 'module6lecture2':
            return 'STAGE 6 | MODULE-6 LEC-2';
        case 'module7lecture1':
            return 'STAGE 7 | MODULE-7 LEC-1';
        case 'module7lecture2':
            return 'STAGE 7 | MODULE-7 LEC-2';
        case 'module89Lecture12':
            return 'STAGE 8&9 | MODULE-8&9 LEC-1&2';
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
        case 'module2Lecture1':
            window.location.href = `../js/M2L1/M2L1.html${queryParams}`;
            break;
        case 'module2Lecture2':
            window.location.href = `../js/M2L2/M2L2.html${queryParams}`;
            break;
        case 'module3Lecture1':
            window.location.href = `../js/M3L1/M3L1.html${queryParams}`;
            break;
        case 'module3Lecture2':
            window.location.href = `../js/M3L2/M3L2.html${queryParams}`;
            break;
        case 'module4Lecture1':
            window.location.href = `../js/M4L1/M4L1.html${queryParams}`;
            break;
        case 'module4Lecture2':
            window.location.href = `../js/M4L2/M4L2.html${queryParams}`;
            break;
        case 'module5lecture1':
            window.location.href = `../js/M5L1/M5L1.html${queryParams}`;
            break;
        case 'module5lecture2':
            window.location.href = `../js/M5L2/M5L2.html${queryParams}`;
            break;
        // case 'module5lecture3':
        //     window.location.href = `../js/M5L3/M5L3.html${queryParams}`;
        //     break;
        case 'module6lecture1':
            window.location.href = `../js/M6L1/M6L1.html${queryParams}`;
            break;
        case 'module6lecture2':
            window.location.href = `../js/M6L2/M6L2.html${queryParams}`;
            break;
        case 'module7lecture1':
            window.location.href = `../js/M7L1/M7L1.html${queryParams}`;
            break;
        case 'module7lecture2':
            window.location.href = `../js/M7L2/M7L2.html${queryParams}`;
            break;
        case 'module89Lecture12':
            window.location.href = `../js/M89/M89.html${queryParams}`;
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