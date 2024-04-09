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
        'module1Lecture3'
    ]

    let stageClearedDiv;
    let stageNotClearedDiv;
    stages.forEach(stage => {
        if (clearedStages.includes(stage.stage_requirement) && stageList.includes(stage.stage_uid)) {
            // Stage is cleared and in the stageList
            stageClearedDiv = document.createElement('div');
            stageClearedDiv.className = 'stage-cleared-div';
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
        default:
            return '';
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