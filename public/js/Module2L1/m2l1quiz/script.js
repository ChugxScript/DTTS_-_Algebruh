const quizData = [
    {
        question: "What is the general rule for determining the number of turning points in a polynomial graph?",
        a: "n+1",
        b: "n-1",
        c: "n",
        d: "2n",
        correct: "b",
    },
    {
        question: "If a polynomial of degree 3 has three distinct real zeros, how many turning points does its graph have?",
        a: "2",
        b: "3",
        c: "4",
        d: "0",
        correct: "a",
    },
    {
        question: "If a polynomial's graph has x-intercepts at -2, 1, and 1 (multiplicity 2), what is its behavior at x = 1?",
        a: "Crosses the x-axis",
        b: "Touches the x-axis",
        c: "Decreases indefinitely",
        d: "Increases indefinitely",
        correct: "b",
    },
    {
        question: "Which statement about polynomial graph behavior near x-intercepts is correct?",
        a: "All polynomial graphs cross the x-axis at each x-intercept.",
        b: "Polynomial graphs with distinct real x-intercepts cross the x-axis.",
        c: "Polynomial graphs with multiplicity 2 x-intercepts touch the x-axis.",
        d: "Polynomial graphs never touch the x-axis.",
        correct: "c",
    },
    {
        question: "What is the end behavior of a polynomial with an odd degree and a positive leading coefficient?",
        a: "Rises left and falls right",
        b: "Falls left and rises right",
        c: "Rises indefinitely on both sides",
        d: "Falls indefinitely on both sides",
        correct: "b",
    },
    {
        question: "If a polynomial of degree 5 has at most 4 turning points, what can be said about its x-intercepts?",
        a: "They are all distinct real numbers.",
        b: "They are all complex numbers.",
        c: "They include repeated roots.",
        d: "They do not exist.",
        correct: "c",
    },
    {
        question: "What is the behavior of a polynomial graph with an even degree and a negative leading coefficient?",
        a: "Falls left and rises right",
        b: "Rises left and falls right",
        c: "Falls indefinitely on both sides",
        d: "Rises indefinitely on both sides",
        correct: "d",
    },
    {
        question: "If a polynomial has a degree of 4 and 3 turning points, what can be inferred about its x-intercepts?",
        a: "They are all distinct real numbers.",
        b: "They include repeated roots.",
        c: "They are all complex numbers.",
        d: "They do not exist.",
        correct: "a",
    },
    {
        question: "What does it mean when a polynomial graph touches the x-axis at an x-intercept?",
        a: "It intersects the x-axis.",
        b: "It is tangent to the x-axis.",
        c: "It never touches the x-axis.",
        d: "It crosses the x-axis twice.",
        correct: "b",
    },
    {
        question: "What is the number of turning points for a polynomial of degree 6 with 5 distinct real zeros?",
        a: "4",
        b: "5",
        c: "6",
        d: "7",
        correct: "a",
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