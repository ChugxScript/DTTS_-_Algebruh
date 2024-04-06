let curr_script = -1;

// const scripts = [
//     "s1",
// ]

const scripts = [
    "yo ...",
    "You finally awake.",
    "So you’re the only survivor huh?",
    "You don’t remember what happened?",
    "...",
    "... ...",
    "Basically, you’re the only survivor when the pokememes nation attacks.",
    "Your bebe loves?",
    "What the heck is that?",
    "Anyways, that ‘bebe loves’ of yours is I think in the hands of the pokememes.",
    "You wanna save your ‘bebe loves’ ?",
    "Well if you are so determined i'll help you.",
    "First, before you recklessly go and fight these pokememes choose which ‘bruh’ you want to take with you.",
    // picking bruh
    
    "These bruhs are the one who can defeat these pokememes.",
    "However, these bruhs depend on your capability.",
    "Not by your fighting but your BRAIN.",
    "Oh… what’s that?",
    "Really? In front of my panci- EHEM! We don’t have a choice but to fight that sh-", //17
    // (battle begins)

    "Now that pokememe is enchanting something we don’t quite understand but if you READ carefully you can COUNTER their chanting by using the skill of your bruh.",
    "You can do it! Malaki ka na!",

    // (user wins)
    "EYYY! I know you can do it!",
    "You must be exhausted. Come to my place and rest!",

    "YOUR JOURNEY BEGINS BRUH!",
    // (end of prologue)

]

const revive_scripts = [
    "HEY! Take this one seriously! Your lucky that I bring potion with me.",
    "Here take it to your bruh.",
    "Now FIGHT!",
]

const scr1 = document.getElementById('scr1');
let clickSpam = false;
document.addEventListener('click', () => {
    if (!clickSpam) {
        nextScript('script');
    }
    console.log(`curr_script: ${curr_script} | scripts.length: ${scripts.length}`);
    if (curr_script >= scripts.length) {
        const queryParams = `?uid=${user_uid}`;
        window.location.href = `../html/dashboard.html${queryParams}`;
    }
});

function nextScript(phase) {
    if (phase == 'script') {
        if (curr_script == 12) {
            const preludeBruhs = document.getElementById('preludeBruhs');
            preludeBruhs.style.display = 'flex';
            scr1.style.top = "2%";

        } else if (curr_script == 15) {
            const gigaGuide = document.getElementById('gigaGuide');
            const showPokememe = document.getElementById('showPokememe');
            gigaGuide.style.display = 'none';
            showPokememe.style.display = 'block';
            clickSpam = true;

            setTimeout(() => {
                gigaGuide.style.display = 'block';
                showPokememe.style.display = 'none';
                curr_script += 1;
                scr1.textContent = scripts[curr_script];
                clickSpam = false;
            }, 3000);

        } else if (curr_script == 16) {
            curr_script += 1;
            scr1.textContent = scripts[curr_script];
            clickSpam = true;

            setTimeout(() => {
                const battleStartButton = document.getElementById('battleStartButton');
                battleStartButton.style.display = 'block';
                clickSpam = false;
            }, 3000);

        } else if (curr_script == 17) {
            const gigaGuide = document.getElementById('gigaGuide');
            gigaGuide.style.display = 'none';
        } 
        else {
            scr1.innerText = '';
            curr_script += 1;
            scr1.textContent = scripts[curr_script];
        }
    } else if (phase == 'displayBruhs') {
        const preludeBruhs = document.getElementById('preludeBruhs');
        const bruhDetailsPopup = document.getElementById('bruhDetailsPopup');
        preludeBruhs.style.display = 'none';
        bruhDetailsPopup.style.display = 'none';

        scr1.style.top = ((divHeight - scr1.offsetHeight) / 4)+ "px";
        curr_script += 1;
        scr1.textContent = scripts[curr_script];
    } else {
        const preludeBattleCanvas = document.getElementById('preludeBattleCanvas');
        const gigaGuide = document.getElementById('gigaGuide');
        preludeBattleCanvas.style.display = 'none';
        gigaGuide.style.display = 'block';

        console.log(`phase: ${phase}`);
        user_uid = phase;

        curr_script == 19;
        scr1.textContent = scripts[curr_script];
        clickSpam = false;
    }
}