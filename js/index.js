// Constant Data
const wordLvlKids = [
  "vue",
  "task",
  "Fun",
  "play",
  "via",
  "Due",
  "UI",
  "UX",
  "Pug",
  "sass",
  "SCSS",
  "less"
];

const wordLvlNormal = [
  "Runner",
  "Angular",
  "Gulp",
  "TypeScript",
  "Task Runner",
  "JavaScript",
  "Program",
  "HTML",
  "Css",
  "Container",
  "Subclasses",
  "Image",
  "Processor",
  "Graphics",
  "Theme",
  "Python",
  "Network",
  "Router",
  "Switch",
  "Firewall"
];

const wordLvlHard = [
  "Programming",
  "initialization",
  "Polymorphism",
  "inheritance",
  "Encapsulation",
  "Bunds Repuplic Deutschland",
  "Utilities",
  "Positioning",
  "Abstraction",
  "fluid Container",
  "Classification",
  "Imagination",
  "Processing",
  "Motion Graphics",
  "Languages"
];

const LvlSeconds = {
  "kids": 6,
  "normal": 4,
  "hard": 3
};

let catContainer = Array.from(document.querySelectorAll(".cats .box")),
  btnStart = document.querySelector(".cats button"),
  btnReload = document.querySelector(".game button");
catogries = document.querySelector(".cats"),
  count = document.querySelector(".count"),
  game = document.querySelector(".game");
spanLvl = document.querySelector(".lvl-secs"),
  spanLvlSelected = document.querySelector(".lvl-secs .lvl"),
  spanSecsSelected = document.querySelector(".lvl-secs .secs"),
  timeLeftDiv = document.querySelector(".time-left");
timeLeft = document.querySelector(".time-left .secs-lvl"),
  timeDiv = document.querySelector(".time");
ScoredPtsSpan = document.querySelector(".score .scored"),
  mainScorePtsSpan = document.querySelector(".score .main-score"),
  upcomingWords = document.querySelector(".upcoming-words"),
  words = document.querySelector(".upcoming-words .word"),
  input = document.querySelector("input"),
  wordToType = document.querySelector(".word-to-type");
dataLvlSecs = "",
  dataLvlCat = "";
wordGenerate = "";


catContainer.forEach((cat) => {
  cat.addEventListener("click", (e) => {
    catContainer.forEach((cat) => {
      cat.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    if(cat.classList.contains("active")) {
      btnStart.style.opacity = "1";
    }
    dataLvlCat = e.currentTarget.dataset.cat;
    dataLvlSecs = LvlSeconds[e.currentTarget.dataset.cat.toLowerCase()];
  });
});

btnStart.onclick = (e) => {
  catContainer.forEach((cat) => {
    if(!cat.classList.contains("active")) {
      e.preventDefault();
    } else {
      catogries.remove();
      countDown(count);
    }
  });
};

function countDown(count) {
  count.innerHTML = 3;
  let counter = setInterval(() => {
    count.innerHTML--;
    if(count.innerHTML < 0) {
      clearInterval(counter);
      count.remove();
      game.style.display = "block";

      editSettings();
      input.focus();
    }
  }, 1000);
}

function editSettings() {
  spanLvlSelected.innerHTML = `[ ${dataLvlCat} ]`;
  spanSecsSelected.innerHTML = `[ ${dataLvlSecs} ]`;

  // Time Left & Score Points 
  timeLeft.innerHTML = dataLvlSecs;
  if(dataLvlCat === "Kids") {
    wordGenerate = wordLvlKids;
  } else if(dataLvlCat === "Normal") {
    wordGenerate = wordLvlNormal;
  } else {
    wordGenerate = wordLvlHard;
  }
  mainScorePtsSpan.innerHTML = wordGenerate.length;
  getWord(wordGenerate);
}

function getWord(arrOfWord) {
  // Get Words In Upcoming Div 
  let word = arrOfWord[Math.floor(Math.random() * arrOfWord.length)];
  let wordIndex = arrOfWord.indexOf(word);
  arrOfWord.splice(wordIndex, 1);
  wordToType.innerHTML = word;
  // Get Words In Upcoming Div 
  upcomingWords.innerHTML = '';
  for(let i = 0;i < arrOfWord.length;i++) {
    let spanWord = document.createElement("span");
    let spanWordtext = document.createTextNode(arrOfWord[i]);
    spanWord.className = "word";
    spanWord.appendChild(spanWordtext);
    upcomingWords.appendChild(spanWord);
  }

  startPlay();
}

function startPlay() {
  let counter = setInterval(() => {
    timeLeft.innerHTML--;
    if(timeLeft.innerHTML <= 0) {
      clearInterval(counter);
      compareWords(input, wordToType, wordGenerate);
    }
  }, 1000);
}

function compareWords(input, word, arrOfWord) {
  timeLeft.innerHTML = dataLvlSecs;
  if(word.innerHTML.toLowerCase() === input.value.toLowerCase()) {
    input.value = '';

    ScoredPtsSpan.innerHTML++;
    if(arrOfWord.length > 0) {
      // To Generate Words
      getWord(wordGenerate);
    } else {
      wordToType.style.color = "#009688";
      if(ScoredPtsSpan.innerHTML > 10) {
        wordToType.innerHTML = "Super!";
      } else if(ScoredPtsSpan.innerHTML < 10) {
        wordToType.innerHTML = "Sehr Gut!";
      }
      deleteElements();
    }
  } else {
    wordToType.innerHTML = "Game Over";
    wordToType.style.color = "#f00";
    deleteElements();
  }
}

function deleteElements() {
  timeLeftDiv.remove();
  timeDiv.classList.add("res");
  btnReload.style.display = "block";
  btnReload.addEventListener("click", () => {
    window.location.reload();
  });
  upcomingWords.remove();
  input.remove();
}
