import { getCurrentUserFromFirestore } from "./getFirestore.js";
import { getJourneyStagesFromFirebase } from "./getFirestore.js";

export const showJourneyContentContainer = async () => {
    const journeyContentContainer = document.getElementById('journeyContentContainer');
    const journeyStageContainer = document.getElementById('journeyStageContainer');
    journeyContentContainer.style.display = 'block';
    journeyStageContainer.innerHTML = '';

    const journeyStages = await getJourneyStagesFromFirebase();
    // Define the desired order of stage names
    const desiredOrder = ['Stage 1', 'Stage 2', 'Stage 3']; 

    // Sort the journey stages array based on the desired order
    const sortedJourneyStages = journeyStages.sort((a, b) => {
        return desiredOrder.indexOf(a.stage_name) - desiredOrder.indexOf(b.stage_name);
    });

    const currUser = await getCurrentUserFromFirestore();
    const currUserStageCleared = currUser[0].userStageCleared;
    
    sortedJourneyStages.forEach((stage) => {
        const journeyStageElement = document.createElement('div');
        journeyStageElement.className = 'journey-show-stages';

        // Add click event to show stage 
        journeyStageElement.addEventListener('click', () => showJourneyStage(stage, currUserStageCleared));

        journeyStageElement.style.backgroundImage = `url(${stage.stage_src_img})`;
        journeyStageElement.style.backgroundSize = 'cover';

        const journeyStageDivElement = document.createElement('div');
        journeyStageDivElement.className = 'journey-show-stages-pdiv'
        const journeyStageTextElement = document.createElement('p');
        journeyStageTextElement.textContent = stage.stage_name;

        if (!currUserStageCleared.includes(stage.stage_prerequisite)) {
            const journeyStageSpanElement = document.createElement('span');
            journeyStageSpanElement.textContent = '  [locked]';
            journeyStageTextElement.appendChild(journeyStageSpanElement);
        }

        journeyStageDivElement.appendChild(journeyStageTextElement);
        journeyStageElement.appendChild(journeyStageDivElement);
        journeyStageContainer.appendChild(journeyStageElement);
    });
}
const showJourneyStage = (stage, currUserStageCleared) => {
    if (!currUserStageCleared.includes(stage.stage_prerequisite)) {
        const journeyContentContainerConfirmLocked = document.getElementById('journeyContentContainerConfirmLocked');
        const journeyStageContainerConfirmLocked = document.getElementById('journeyStageContainerConfirmLocked');
        journeyContentContainerConfirmLocked.style.display = 'block';
        journeyStageContainerConfirmLocked.innerHTML = '';

        const journeyStageElement = document.createElement('div');
        journeyStageElement.className = 'journey-show-stages-confirmLocked';
        journeyStageElement.style.backgroundImage = `url(${stage.stage_src_img})`;
        journeyStageElement.style.backgroundSize = 'cover';
    
        const journeyStageDivElement = document.createElement('div');
        journeyStageDivElement.className = 'journey-show-stages-pdivLocked'
        const journeyStageTextElement = document.createElement('p');
        journeyStageTextElement.textContent = stage.stage_name;

        const journeyStageSpanElement = document.createElement('span');
        journeyStageSpanElement.textContent = '  [locked]';
        journeyStageTextElement.appendChild(journeyStageSpanElement);
    
        journeyStageDivElement.appendChild(journeyStageTextElement);
        journeyStageElement.appendChild(journeyStageDivElement);
        journeyStageContainerConfirmLocked.appendChild(journeyStageElement);
    } else {
        const journeyContentContainerConfirmation = document.getElementById('journeyContentContainerConfirmation');
        const journeyStageContainerConfirmation = document.getElementById('journeyStageContainerConfirmation');
        journeyContentContainerConfirmation.style.display = 'block';
        journeyStageContainerConfirmation.innerHTML = '';
    
        const journeyStageElement = document.createElement('div');
        journeyStageElement.className = 'journey-show-stages-confirmOK';
        journeyStageElement.style.backgroundImage = `url(${stage.stage_src_img})`;
        journeyStageElement.style.backgroundSize = 'cover';
    
        const journeyStageDivElement = document.createElement('div');
        journeyStageDivElement.className = 'journey-show-stages-pdivOK'
        const journeyStageTextElement = document.createElement('p');
        journeyStageTextElement.textContent = stage.stage_name;
    
        journeyStageDivElement.appendChild(journeyStageTextElement);
        journeyStageElement.appendChild(journeyStageDivElement);
        journeyStageContainerConfirmation.appendChild(journeyStageElement);
    }
}
const journeyStageConfirm = document.getElementById('journeyStageConfirm');
journeyStageConfirm.addEventListener('click', async function() {
    const getCurrUser = await getCurrentUserFromFirestore();
    const queryParams = `?uid=${getCurrUser[0].currUser_uid}`;
    window.location.href = `../path/to/html${queryParams}`;
})