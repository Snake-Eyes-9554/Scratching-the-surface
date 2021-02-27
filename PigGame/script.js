'use strict';

//Selecting Elements:

const sectionOneEl = document.querySelector('.player--0');
const sectionTwoEl = document.querySelector('.player--1');
const playerOneTotalEl = document.getElementById('score--0');
const playerTwoTotalEl = document.getElementById('score--1');
const playerOneCurrentEl = document.getElementById('current--0');
const playerTwoCurrentEl = document.getElementById('current--1');
const diceImg = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

//Declaring Variables:

let currentScoreVal = 0;
let playerOneTotalVal = 0;
let playerTwoTotalVal = 0;
let currentTurn = 1;

//Functions:

function avtivatePlayer(playerCurrentEl, turn, activate, deactivate) {
  /* Set activate,and deactivate to players' section element; */
  activate.classList.add('player--active');
  deactivate.classList.remove('player--active');
  currentScoreVal = 0;
  currentTurn = turn;
  playerCurrentEl.textContent = 0;
}

function assignRolledDice(playerCurrentEl, turn, activate, deactivate) {
  let diceRollVal = Math.trunc(Math.random() * 6) + 1;
  diceImg.style.display = 'block';
  diceImg.src = `dice-${diceRollVal}.png`;

  if (diceRollVal !== 1) {
    currentScoreVal += diceRollVal;
    playerCurrentEl.textContent = currentScoreVal;
  } else {
    avtivatePlayer(playerCurrentEl, turn, activate, deactivate);
  }
}

function declareWinner(sectionEl) {
  sectionEl.classList.add('player--winner');
  currentTurn = 0;
  diceImg.style.display = 'none';
}

//Buttons:

newBtn.addEventListener('click', function () {
  playerOneTotalVal = 0;
  playerTwoTotalVal = 0;
  playerOneTotalEl.textContent = 0;
  playerTwoTotalEl.textContent = 0;
  diceImg.style.display = 'none';
  sectionOneEl.classList.remove('player--winner');
  sectionTwoEl.classList.remove('player--winner');
  playerTwoCurrentEl.textContent = 0;
  avtivatePlayer(playerOneCurrentEl, 1, sectionOneEl, sectionTwoEl);
});

rollBtn.addEventListener('click', function () {
  if (currentTurn === 1) {
    assignRolledDice(playerOneCurrentEl, 2, sectionTwoEl, sectionOneEl);
  } else if (currentTurn === 2) {
    assignRolledDice(playerTwoCurrentEl, 1, sectionOneEl, sectionTwoEl);
  }
});

holdBtn.addEventListener('click', function () {
  if (currentTurn === 1) {
    playerOneTotalVal += currentScoreVal;
    playerOneTotalEl.textContent = playerOneTotalVal;
    avtivatePlayer(playerOneCurrentEl, 2, sectionTwoEl, sectionOneEl);
  } else if (currentTurn === 2) {
    playerTwoTotalVal += currentScoreVal;
    playerTwoTotalEl.textContent = playerTwoTotalVal;
    avtivatePlayer(playerTwoCurrentEl, 1, sectionOneEl, sectionTwoEl);
  }

  //Declaring Winner:
  if (playerOneTotalVal >= 100) {
    declareWinner(sectionOneEl);
  } else if (playerTwoTotalVal >= 100) {
    declareWinner(sectionTwoEl);
  }
});
