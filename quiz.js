const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Transfer Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS",
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    options: ["<js>", "<script>", "<scripting>", "<javascript>"],
    answer: "<script>",
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Netscape", "Bell Labs", "Sun Microsystems", "IBM"],
    answer: "Netscape",
  },
  {
    question: "Which of the following is not a JavaScript data type?",
    options: ["Undefined", "Number", "Boolean", "Float"],
    answer: "Float",
  },
];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");
const timerEl = document.querySelector(".timer");

let questionNum = 0;
let scorePoint = 0;
let timeLeft = 10;
let timer;

function setTimer() {
  nextBtn.disabled = true;
  clearInterval(timer);
  timeLeft = 10;
  timerEl.innerText = `Time Left: ${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = `Time Left: ${timeLeft}`;
    if (timeLeft === 0) {
      clearInterval(timer);
      Array.from(optionsEl.children).forEach((element) => {
        element.disabled = true;
      });
      nextBtn.disabled = false;
      scoreEl.innerText = `Time's up!!! Score: ${scorePoint}`;
    }
  }, 1000);
}
function loadQuestion() {
  setTimer();
  const currentQuestion = quizData[questionNum];
  questionEl.innerText = currentQuestion.question;
  optionsEl.innerText = "";
  currentQuestion.options.forEach((opt) => {
    const button = document.createElement(`button`);
    button.innerText = opt;
    button.className =
      "border border-2 font-bold w-[300px] p-[10px] hover:bg-[#2563eb] hover:text-white transition-all duration-[0.3s]";
    optionsEl.appendChild(button);
    button.addEventListener("click", () => {
      clearInterval(timer);
      nextBtn.disabled = false;
      Array.from(optionsEl.children).forEach((btn) => {
        btn.disabled = true;
        btn.classList.remove("hover:bg-[#2563eb]");
        btn.classList.remove("hover:text-white");
      });
      if (button.innerText === currentQuestion.answer) {
        scorePoint++;
        button.classList.add("bg-green-500");

        scoreEl.innerText = `Right answer!! Score: ${scorePoint}`;
      } else {
        button.classList.add("bg-red-500");

        scoreEl.innerText = `Wrong answer!! Score: ${scorePoint}`;
      }
    });
  });
}
nextBtn.addEventListener("click", () => {
  if (questionNum < quizData.length - 1) {
    questionNum++;
    loadQuestion();
  } else {
    clearInterval(timer);
    questionEl.style.display = "none";
    optionsEl.style.display = "none";
    nextBtn.style.display = "none";
    timerEl.innerText = "";
    scoreEl.innerText = "";
    const container = document.querySelector(".container");
    const resultP = document.createElement("p");
    resultP.className = "mt-4 font-bold text-lg";
    resultP.innerText = `Quiz finished!!! Your score is ${scorePoint} out of ${quizData.length}`;
    container.appendChild(resultP);

    const restartButton = document.createElement("button");
    restartButton.innerText = "Restart";
    restartButton.className =
      "mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600";
    container.appendChild(restartButton);

    restartButton.addEventListener("click", () => {
      //resetting all the values
      questionNum = 0;
      scorePoint = 0;
      scoreEl.innerText = `Score: ${scorePoint}`;
      questionEl.style.display = "block";
      optionsEl.style.display = "block";
      nextBtn.style.display = "block";
      nextBtn.style.margin = "16px auto";
      resultP.remove();
      restartButton.remove();
      loadQuestion();
    });
  }
});

// Load the first question
loadQuestion();
