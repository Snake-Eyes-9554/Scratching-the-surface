'use strict';
// Variables:
let generatedNumber = Math.floor(Math.random() * 20) + 1;
let getIt = false;
let currentScore = 20;
let maxScore = 0;
let inputedNumber;

//Functions:

function changeText(klass, newValue) {
  document.querySelector(klass).textContent = newValue;
}

function changeBackground(color) {
  document.body.style.backgroundColor = color;
}
function displayScore() {
  changeText('.score', currentScore);
}

//Again button:
document.querySelector('.again').addEventListener('click', function () {
  generatedNumber = Math.floor(Math.random() * 20) + 1;
  changeBackground('#222');
  document.querySelector('.number').style.width = '15rem';
  currentScore = 20;
  changeText('.score', currentScore);
  changeText('.message', 'Start guessing...');
  changeText('.number', '?');
  document.querySelector('.guess').value = ``;
});

//Check button:
document.querySelector('.check').addEventListener('click', function () {
  inputedNumber = Number(document.querySelector('.guess').value);

  if (currentScore <= 1) {
    changeText('.message', '😬 Game Over! Try Again!');
    currentScore = 0;
    changeBackground('red');
    displayScore();
  } else {
    if (!inputedNumber) {
      changeText('.message', '🚫 Not valid!');
    } else if (inputedNumber < 0) {
      changeText('.message', '🚫 Number can not be negative!');
    } else if (inputedNumber > 0 && inputedNumber <= 20) {
      if (inputedNumber !== generatedNumber) {
        if (getIt) {
          return;
        } else {
          currentScore--;
        }
        document.querySelector('.message').textContent =
          inputedNumber > generatedNumber ? '📈 Too High' : '📉 Too Low';
        displayScore();
      } else if (inputedNumber === generatedNumber) {
        changeText('.message', '🎉 CONGRATS YOU WON!');
        changeText('.number', inputedNumber);
        changeBackground('#68b444');
        document.querySelector('.number').style.width = '30rem';
        getIt = true;
        if (maxScore < currentScore) {
          maxScore = currentScore;
          changeText('.highscore', maxScore);
        } else {
          return;
        }
      }
    } else if (inputedNumber > 20) {
      changeText('.message', '🚫 Number can not be greater than twenty!');
    }
  }
});
