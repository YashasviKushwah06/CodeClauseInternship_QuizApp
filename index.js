import { question } from './question.js';

const startButton = document.querySelector(".start-btn");
const popupInfo = document.querySelector(".popup-info");
const exitButton = document.querySelector(".exit-btn");
const continueButton = document.querySelector(".continue-btn");
const main = document.querySelector(".container");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const tryAgainBtn = document.querySelector(".tryAgain-btn");
const homeBtn = document.querySelector(".home-btn");

startButton.addEventListener("click", () => {
    popupInfo.classList.add("active");
    main.classList.add("active");
})

exitButton.addEventListener("click", () => {
    popupInfo.classList.remove("active");
    main.classList.remove("active");
})

continueButton.addEventListener("click", () => {
    quizSection.classList.add("active");
    popupInfo.classList.remove("active");
    main.classList.remove("active");
    quizBox.classList.add("active");

    showQuestions(0);
    questionCounter(1);
    headerScore();
})

tryAgainBtn.addEventListener("click", () => {
    quizBox.classList.add("active");
    nextBtn.classList.remove("active");
    resultBox.classList.remove("active");

    questionCount = 0;
    questionNumber = 1;
    userScore = 0;

    showQuestions(questionCount);
    questionCounter(questionNumber);

    headerScore();
})

homeBtn.addEventListener("click", () => {
    quizSection.classList.remove("active");
    nextBtn.classList.remove("active");
    resultBox.classList.remove("active");

    questionCount = 0;
    questionNumber = 1;
    userScore = 0;

    showQuestions(questionCount);
    questionCounter(questionNumber);

    headerScore();
})

let questionCount = 0;
let questionNumber = 1;
let userScore = 0;

const nextBtn = document.querySelector(".next-btn");

nextBtn.onclick = () => {
    if (questionCount < question.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumber++;
        questionCounter(questionNumber);

        nextBtn.classList.remove("active");

    } else {
        showResultBox();
    }
}

const optionList = document.querySelector(".option-list");

function showQuestions(index) {
    const questionText = document.querySelector(".question-text")
    questionText.textContent = `${question[index].number}. ${question[index].question}`;

    let optionTag = `<div class="option">
                            <span>${question[index].options[0]}</span>
                        </div>
                        <div class="option">
                            <span>${question[index].options[1]}</span>
                        </div>
                        <div class="option">
                            <span>${question[index].options[2]}</span>
                        </div>
                        <div class="option">
                            <span>${question[index].options[3]}</span>
                        </div>`;

    optionList.innerHTML = optionTag;

    const options = document.querySelectorAll(".option");
    options.forEach(option => {
        option.addEventListener("click", () => {
            // console.log("Option clicked:", option);
            optionSelected(option);
        });
    });
}

function optionSelected (answer) {
    let userAnswer = answer.textContent.trim();
    let correctAnswer = question[questionCount].answer.trim();
    let allOptions = optionList.children.length;

    if (userAnswer === correctAnswer) {
        answer.classList.add("correct");
        userScore++;
        headerScore();
    } else {
        answer.classList.add("incorrect");

        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent.trim() == correctAnswer) {
                (optionList.children[i].classList.add("correct"));
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
    }

    nextBtn.classList.add("active");
}

function questionCounter (index) {
    const questionTotal = document.querySelector(".question-total");
    questionTotal.textContent = `${index} of ${question.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector(".header-score");
    headerScoreText.textContent = `Score: ${userScore} / ${question.length}`;
}

function showResultBox() {
    quizBox.classList.remove("active");
    resultBox.classList.add("active");

    const scoreText = document.querySelector(".score-text")
    scoreText.textContent = `Your score ${userScore} out of ${question.length}`;

    const circularProgress = document.querySelector(".circular-progress");
    const progressValue = document.querySelector(".progress-value");
    let progressStartValue = 0;
    let progressEndValue = ((userScore / question.length) * 100)
    let speed = 25;

    let progress = setInterval(() => {
        progressStartValue++;

        progressValue.textContent = `${progressStartValue}%`;
        let angle = (progressStartValue * 3.6) % 360;
        circularProgress.style.background = `conic-gradient(orange ${angle}deg, rgba(146, 146, 146, 0.1) ${angle}deg)`;
        
        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}