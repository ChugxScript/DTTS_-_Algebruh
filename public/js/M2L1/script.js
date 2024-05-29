let curr_script = 0;

let scripts = [
    "", // script 1
    "", // title
    "./M2L1-img/36.png",
    "./M2L1-img/37.png",
    "./M2L1-img/38.png",
    "./M2L1-img/39.png",
    "./M2L1-img/40.png",
    "./M2L1-img/41.png",
    "./M2L1-img/42.png",
    "./M2L1-img/43.png",
    "./M2L1-img/44.png",
    "./M2L1-img/45.png",
    "./M2L1-img/46.png",
    "./M2L1-img/47.png",
    "./M2L1-img/48.png",
    "./M2L1-img/49.png",
    "./M2L1-img/50.png",
    "./M2L1-img/51.png",
    "./M2L1-img/52.png",
    "./M2L1-img/53.png",
    "./M2L1-img/54.png",
    "./M2L1-img/55.png",
    "./M2L1-img/56.png",
    "./M2L1-img/57.png",
    "./M2L1-img/58.png",
    "./M2L1-img/59.png",
    "./M2L1-img/60.png",
    "./M2L1-img/61.png",
    "./M2L1-img/62.png",
    "./M2L1-img/63.png",
]


const gigaGuide = document.getElementById("gigaGuide");
const script0 = document.getElementById('script0');
const script1 = document.getElementById('script1');

const title = document.getElementById("title");
const script2 = document.getElementById('script2'); // title
const clickToContinue = document.getElementById('clickToContinue');

const script3 = document.getElementById('script3');
const img_script = document.getElementById('img_script');
const LR_container = document.getElementById('LR_container');

const left_btn = document.getElementById('left_btn');
const right_btn = document.getElementById('right_btn');

const prompt1 = document.getElementById('prompt1');
const prompt2 = document.getElementById('prompt2');
const notYetBTN = document.getElementById('notYetBTN');
const checkLessonBTN = document.getElementById('checkLessonBTN');


script1.style.display = 'none';
document.addEventListener('click', () => {
    if (curr_script <= 2) {
        nextScript(0);
        console.log(`curr_script: ${curr_script} | scripts.length: ${scripts.length}`);
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
                    curr_script += 1;
                    break;
                case 1:
                    gigaGuide.style.display = 'none';
                    script0.style.display = 'none';
                    title.style.display = 'block';
                    script2.style.display = 'block';
                    curr_script += 1;
                    break;
                case 2: 
                    title.style.display = 'none';
                    script1.style.display = 'none';
                    clickToContinue.style.display = 'none';

                    gigaGuide.style.display = 'block';
                    script3.style.display = 'block';
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
                script3.style.display = 'none';
                prompt1.style.display = 'block';
            } else {
                curr_script += 1;
                img_script.src = scripts[curr_script];
            }
            break;

        case 2:
            if (curr_script === (scripts.length - 1)) {
                script3.style.display = 'block';
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
    curr_script = 2;
})

// gigaGuide.style.display = 'none';