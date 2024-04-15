let curr_script = 0;

let scripts = [
    "./M1L1-img/1.png",
    "./M1L1-img/2.png",
    "./M1L1-img/3.png",
    "./M1L1-img/4.png",
    "./M1L1-img/5.png",
    "./M1L1-img/6.png",
    "./M1L1-img/7.png",
    "", // battle test
    "./M1L1-img/9.png",
    "", // title
    "./M1L1-img/11.png",
    "./M1L1-img/12.png",
    "./M1L1-img/13.png",
    "./M1L1-img/14.png",
    "./M1L1-img/15.png",
    "./M1L1-img/16.png",
    "./M1L1-img/17.png",
    "./M1L1-img/18.png",
    "./M1L1-img/19.png",
    "./M1L1-img/20.png",
    "./M1L1-img/21.png",
    "./M1L1-img/22.png",
    "./M1L1-img/23.png",
    "./M1L1-img/24.png",
    "./M1L1-img/25.png",
    "./M1L1-img/26.png",
    "./M1L1-img/27.png",
    "./M1L1-img/28.png",
    "./M1L1-img/29.png",
    "./M1L1-img/30.png",
    "./M1L1-img/31.png",
    "./M1L1-img/32.png",
    "./M1L1-img/33.png",
    "./M1L1-img/34.png",
    "./M1L1-img/35.png",
    "./M1L1-img/36.png",
    "./M1L1-img/37.png",
    "./M1L1-img/38.png",
    "./M1L1-img/39.png",
    "./M1L1-img/40.png",
    "./M1L1-img/41.png",
    "./M1L1-img/42.png",
    "./M1L1-img/43.png",
    "./M1L1-img/44.png",
    "./M1L1-img/45.png",
    "./M1L1-img/46.png",
    "./M1L1-img/47.png",
]


const gigaGuide = document.getElementById("gigaGuide");
const script0 = document.getElementById('script0');
const script1 = document.getElementById('script1');
const img_script = document.getElementById('img_script');

const title = document.getElementById("title");
const script2 = document.getElementById('script2'); // title
const clickToContinue = document.getElementById('clickToContinue');

const LR_container = document.getElementById('LR_container');
const left_btn = document.getElementById('left_btn');
const right_btn = document.getElementById('right_btn');

const prompt1 = document.getElementById('prompt1');
const prompt2 = document.getElementById('prompt2');
const notYetBTN = document.getElementById('notYetBTN');
const checkLessonBTN = document.getElementById('checkLessonBTN');


script1.style.display = 'none';
let clickSPAM = false;
document.addEventListener('click', () => {
    if (curr_script <= 10) {
        if (!clickSPAM) {
            nextScript(0);
            console.log(`curr_script: ${curr_script} | scripts.length: ${scripts.length}`);
        }
    } 
});

right_btn.addEventListener('click', () => {
    nextScript(1);
    console.log(`curr_script: ${curr_script} | scripts.length: ${scripts.length}`);
})

left_btn.addEventListener('click', () => {
    nextScript(2);
    console.log(`curr_script: ${curr_script} | scripts.length: ${scripts.length}`);
})

function nextScript(phase) { 
    switch(phase) {
        case 0:
            switch(curr_script) {
                case 0:
                    script0.style.display = 'none';
                    script1.style.display = 'block';
                    img_script.src = scripts[curr_script];
                    curr_script += 1;
                    break;
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    img_script.src = scripts[curr_script];
                    curr_script += 1;
                    break;
                case 7:
                    clickSPAM = true;
                    break;
                case 8:
                    img_script.src = scripts[curr_script];
                    curr_script += 1;
                    clickSPAM = false;
                    break;
                case 9:
                    gigaGuide.style.display = 'none';
                    script0.style.display = 'none';
                    title.style.display = 'block';
                    script2.style.display = 'block';
                    curr_script += 1;
                    break;
                case 10: 
                    title.style.display = 'none';
                    clickToContinue.style.display = 'none';

                    gigaGuide.style.display = 'block';
                    script1.style.display = 'block';
                    LR_container.style.display = 'flex';

                    img_script.src = scripts[curr_script];
                    break;
                default:
                    console.log(`invalid curr_script: ${curr_script}`);
                    break;
            }
            break;


        case 1:
            if (curr_script === (scripts.length - 1)) {
                script1.style.display = 'none';
                prompt1.style.display = 'block';
            } else {
                curr_script += 1;
                img_script.src = scripts[curr_script];
            }
            break;

        case 2:
            if (curr_script === (scripts.length - 1)) {
                script1.style.display = 'block';
                prompt1.style.display = 'none';
                curr_script -= 1;
            } else {
                curr_script -= 1;
                img_script.src = scripts[curr_script];
            }
            break;

        default:
            console.log(`invalid phase: ${phase}`);
            break;
    }
}

notYetBTN.addEventListener('click', () => {
    prompt1.style.display = 'none';
    prompt2.style.display = 'block';
})

checkLessonBTN.addEventListener('click', () => {
    prompt2.style.display = 'none';
    curr_script = 10;
})

// gigaGuide.style.display = 'none';