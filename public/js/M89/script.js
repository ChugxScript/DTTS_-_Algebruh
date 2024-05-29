let curr_script = 0;

let scripts = [
    "", // script 1
    "", // title
    "./M89-img/81.png",
    "./M89-img/82.png",
    "./M89-img/83.png",
    "./M89-img/84.png",
    "./M89-img/85.png",
    "./M89-img/86.png",
    "./M89-img/87.png",
    "./M89-img/88.png",
    "./M89-img/89.png",
    "./M89-img/90.png",
    "./M89-img/91.png",
    "./M89-img/92.png",
    "./M89-img/93.png",
    "./M89-img/94.png",
    "./M89-img/95.png",
    "./M89-img/96.png",
    "./M89-img/97.png",
    "./M89-img/98.png",
    "./M89-img/99.png",
    "./M89-img/100.png",
    "./M89-img/101.png",
    "./M89-img/102.png",
    "./M89-img/103.png",
    "./M89-img/104.png",
    "./M89-img/105.png",
    "./M89-img/106.png",
    "./M89-img/107.png",
    "./M89-img/108.png",
    "./M89-img/109.png",
    "./M89-img/110.png",
    "./M89-img/111.png",
    "./M89-img/112.png",
    "./M89-img/113.png",
    "./M89-img/114.png",
    "./M89-img/115.png",
    "./M89-img/116.png",
    "./M89-img/117.png",
    "./M89-img/118.png",
    "./M89-img/119.png",
    "./M89-img/120.png",
    "./M89-img/121.png",
    "./M89-img/122.png",
    "./M89-img/123.png",
    "./M89-img/124.png",
    "./M89-img/125.png",
    "./M89-img/126.png",
    "./M89-img/127.png",
    "./M89-img/128.png",
    "./M89-img/129.png",
    "./M89-img/130.png",
    "./M89-img/131.png",
    "./M89-img/132.png",
    "./M89-img/133.png",
    "./M89-img/134.png",
    "./M89-img/135.png",
    "./M89-img/136.png",
    "./M89-img/137.png",
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