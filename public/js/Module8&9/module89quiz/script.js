const quizData = [
    {
        question: "Which from the given equations represents the standard form of an equation of a circle with center at the origin?",
        a: "a² + b² = c²",
        b: "x² + y² = r²",
        c: "(x-0)² +(y-3)² = 25",
        d: "(x+3)² + (y-0)² = 9",
        correct: "b",
    },
    {
        question: "What is the equation of a circle with radius 4 units and centered at the origin? ? ",
        a: "x² + y² = r²",
        b: "x² - y² = 42",
        c: "x² + y² = 4",
        d: "x² + y² = 16",
        correct: "d",
    },
    {
        question: "The equation of a circle passing through the point (3, -4) with center at the origin is _____.? ",
        a: "x² + y² = 32",
        b: "x² + y² = 42",
        c: "x² + y² = 16",
        d: "x² + y² = 25",
        correct: "d",
    },
    {
        question: "How long is the radius of the circle in question #3?",
        a: "5 units",
        b: "4 units",
        c: "3 units",
        d: "0 units",
        correct: "a",
    },
    {
        question: "If the equation of circle O is (x + 3)² + (y - 5)² = 16, what is its center and radius?",
        a: "C(3, 5) , r=4",
        b: "C(-3, -5) , r=4",
        c: "C(-3, 5) , r=4",
        d: "C(3, -5) , r=4",
        correct: "c",
    },
    {
        question: "What is the standard form of an equation of a circle with center C(2,-3) and a radius of 6?",
        a: "(x+2)² + (y-3)² = 6",
        b: "(x-2)² + (y+3)² = 36",
        c: "(x-2)² + (y+3)² = 6",
        d: "(x-2)² + (y-3)² = 36",
        correct: "b",
    },
    {
        question: "The equation x² + y² + 12x - 8y + 27 = 0 is equivalent to: ",
        a: "(x-6)² + (y-4)² = 25",
        b: "(x+6)² + (y+4)² = 27",
        c: "(x+6)² + (y-4)² = 25",
        d: "(x-6)² + (y-4)² = 27",
        correct: "c",
    },
    {
        question: "What is the general equation of a circle that is tangent to an x-axis, and its center located at point (-4,6)?",
        a: "x² - 8x + y² + 12y +16 = 0",
        b: "x² + 8x + y² - 12y +16 = 0",
        c: "x² - 8x + y² + 12y -16 = 0",
        d: "x² - 8x + y² + 12y -16 = 0",
        correct: "b",
    },
    {
        question: "Which of the following points lie on the circle in which the center is the origin and contains the point (0,3)?",
        a: "(1, 4)",
        b: "(-2, 3)",
        c: "(4, 0) ",
        d: "(1, 2√2) ",
        correct: "d",
    },
    {
        question: "On a grid map of a province, the coordinates that correspond to the location of a cellular phone tower is (2,-8) and it can transmit signals up to a 12 km-radius. What is the equation that represents the transmission boundaries of the tower?",
        a: "x² + y² - 4x + 16y - 76 = 0",
        b: "x² + y² + 4x - 16y - 76 = 0",
        c: "x² + y² - 4x - 16y - 76 = 0",
        d: "x² + y² - 4x - 16y - 76 = 0",
        correct: "a",
    },
    {
        question: "Transform (x-3)² + (y+5)² = 64 into general form",
        a: "x² + y² - 6x + 10y - 30 = 0",
        b: "x² + y² + 6x - 10y + 30 = 0",
        c: "x² + y² - 6x - 10y - 34 = 0",
        d: "x² + y² - 6x + 10y + 34 = 0",
        correct: "a",
    },
    {
        question: "The center of the equation of a circle of the form x² + y² - 8y - 9 =0 ",
        a: "(4, 2)",
        b: "(4, 0)",
        c: "(0, 4)",
        d: "(0, -4)",
        correct: "c",
    },
    {
        question: "The radius in the equation of a circle in #2 is ___",
        a: "2",
        b: "3",
        c: "4",
        d: "5",
        correct: "d",
    },
    {
        question: "What is the standard form of the equation of a circle x²+y²-10x-14y+38=0?",
        a: "(x-5)² + (y+7)² = 36",
        b: "(x+5)² + (y+7)² = 36",
        c: "(x-5)² + (y-7)² = 36",
        d: "(x-5)² + (y-7)² = 36",
        correct: "a",
    },
    {
        question: "Which of the following equations describe a circle?",
        a: "x²+y²+2x-8y+26=0",
        b: "x²+y²+9=10x-14y",
        c: "x²-y²-6x-8y-32",
        d: "x²+y²+8x-14y+65",
        correct: "a",
    },
    {
        question: "Which of the following equations represent a circle?",
        a: "x+y=5",
        b: "x²+y²=25",
        c: "2x-3y=10",
        d: "y=2x+3",
        correct: "b",
    },
    {
        question: "What is the radius of the circle defined by the equation x^2 + y^2 = 25?",
        a: "3",
        b: "4",
        c: "5",
        d: "6",
        correct: "c",
    },
    {
        question: "Which of these equations are a circle?",
        a: "x²+y²=16",
        b: "y=2x+7",
        c: "3x+4y=8",
        d: "x²-4x+y²+6y=0",
        correct: "a",
    },
    {
        question: "What is the radius of the circle represented by the equation x²+y²-6x+4y+9=0?",
        a: "2",
        b: "3",
        c: "4",
        d: "5",
        correct: "a",
    },
    {
        question: "In the equation of a circle (x-h)²+(y-k)^2=r^2, what is the center of the circle?",
        a: "(h, k)",
        b: "(-h, -k)",
        c: "(r, r)",
        d: "(-r, -r)",
        correct: "a",
    },
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

const numberOfQuestion = document.getElementById("numberOfQuestion");
const numberOfAllQuestion = document.getElementById("numberOfAllQuestion");

let indexOfPage = 0;
let currentQuiz = 0;
let score = 0;
let time = 240;
const countDownEl = document.getElementById("countdown");

let counter = setInterval(updateCountdown, 1000);

function updateCountdown() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    countDownEl.innerHTML = `${minutes}:${seconds}`;

    time--;

    if (minutes <= 0 && seconds == 0) {
        const timeText = document.querySelector(".timer_text");
        timeText.textContent = "Time is over";
        Swal.fire({
            icon: 'error',
            title: 'Oops...time is up!',
            text: 'But you can restart the quiz',
            showConfirmButton: false,
            footer: '<a href="start.html" style="background-color:#44b927; padding: 1rem; text-decoration: none; color: white;">Restart the Quiz</a>'
        });
        clearInterval(counter);
    }
}

loadQuiz();

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

    numberOfQuestion.innerHTML = currentQuiz + 1;
    numberOfAllQuestion.innerHTML = quizData.length;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
            document.querySelector('.slime-image').classList.add('correct-answer');
            setTimeout(() => {
                document.querySelector('.slime-image').classList.remove('correct-answer');
            }, 500); // Remove the class after 0.5 seconds
        } else {
            document.querySelector('.user-image').classList.add('wrong-answer');
            setTimeout(() => {
                document.querySelector('.user-image').classList.remove('wrong-answer');
            }, 500); // Remove the class after 0.5 seconds
        }

        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `
            <div class="end_quiz">
                <h3 class="end-title">You answered ${score}/${quizData.length} questions correctly, young wizard.</h3>
                <button onclick="location.reload()" class="reload">Try again</button>
            </div>
            `;
        }
    }
});
