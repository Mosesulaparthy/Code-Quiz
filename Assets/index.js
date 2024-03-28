var questions = [
    {
        question: "What is the Capital of the United States?",
        answers: ["Ney York City", "Washington D.C.", "Los Angeles", "San Antonio"],
        correctAnswer: "Washington D.C."
    },
    {
        question: "What team won the 2022 World Cup?",
        answers: ["Germany", "Brazil", "Argentina", "England"],
        correctAnswer: "Argentina"
    },
    {
        question: "How many states are in the United States of America?",
        answers: ["35", "40", "55", "50"],
        correctAnswer: "50"
    },
    {
        question: "What is the name of the planet that is closest to the Sun?",
        answers: ["Mercury", "Venus", "Saturn", "Neptune"],
        correctAnswer: "Mercury"
    },
    {
        question: "What team won the Superbowl in 2023?",
        answers: ["Chiefs", "Raiders", "Giants", "Eagles"],
        correctAnswer: "Chiefs"
    },
    {
        question: "What is the largest bone in the human body?",
        answers: ["Pelvis", "Femur", "Jawbone", "Ribs"],
        correctAnswer: "Femur"
    },
    {
        question: "What is the name of the Largest ocean in the world?",
        answers: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        correctAnswer: "Pacific Ocean"
    },
];


var score = 0;
var timer;
var currentQuestionIndex = 0
function startQuiz() {
    document.getElementById("timer").style.display = "block";
    timeLeft = 70;
    currentQuestionIndex = 0;

    var answerButtons = document.querySelectorAll(".answer");
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].removeEventListener("click", checkAnswer);

        answerButtons[i].style.display = "block";

    }
    timer = setInterval(function () {
        timeLeft--;
        document.getElementById("timer").textContent = "Time: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
    getQuestion();
}

function getQuestion() {
    if (currentQuestionIndex > questions.length) {
        endQuiz();
        return;
    }
    var currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;
    document.getElementById("answer1").textContent = currentQuestion.answers[0];
    document.getElementById("answer2").textContent = currentQuestion.answers[1];
    document.getElementById("answer3").textContent = currentQuestion.answers[2];
    document.getElementById("answer4").textContent = currentQuestion.answers[3];

    document.getElementById("answer1").addEventListener("click", checkAnswer);
    document.getElementById("answer2").addEventListener("click", checkAnswer);
    document.getElementById("answer3").addEventListener("click", checkAnswer);
    document.getElementById("answer4").addEventListener("click", checkAnswer);
}

function checkAnswer(event) {
    var selectedAnswer = event.target.textContent;
    if (currentQuestionIndex < questions.length) {
        var correctAnswer = questions[currentQuestionIndex].correctAnswer;
        if (selectedAnswer === correctAnswer) {
            score++;
        } else {
            timeLeft -= 10;
        }
    }
    currentQuestionIndex++;
    getQuestion();
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById("score").textContent = "Final Score: " + timeLeft;
    document.getElementById("timer").style.display = "none";

    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    var newScore = { score: timeLeft, };
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);

    var initials = prompt("Enter you initials: ");
    if (initials !== null) {
        newScore.initials = initials;
    }
    highScores.sort((a, b) => b.score - a.score);
    document.getElementById("highScores").innerHtML = "<h3>High Scores:</h3>"
    for (let i = 0; i < highScores.length; i++) {
        document.getElementById("highScores").innerHTML += "<p>" + (i + 1) + "." + highScores[i].initials + " - " + highScores[i].score + "</p>";
    }

    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function clearHighScores() {
    localStorage.removeItem("highScores");
    document.getElementById("highScores").innerHTML = "";
}

document.getElementById("clearScores").addEventListener("click", clearHighScores);

document.getElementById("startButton").addEventListener("click", startQuiz);