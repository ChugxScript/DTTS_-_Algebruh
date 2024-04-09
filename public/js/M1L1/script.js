let curr_script = -1;

const scripts = [
    "Now that you have your bruh; defeating pokememes is not easy and relying on you bruh is not enough.",
    "Pokememes are always enchanting stuff that is out of the normal bruhs.",
    "If you dont counter their chanting your bruh will lose their hp ending up to your defeat.",
    "These pokememes are out of control and defeating them is our only choice.",
    "Now that you’ve seen how these pokememes act you need to train yourself and YOUR BRAIN to counter their chanting.",
    "You better prepare yourself HAHAHAHA the algorithm says its not gonna be easy.",
    "Lets test your knowledge first.Fight this pokememe.",

    // battle

    // #7
    "Tsk! Its not enough! We need to train more your brain juice! COME!",

    // title

    // #8
    "I know its sounds like nerdy and thoughts like...",
    "“what the heck is POLYNOMIAL FUNCTIONS” or...",
    "“I can’t even use it if im buying things in the grocery stores”, or...",
    "“Im here to play not to read boring lectures like in school” but...",
    "Do you know that this boring topic is one of the key why these grocery stores have their supply enough for you and other people to buy. Also for the scientist and businessman know if they are progressing or not.",

    // with pics #13
    "Let’s say your a 5 year old kid and you’re learning to grow plants in your backyard. You can use polynomial functions to track how tall your plants are growing each week or day if your impatient HAHAHA. For instance, you could measure the height of that plant every day and plot the data on a graph to see how it changes over time like this.",
    "Or you're 10 year old kid and you want to track your allowance. Suppose you receive a weekly allowance from your parents. You can use polynomial functions to calculate how much money you'll have saved up over the course of several weeks. For instance, if you save $5 each week, you could use a polynomial function to represent your total savings: 5x, where x represents the number of weeks like this.",
    "Or lets say you’re an 20 year old adult and you want Market Analysis and Business Forecasting. For instance, you can use polynomial regression models to analyze historical sales data and predict future sales trends, helping businesses make strategic decisions about production, inventory management, and marketing strategies. So if your sale is going down every month you should start to worry and start a more effective strategy isn't it?",
    
    // #16
    "Wow I talk a lot.",
    "Sheeesh",
    "Im exhausted",
    "Lemme sleep for a sec.",
    "CHAROOOOOOOOOOOT",
    "Some pokememes likes something like this. Weird right? I know. But it is what it is. Maybe they are math majors before they become like that, who knows?",
    "Anyways lets start our lecture.",
    "So what the heck is polynomial function?",

    // div; empty scrpts are fillers
    // 24
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",

    // before example 3
    // #34
    "hey Hey HEEY! GET YOUR EYES OPEN! WE'RE NOT DONE YET!",
    "HERE COMES THEEEE-",
    "",
]

const script24 = document.getElementById('script24');
const script25 = document.getElementById('script25');
const script26 = document.getElementById('script26');
const script27 = document.getElementById('script27');
const script28 = document.getElementById('script28');
const script29 = document.getElementById('script29');
const script30 = document.getElementById('script30');
const script31 = document.getElementById('script31');
const script32 = document.getElementById('script32');
const script33 = document.getElementById('script33');
const script36 = document.getElementById('script36');


const scr1 = document.getElementById('scr1');
let clickSpam = false;
document.addEventListener('click', () => {
    if (!clickSpam) {
        nextScript('script');
    }
    console.log(`curr_script: ${curr_script} | scripts.length: ${scripts.length}`);
    // if (curr_script >= scripts.length) {
    //     const queryParams = `?uid=${user_uid}`;
    //     window.location.href = `../html/dashboard.html${queryParams}`;
    // }
});

function nextScript(phase) { 
    if (phase = 'script') {
        switch(curr_script) {
            case 6:
                // battle
                clickSpam = true;
                break; 
            case 13:
                // pic 1
                curr_script += 1;
                scr1.style.display = 'block';
                scr1.textContent = scripts[curr_script];
                break; 
            case 14:
                // pic 2
                curr_script += 1;
                scr1.style.display = 'block';
                scr1.textContent = scripts[curr_script];
                break;  
            case 15:
                // pic 3
                curr_script += 1;
                scr1.style.display = 'block';
                scr1.textContent = scripts[curr_script];
                break; 
            case 24:
                // script # ^^^
                curr_script += 1;
                scr1.style.display = 'none';
                script24.style.display = 'block';
                break; 
            case 25:
                // script # ^^^
                curr_script += 1;
                scr1.style.display = 'none';
                script25.style.display = 'none';
                break; 
            case 26:
                // script # ^^^
                curr_script += 1;
                scr1.style.display = 'none';
                script26.style.display = 'none';
                break; 
            case 27:
                // script # ^^^
                curr_script += 1;
                scr1.style.display = 'none';
                script27.style.display = 'none';
                break; 
            case 28:
                // script # ^^^
                curr_script += 1;
                scr1.style.display = 'none';
                script28.style.display = 'none';
                break; 
            case 29:
                // script # ^^^
                curr_script += 1;
                scr1.style.display = 'none';
                script29.style.display = 'none';
                break; 
            case 30:
                // script # ^^^
                curr_script += 1;
                scr1.style.display = 'none';
                script30.style.display = 'none';
                break; 
            case 31:
                // script # ^^^
                curr_script += 1;
                scr1.style.display = 'none';
                script31.style.display = 'none';
                break; 
            case 32:
                // script # ^^^
                curr_script += 1;
                scr1.style.display = 'none';
                script32.style.display = 'none';
                break; 
            case 33:
                // script # ^^^
                curr_script += 1;
                scr1.style.display = 'none';
                script33.style.display = 'none';
                break; 
            case 36:
                // script # ^^^
                curr_script += 1;
                scr1.style.display = 'none';
                script36.style.display = 'none';
                break; 
                // LAST DIV ATM
            default:
                curr_script += 1;   
                scr1.style.display = 'block';
                scr1.textContent = scripts[curr_script];
                break; 
        }
        
    }
}

