const quizData = [
    {
        question: "What is the definition of a circle?",
        a: "A straight line connecting two points on the circle",
        b: "The set of all points equidistant from a given point",
        c: "An angle whose vertex is the center of the circle",
        d: "A segment whose endpoints are on a circle",
        correct: "b",
    },
    {
        question: "Which of the following statements about chords is true?",
        a: "A chord always passes directly through the center of the circle",
        b: "Every chord defines an arc whose measure is less than 90 degrees",
        c: "A diameter is a chord that includes the center of the circle",
        d: "Chords can only connect points on the circumference of a circle",
        correct: "c",
    },
    {
        question: "What is the measure of a semicircle?",
        a: "90 degrees",
        b: "180 degrees",
        c: "270 degrees",
        d: "360 degrees",
        correct: "b",
    },
    {
        question: "What is an inscribed angle?",
        a: "An angle whose vertex is the center of the circle",
        b: "An angle whose rays are chords of the circle",
        c: "An angle that intercepts the circle at two points",
        d: "An angle formed by two radii of the circle",
        correct: "b",
    },
    {
        question: "How are central angles and the arcs they define related?",
        a: "Their measures are always equal",
        b: "Their measures are always different",
        c: "Their measures are related by a factor of 2",
        d: "They have no relationship",
        correct: "a",
    },
    {
        question: "Set of all points equidistant from a point called center?",
        a: "Arc",
        b: "Circle",
        c: "Angle",
        d: "Ray",
        correct: "b",
    },
    {
        question: "An arc whose measure is (0° < v < 180°)?",
        a: "Minor Arc",
        b: "Angle",
        c: "Major Arc",
        d: "Semi-circle",
        correct: "a",
    },
    {
        question: "Which of the following measures is NOT a minor arc?",
        a: "2000",
        b: "1200",
        c: "900",
        d: "1500",
        correct: "a",
    },
    {
        question: "Which of the following measures is NOT a major arc?",
        a: "2350",
        b: "2750",
        c: "1800",
        d: "3000",
        correct: "c",
    },
    {
        question: "What kind of arc is formed by the measure of 1800?",
        a: "Minor Arc",
        b: "Chord",
        c: "Major Arc",
        d: "Semi-circle",
        correct: "d",
    },

];

const quiz= document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')

const numberOfQuestion = document.getElementById("numberOfQuestion");
const numberOfAllQuestion = document.getElementById("numberOfAllQuestion");

let indexOfQuestion;
let indexOfPage = 0;

numberOfAllQuestion.innerHTML = quizData.length;

let currentQuiz = 0
let score = 0

let time = 120;
    const countDownEl = document.getElementById("countdown");   
    
    let counter = setInterval(updateCountdown, 1000);
    
    function updateCountdown(){
    
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
    
        seconds = seconds < 10 ? "0" + seconds: seconds;
    
        minutes = minutes < 10 ? "0" + minutes: minutes;
    
        countDownEl.innerHTML = `${minutes}:${seconds}`;
    
        time--;
    
        
    
        if(minutes <= 0 && seconds == 0) {
            const timeText = document.querySelector(".timer_text");
            timeText.textContent = "Time is over";
            //alert("Quiz over");
            Swal.fire({
                icon: 'error',
                title: 'Oops...time is up!',
                text: 'But you can restart the quiz',
                showConfirmButton: false,
                footer: '<a href="start.html" style="background-color:#44b927; padding: 1rem; text-decoration: none; color: white;">Restart the Quiz</a>'
              })
            clearInterval(counter);
        }
    
        
    }

loadQuiz()

function loadQuiz() {

    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++; 

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
       if(answer === quizData[currentQuiz].correct) {
           score++
       }

       currentQuiz++

       if(currentQuiz < quizData.length) {
           loadQuiz()
       } else {

        quiz.innerHTML = `

       <div class="end_quiz">
        <h3 class="end-title">You answered ${score}/${quizData.length} questions correctly</h3>
        <button onclick="location.reload()" class="reload">Reload</button></div>
         `
       }
    }
})

}