const quizData = [
    {
        question: "If a polynomial function is given by f(x)=2x^3-5x^2+3x+1, what is the degree of the polynomial?",
        a: "1",
        b: "2",
        c: "3",
        d: "4",
        correct: "c",
    },
    {
        question: "Consider the polynomial function g(x)=x^4-2x^3+5x^2-x+7. What is the leading coefficient of this polynomial?",
        a: "1",
        b: "-1",
        c: "7",
        d: "-7",
        correct: "a",
    },
    {
        question: "What is the daily expense function C(x) for Mark's online business, where he spends P100 for fuel and P20 for each item he prepares?",
        a: "C(x)=20x+100",
        b: "C(x)=100x+20",
        c: "C(x)=20x-100",
        d: "C(x)=100+20x",
        correct: "a",
    },
    {
        question: "What are Mark's expenses if he prepares 150 items in a day using the daily expense function C(x)=20x+100?",
        a: "₱3,000",
        b: "₱3,100",
        c: "₱3,200",
        d: "₱3,300",
        correct: "b",
    },
    {
        question: "What is the degree of the polynomial function f(x)=3x^4-2x^3+5x^2-x+7?",
        a: "2",
        b: "3",
        c: "4",
        d: "5",
        correct: "c",
    },
    {
        question: "What is the constant term in the polynomial function g(x)=4x^3+2x^2-3x+10?",
        a: "10",
        b: "-3",
        c: "4",
        d: "2",
        correct: "a",
    },
    {
        question: "What is the constant term in the polynomial function t(x)=2x^3+5x^2-4x+8?",
        a: "2",
        b: "5",
        c: "-4",
        d: "8",
        correct: "d",
    },
    {
        question: "Word Problem: Jack is planting trees in his garden. He starts with 5 trees and plants an additional 3 trees each month. The total number of trees, T, can be represented by the polynomial function T(x)=3x+5, where x is the number of months. If Jack plants trees for 6 months, what is the total number of trees in his garden?",
        a: "23 trees",
        b: "25 trees",
        c: "28 trees",
        d: "30 trees",
        correct: "a",
    },
    {
        question: "Word Problem: A company's profit in thousands of pesos per month is represented by the polynomial function P(x)=-x^2+5x+10, where x is the number of products sold. How many products must be sold to maximize the company's profit?",
        a: "2 products",
        b: "3 products",
        c: "4 products",
        d: "5 products",
        correct: "c",
    },
    {
        question: "Word Problem: The height of a rocket launched from the ground is given by the polynomial function H(t)=-5t^2 + 40t + 100 H(t)=-5t^2 +40t+100 meters, where t is the time in seconds since launch. At what time does the rocket reach its maximum height?",
        a: "t = 2t=2 seconds ",
        b: "t = 4t=4 seconds ",
        c: "t = 6t=6 seconds ",
        d: "t = 8t=8 seconds ",
        correct: "c",
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