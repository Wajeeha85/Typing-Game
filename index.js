const allKeys = document.querySelectorAll(".key");
const keysArray = Array.from(allKeys);
const score = document.getElementById("score");
const timeOut = document.getElementById("TimeGoes");
var verify = [];
let currentScore = 0;
let start = false;
var matchSuccess = [];
let effectShowing = false;
var stopRunning;
let end = false;

function timer() {
  var sec = 06;
  var timer = setInterval(function () {
    document.getElementById("timer").innerHTML = "00:" + sec;
    sec--;
    if (sec < 0) {
      clearInterval(timer);
      scoreRange();
      timeOut.textContent = " -----Time's Out⌛:";
      clearInterval(stopRunning);
      window.removeEventListener("keydown", (e) => handleKey(e, end));
      console.log("ending game here");
      end = true;
    }
  }, 1000);
}
function show() {
  if (!effectShowing) {
    const random = Math.floor(Math.random() * keysArray.length);
    const randomEffect = keysArray[random];
    verify.push(randomEffect);
    randomEffect.classList.add("effect");
    stopRunning = setTimeout(() => {
      randomEffect.classList.remove("effect");
      if (!verify.includes(randomEffect)) {
        console.log("no match");
      }
      effectShowing = false;
    }, 700);
    effectShowing = true;
  }
}
function scoreRange() {
  if (currentScore >= 150) {
    document.getElementById("start").textContent =
      "You Won Press  Any key To Start Again ";
    document.getElementById("YouWon").play();
  } else {
    document.getElementById("Fails").play();
    document.getElementById("start").textContent =
      " You lose Press Any key to start Again💔";
  }
}
function keyPress() {
  document.getElementById("start").textContent = "Game Starts 💦";
  timeOut.textContent = " Ur Time Starts  ⌚ :";
  setInterval(() => {
    show();
  }, 1000);
}
function handleKey(e, endTemp) {
  if (start === false) {
    keyPress();
    console.log("key pressed");
    start = true;
    timer();
  }

  if (endTemp === true) {
    console.log(" eding and tart again");
    keyPress();
    timer();
    end = false;
  }

  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

  if (
    !start ||
    currentScore >= 150 ||
    timeOut.textContent === " -----Time's Out⌛:"
  ) {
    start = false;
    currentScore = 0;
    score.textContent = currentScore;

    if (
      start &&
      (currentScore >= 150 || timeOut.textContent === " -----Time's Out⌛:")
    ) {
      timer();
    }

    return;
  }
  if (key) {
    key.style.backgroundColor = "aqua";
    setTimeout(() => {
      key.style.backgroundColor = "transparent";
    }, 700);
    const matchedKey = verify.find(
      (keyElement) =>
        keyElement.getAttribute("data-key") === e.keyCode.toString()
    );
    if (matchedKey) {
      console.log("Matching key found:", key.textContent);
      checkMatch(e.keyCode);
    } else {
      checkMatch(e.keyCode);
      console.log("No matching key found.");
    }
    if (!effectShowing) {
      setTimeout(() => {
        // show();
      }, 500);
    }
  }
}
function gameEnds() {
  if (currentScore >= 150 || timeOut.textContent === " -----Time's Out⌛:") {
    window.removeEventListener("keydown", (e) => handleKey(e, end));
  }
}
window.addEventListener("keydown", (e) => handleKey(e, end));
window.addEventListener("load", gameEnds);
function checkMatch(keyCode) {
  const matchingForm = verify.findIndex(
    (key) => parseInt(key.getAttribute("data-key")) === keyCode
  );

  if (matchingForm !== -1) {
    console.log("Correct");
    document.getElementById("Sounds").play();
    verify.splice(matchingForm, 1);
    currentScore += 10;
  } else {
    console.log("Wrong");
    document.getElementById("mySound").play();
    currentScore -= 10;
  }
  score.textContent = currentScore;
}
