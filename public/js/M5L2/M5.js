let curr_script = 0;

let scripts = [
  "", // script 1
  "", // title
  "./m5-img/35.png",
  "./m5-img/36.png",
  "./m5-img/37.png",
  "./m5-img/38.png",
  "./m5-img/39.png",
  "./m5-img/40.png",
  "./m5-img/41.png",
  "./m5-img/42.png",
  "./m5-img/43.png",
  "./m5-img/44.png",
  "./m5-img/45.png",
  "./m5-img/46.png",
  "./m5-img/47.png"
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