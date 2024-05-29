const quizData = [
    {
        question: "What is an inscribed angle?",
        a: "An angle formed by two secant lines intersecting outside a circle.",
        b: "An angle formed by two intersecting chords inside a circle.",
        c: "An angle formed by two secant lines intersecting on a circle.",
        d: "An angle formed by two tangent lines intersecting on a circle.",
        correct: "c",
    },
    {
        question: "Which of the following statements is true about an inscribed angle and its intercepted arc?",
        a: "The inscribed angle is always equal to the intercepted arc.",
        b: "The inscribed angle is half the measure of the intercepted arc.",
        c: "The inscribed angle is double the measure of the intercepted arc.",
        d: "The inscribed angle has no relationship with the intercepted arc.",
        correct: "b",
    },
    {
        question: "If an inscribed angle measures 60 degrees, what is the measure of its intercepted arc in degrees?",
        a: "30 degrees",
        b: "60 degrees",
        c: "120 degrees",
        d: "240 degrees",
        correct: "a",
    },
    {
        question: "In a circle, if two inscribed angles intercept the same arc, what can be said about their measures?",
        a: "They are equal",
        b: "They are complementary.",
        c: "One is double the other.",
        d: "One is half the other.",
        correct: "d",
    },
    {
        question: "What type of lines form an inscribed angle?",
        a: "Two tangent lines.",
        b: "tangent line and a secant line.",
        c: "Two secant lines.",
        d: "A chord and a tangent line.",
        correct: "c",
    },
    {
        question: "If a central angle measures 120 degrees, what is the measure of the inscribed angle subtended by the same arc?",
        a: "30 degrees",
        b: "60 degrees",
        c: "120 degrees",
        d: "240 degrees",
        correct: "b",
    },
    {
        question: "Which of the following statements is true about the measure of an inscribed angle and its intercepted arc?",
        a: "The measure of the inscribed angle is always greater than the measure of the arc.",
        b: "The measure of the inscribed angle is always less than the measure of the arc.",
        c: "The measure of the inscribed angle can be greater or less than the measure of the arc.",
        d: "The measure of the inscribed angle is always equal to the measure of the arc.",
        correct: "c",
    },
    {
        question: "In a circle, if an inscribed angle measures 90 degrees, what is the measure of its intercepted arc in degrees?",
        a: "90 degrees",
        b: "180 degrees",
        c: "270 degrees",
        d: "360 degrees",
        correct: "b",
    },
    {
        question: "What is the relationship between an inscribed angle and a central angle if they intercept the same arc?",
        a: "The inscribed angle is twice the measure of the central angle.",
        b: "The inscribed angle is half the measure of the central angle.",
        c: "The inscribed angle is equal to the measure of the central angle.",
        d: "The inscribed angle has no relationship with the central angle.",
        correct: "b",
    },
    {
        question: "If the measure of an inscribed angle is 45 degrees, what is the measure of its intercepted arc in degrees?",
        a: "45 degrees",
        b: "90 degrees",
        c: "180 degrees",
        d: "360 degrees",
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