// load background on file load
document.addEventListener('DOMContentLoaded', function () {
    // Set the gigaGuideImg dynamically
    const movableImage = document.getElementById('gigaGuide');
    const gigaGuideImg = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.noelshack.com%2Ffichiers%2F2019%2F41%2F7%2F1571000104-chad2.png&f=1&nofb=1&ipt=0eb377992866e6086127a914e26503e8a1101ad88638b49febb767a43211e778&ipo=images';
    movableImage.src = gigaGuideImg;
});

// giga-guide prelude script
const gigaGuidePreludeScripts = [
    {
        texts: [
            "unang script! ",
            "bruh! ",
            "bruh! bruh! ",
            "bruh! bruh! bruh! ",
            "bruh! bruh! bruh! bruh! ",
        ],
        imageSrc:'https://cdn.discordapp.com/attachments/1200058397236666378/1203202514162548796/simplier-textbox.png?ex=65d03ca9&is=65bdc7a9&hm=5b5ae5be58ff5e5c3f84ab13f0e96e39f402808fef8774d8505a92fc5999d36f&',
    },
    {
        texts: [
            "pangalawang script",
            "bruh2! ",
            "bruh2! bruh2! ",
            "bruh2! bruh2! bruh2! ",
            "bruh2! bruh2! bruh2! bruh2! ",
        ],
        imageSrc:'https://cdn.discordapp.com/attachments/1200058397236666378/1203202514162548796/simplier-textbox.png?ex=65d03ca9&is=65bdc7a9&hm=5b5ae5be58ff5e5c3f84ab13f0e96e39f402808fef8774d8505a92fc5999d36f&',
    },
    {
        texts: [
            "pangatlong script",
            "select your bruh ",
        ],
        imageSrc:'https://cdn.discordapp.com/attachments/1200058397236666378/1203241780917702697/simplier-textbox-square.png?ex=65d0613b&is=65bdec3b&hm=ec64263326337c3da95235d897539952332d7ce184c6a8ae2548ecdf2f6c900b&',
    },
    {
        texts: [
            "pang-apat na script",
            "who's that pokemin? ",
            "it's chanting curses! Defeat it with the correct 'counter-chant'! ",
        ],
        imageSrc:'https://cdn.discordapp.com/attachments/1200058397236666378/1203202514162548796/simplier-textbox.png?ex=65d03ca9&is=65bdc7a9&hm=5b5ae5be58ff5e5c3f84ab13f0e96e39f402808fef8774d8505a92fc5999d36f&',
    },
    // Add more scripts as needed
];
let currentScenarioIndex = 3;
let currentDialogIndex = 0;
let allowNextDialog = true;
const enemyPokemin = 'https://media1.tenor.com/m/aLc7c9puW4sAAAAC/black-man.gif';
const gigaGuideImg = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.noelshack.com%2Ffichiers%2F2019%2F41%2F7%2F1571000104-chad2.png&f=1&nofb=1&ipt=0eb377992866e6086127a914e26503e8a1101ad88638b49febb767a43211e778&ipo=images';
// Function to handle clicks anywhere on the screen
document.addEventListener('DOMContentLoaded', function () {
    updateDialog();
});
document.body.addEventListener('click', function () {
    if (allowNextDialog) {
        nextDialog();
    }
});
function nextDialog() {
    if (currentDialogIndex < gigaGuidePreludeScripts[currentScenarioIndex].texts.length - 1) {
        currentDialogIndex++;
        updateDialog();
    } else {
        // End of dialog in the current scenario, transition to the next scenario
        nextScene();
    }
}
function updateDialog() {
    // get doucment ids
    const preludeContent = document.getElementById('preludeContent');
    const gigaGuide = document.getElementById('gigaGuide');
    const gigaGuideTextBox = document.getElementById('gigaGuideTextBox');
    const gigaGuideTextBoxScript = document.getElementById('gigaGuideTextBoxScript');
    const showPreludeCharacters = document.getElementById('showPreludeCharacters');
    const preludeCharactersDetailsPopup = document.getElementById('preludeCharactersDetailsPopup');
    
    const preludeUnknownPokeminEnemyBulaga = document.getElementById('preludeUnknownPokeminEnemyBulaga');
    
    const preludeContentBattle = document.getElementById('preludeContentBattle');
    const gigaGuideBattle = document.getElementById('gigaGuideBattle');
    const gigaGuideTextBoxBattle = document.getElementById('gigaGuideTextBoxBattle');
    const gigaGuideTextBoxScriptBattle = document.getElementById('gigaGuideTextBoxScriptBattle');

    const preludeUnknownPokeminEnemyContainer = document.getElementById('preludeUnknownPokeminEnemyContainer');
    const unknownPokeminImg = document.getElementById('unknownPokeminImg');
    const unknownPokeminTextBox = document.getElementById('unknownPokeminTextBox');
    const unknownPokeminTextBoxQuestion = document.getElementById('unknownPokeminTextBoxQuestion');
    const unknownPokeminDetails = document.getElementById('unknownPokeminDetails');
    
    const preludeUserBattleContainer = document.getElementById('preludeUserBattleContainer');
    const preludeUserSelectedCharacter = document.getElementById('preludeUserSelectedCharacter');
    const preludeUserSkillBox = document.getElementById('preludeUserSkillBox');
    const preludeUserRandomScript = document.getElementById('preludeUserRandomScript');
    const preludeUserSkillOptions = document.getElementById('preludeUserSkillOptions');
    const preludeUserCharacterDetails = document.getElementById('preludeUserCharacterDetails');
    const preludeUserStageScore = document.getElementById('preludeUserStageScore');

    // giga guide
    gigaGuideBattle.src = gigaGuideImg;
    // textbox
    gigaGuideTextBox.src = gigaGuidePreludeScripts[currentScenarioIndex].imageSrc;
    gigaGuideTextBoxBattle.src = gigaGuidePreludeScripts[currentScenarioIndex].imageSrc;
    // script
    gigaGuideTextBoxScript.textContent = gigaGuidePreludeScripts[currentScenarioIndex].texts[currentDialogIndex];
    gigaGuideTextBoxScriptBattle.textContent = gigaGuidePreludeScripts[currentScenarioIndex].texts[currentDialogIndex];

    // Changing contents and bboxes
    if (currentScenarioIndex == 0) {
        // display elements introductions
        gigaGuide.style.display = 'block';
        gigaGuideTextBox.style.display = 'block';
        gigaGuideTextBoxScript.style.display = 'block';
    } else if (currentScenarioIndex == 1) {
        if (currentDialogIndex % 2 == 0) {
            gigaGuide.classList.add('giga-guide-right');
            gigaGuideTextBox.classList.add('giga-guide-textBox-right');
            gigaGuideTextBoxScript.classList.add('giga-guide-textBox-script-right');
            gigaGuide.classList.remove('giga-guide');
            gigaGuideTextBox.classList.remove('giga-guide-textBox');
            gigaGuideTextBoxScript.classList.remove('giga-guide-textBox-script');
        } else {
            gigaGuide.classList.remove('giga-guide-right');
            gigaGuideTextBox.classList.remove('giga-guide-textBox-right');
            gigaGuideTextBoxScript.classList.remove('giga-guide-textBox-script-right');
            gigaGuide.classList.add('giga-guide');
            gigaGuideTextBox.classList.add('giga-guide-textBox');
            gigaGuideTextBoxScript.classList.add('giga-guide-textBox-script');
        }
    } else if (currentScenarioIndex == 2) {
        gigaGuide.classList.remove('giga-guide');
        gigaGuideTextBox.classList.remove('giga-guide-textBox');
        gigaGuideTextBoxScript.classList.remove('giga-guide-textBox-script');
        gigaGuide.classList.remove('giga-guide-right');
        gigaGuideTextBox.classList.remove('giga-guide-textBox-right');
        gigaGuideTextBoxScript.classList.remove('giga-guide-textBox-script-right');

        // add new classes
        gigaGuide.classList.add('giga-guide');
        gigaGuideTextBox.classList.add('giga-guide-textBox-scene3');
        gigaGuideTextBoxScript.classList.add('giga-guide-textBox-script-scene3');

        // move this to its approriate position when done testing
        showPreludeCharacters.style.display = 'none';
        preludeCharactersDetailsPopup.style.display = 'none';
        preludeUnknownPokeminEnemyBulaga.style.display = 'none';
        preludeContentBattle.style.display = 'none';

        if (currentDialogIndex == 1) {
            allowNextDialog = false;
            showPreludeCharacters.style.display = 'block';
        }
    } else if (currentScenarioIndex == 3) {
        // hide contents and show enemy 
        preludeContent.style.display = 'none';
        preludeContentBattle.style.display = 'none';

        preludeUnknownPokeminEnemyBulaga.style.display = 'block'; 
        preludeUnknownPokeminEnemyBulaga.style.backgroundImage = `url('${enemyPokemin}')`;
        preludeUnknownPokeminEnemyBulaga.style.backgroundSize = 'cover';
        allowNextDialog = false;

        if (currentDialogIndex == 2) {
            setTimeout(() => {
                preludeUnknownPokeminEnemyBulaga.style.display = 'none'; 
                preludeContentBattle.style.display = 'block';
            }, 3000);
            setTimeout(() => {
                // hide guide
                gigaGuideBattle.style.display = 'none';
                gigaGuideTextBoxBattle.style.display = 'none';
                gigaGuideTextBoxScriptBattle.style.display = 'none';
            }, 6000);
            
        } else {
            setTimeout(() => {
                preludeUnknownPokeminEnemyBulaga.style.display = 'none'; 
                preludeContentBattle.style.display = 'block';
                allowNextDialog = true;
            }, 3000);
        }
    } else if  (currentScenarioIndex == 4) {
        // Additional logic for other scenarios
    }
}
function nextScene() {
    if (currentScenarioIndex < gigaGuidePreludeScripts.length - 1) {
        // Move to the next scenario
        currentScenarioIndex++;
        currentDialogIndex = 0; // Reset dialog index for the new scenario
        updateDialog();

    } else {
        // No more gigaGuidePreludeScripts, game end or loop back to the beginning
        // Redirect to the prelude HTML
        // window.location.href = 'dashboard.html';
        alert('forward html to dashboard');
    }
}

function closePreludeCharactersDetailsPopup() {
    const preludeCharactersDetailsPopup = document.getElementById('preludeCharactersDetailsPopup');
    preludeCharactersDetailsPopup.style.display = 'none';
}