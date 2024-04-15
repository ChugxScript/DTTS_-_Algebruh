let curr_script = 0;

let scripts = [
    "", // script 1
    "", // script 2
    "", // script 3
    "", // script 4
    "", // title
    "./M1L3-img/6.png",
    "./M1L3-img/7.png",
    "./M1L3-img/8.png",
    "./M1L3-img/9.png",
    "./M1L3-img/10.png",
    "./M1L3-img/11.png",
    "./M1L3-img/12.png",
    "./M1L3-img/13.png",
    "./M1L3-img/14.png",
    "./M1L3-img/15.png",
    "./M1L3-img/16.png",
    "./M1L3-img/17.png",
    "./M1L3-img/18.png",
    "./M1L3-img/19.png",
    "./M1L3-img/20.png",
    "./M1L3-img/21.png",
    "./M1L3-img/22.png",
    "./M1L3-img/23.png",
    "./M1L3-img/24.png",
    "./M1L3-img/25.png",
    "./M1L3-img/26.png",
    "./M1L3-img/27.png",
    "./M1L3-img/28.png",
    "./M1L3-img/29.png",
    "./M1L3-img/30.png",
    "./M1L3-img/31.png",
    "./M1L3-img/32.png",
    "./M1L3-img/33.png",
    "./M1L3-img/34.png",
    "./M1L3-img/35.png",
    "./M1L3-img/36.png",
    "./M1L3-img/37.png",
    "./M1L3-img/38.png",
    "./M1L3-img/39.png",
    "./M1L3-img/40.png",
    "./M1L3-img/41.png",
    "./M1L3-img/42.png",
    "./M1L3-img/43.png",
    "./M1L3-img/44.png",
    "./M1L3-img/45.png",
]


const gigaGuide = document.getElementById("gigaGuide");
const script0 = document.getElementById('script0');
const script1 = document.getElementById('script1');
const script2 = document.getElementById('script2');
const script3 = document.getElementById('script3');
const script4 = document.getElementById('script4');

const title = document.getElementById("title");
const script5 = document.getElementById('script5'); // title
const clickToContinue = document.getElementById('clickToContinue');

const script6 = document.getElementById('script6');
const img_script = document.getElementById('img_script');
const LR_container = document.getElementById('LR_container');

const left_btn = document.getElementById('left_btn');
const right_btn = document.getElementById('right_btn');

const prompt1 = document.getElementById('prompt1');
const prompt2 = document.getElementById('prompt2');
const notYetBTN = document.getElementById('notYetBTN');
const checkLessonBTN = document.getElementById('checkLessonBTN');


script1.style.display = 'none';
script2.style.display = 'none';
script3.style.display = 'none';
script4.style.display = 'none';
document.addEventListener('click', () => {
    if (curr_script <= 5) {
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
                    script1.style.display = 'none';
                    script2.style.display = 'block';
                    script2.style.textAlign = 'center';
                    curr_script += 1;
                    break;
                case 2:
                    script2.style.display = 'none';
                    script3.style.display = 'block';
                    script3.style.textAlign = 'center';
                    script3.style.fontSize = '20px';
                    curr_script += 1;
                    break;
                case 3:
                    script3.style.display = 'none';
                    script4.style.display = 'block';
                    script4.style.textAlign = 'center';
                    script4.style.fontSize = '50px';
                    curr_script += 1;
                    break;
                case 4:
                    gigaGuide.style.display = 'none';
                    script0.style.display = 'none';
                    title.style.display = 'block';
                    script5.style.display = 'block';
                    curr_script += 1;
                    break;
                case 5: 
                    title.style.display = 'none';
                    script4.style.display = 'none';
                    clickToContinue.style.display = 'none';

                    gigaGuide.style.display = 'block';
                    script6.style.display = 'block';
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
                script6.style.display = 'none';
                prompt1.style.display = 'block';
            } else {
                curr_script += 1;
                img_script.src = scripts[curr_script];
            }
            break;

        case 2:
            if (curr_script === (scripts.length - 1)) {
                script6.style.display = 'block';
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
    curr_script = 5;
})

// gigaGuide.style.display = 'none';