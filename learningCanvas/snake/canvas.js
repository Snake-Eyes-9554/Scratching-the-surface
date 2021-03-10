//SELECTING CANVAS:
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

//DECLARING STARTING CONDITIONS:
canvas.width = (3 * window.innerHeight) / 4;
canvas.height = (3 * window.innerHeight) / 4;

//DECLARING VARIABLES:

/* Assigning elements */
const btnSlow = document.querySelector('.btn-slow');
const btnNormal = document.querySelector('.btn-normal');
const btnFast = document.querySelector('.btn-fast');
const btnSmall = document.querySelector('.btn-small');
const btnMedium = document.querySelector('.btn-medium');
const btnLarge = document.querySelector('.btn-large');
const btnStart = document.querySelector('.btn-start');
const btnReset = document.querySelector('.btn-reset');
const scoreEl = document.querySelector('.score');
const highScoreEl = document.querySelector('.high-score');
const highScoreAnimatedEl = document.querySelector('.high-score-element');

let scoreValue = 0;
let highScoreValue = 0;

/* Setting game squares */
let numberOfSquares = 676;
let squareSide = canvas.height / Math.sqrt(numberOfSquares);
let halfSquareSide = squareSide / 2;


/* Setting variables for game control */
let direction = "right";
let runGameInterval;
let gameSpeed = 100;


/* Setting general snake head properties */
let snakePositionX = (Math.sqrt(numberOfSquares) / 2) * squareSide - halfSquareSide;
let snakePositionY = (Math.sqrt(numberOfSquares) / 2) * squareSide - halfSquareSide;
let snakeColor = "#a0bc5c";
let snakePassedPositions = [];
let showSnakeInterval;


/* Setting horizontal right snake head properties */
let hRGoToXOne,hRGoToYOne,hRGoToXTwo,hRGoToYTwo,hRGoToXThree,hRGoToYThree;
function updateHRPosition(){
  hRGoToXOne = snakePositionX + halfSquareSide;
  hRGoToYOne = snakePositionY;
  hRGoToXTwo = snakePositionX - halfSquareSide;
  hRGoToYTwo = snakePositionY - halfSquareSide;
  hRGoToXThree = snakePositionX - halfSquareSide;
  hRGoToYThree = snakePositionY + halfSquareSide;
};

/* Setting horizontal left snake head properties */
let hLGoToXOne,hLGoToYOne,hLGoToXTwo,hLGoToYTwo,hLGoToXThree,hLGoToYThree;
function updateHLPosition() {
  hLGoToXOne = snakePositionX - halfSquareSide;
  hLGoToYOne = snakePositionY;
  hLGoToXTwo = snakePositionX + halfSquareSide;
  hLGoToYTwo = snakePositionY - halfSquareSide;
  hLGoToXThree = snakePositionX + halfSquareSide;
  hLGoToYThree = snakePositionY + halfSquareSide;
};


/* Setting vertical up snake head properties */
let vUGoToXOne,vUGoToYOne,vUGoToXTwo,vURGoToYTwo,vUGoToXThree,vUGoToYThree;
function updateVUPosition() {
  vUGoToXOne = snakePositionX;
  vUGoToYOne = snakePositionY - halfSquareSide;
  vUGoToXTwo = snakePositionX - halfSquareSide;
  vURGoToYTwo = snakePositionY + halfSquareSide;
  vUGoToXThree = snakePositionX + halfSquareSide;
  vUGoToYThree = snakePositionY + halfSquareSide;
};


/* Setting vertical down snake head properties */
let vDGoToXOne,vDGoToYOne,vDGoToXTwo,vDRGoToYTwo,vDGoToXThree,vDGoToYThree;
function updateVDPosition() {
  vDGoToXOne = snakePositionX;
  vDGoToYOne = snakePositionY + halfSquareSide;
  vDGoToXTwo = snakePositionX - halfSquareSide;
  vDRGoToYTwo = snakePositionY - halfSquareSide;
  vDGoToXThree = snakePositionX + halfSquareSide;
  vDGoToYThree = snakePositionY - halfSquareSide;
};


/* Setting variables for food */
let eatenFood;
let wrongSpawnedFood;
let foodArray = [];
let eatenFoodArray = [];
let particlesArray = [];


/* Assigning audio */
const loseGameAudio = new Audio('lost_game.mp3');
const eatFoodAudio = new Audio('eat_food.mp3');
eatFoodAudio.volume = 0.1;
loseGameAudio.volume = 0.5;

/* Variables for counter */
let countValue = 3;
let counterRunInterval;

/* Variables for determining game start */
let btnSlowPressed = false;
let btnNormalPressed = false;
let btnFastPressed = false;
let btnSmallPressed = false;
let btnMediumPressed = false;
let btnLargePressed = false;
let gameNeedsResetting = false;
let startGameInterval;


//FUNCTIONS: 

/* Functions for counter and first 5 seconds */
class counterRun {
  constructor(number) {
      this.number = number;
  }

  update = function () {
      c.font = "7rem 'Akaya Telivigala', cursive";
      c.textAlign = "center";
      c.fillStyle = "#a0bc5c"
      c.fillText(this.number, canvas.width / 2, canvas.height / 2);
    };
}
let counterDisplay = new counterRun("");

function startCount() {
  clearInterval(counterRunInterval);
  countValue = 3;
  counterDisplay = new counterRun("");
  counterRunInterval = setInterval("startCountSecondary()", 1000);
}

function startCountSecondary() {
if (countValue === 0) {
  countValue = "";
  counterDisplay = new counterRun(countValue);
  clearInterval(counterRunInterval);
}
if (countValue > 0) {
  counterDisplay = new counterRun(countValue);
  countValue--;
}
}

function showSnake() {
  return;
}

function runGameIntervalTimer() {
  cancelAnimationFrame(animationID);
  runGameInterval = setInterval("runGame()", gameSpeed);
  clearInterval(startGameInterval);
}


/* Initial sizes function */
function gameSizeUpdater() {
  canvas.width = (3 * window.innerHeight) / 4;
  canvas.height = (3 * window.innerHeight) / 4;
  squareSide = canvas.height / Math.sqrt(numberOfSquares);
  halfSquareSide = squareSide / 2;
  snakePositionX = (Math.sqrt(numberOfSquares) / 2) * squareSide - halfSquareSide;
  snakePositionY = (Math.sqrt(numberOfSquares) / 2) * squareSide - halfSquareSide;
  updateHRPosition();
  updateHLPosition();
  updateVUPosition();
  updateVDPosition();
  randomizeFood();
}


//DECLARING CANVAS EVENT LISTENERS:
window.addEventListener("resize", function() {
  clearInterval(runGameInterval);
  cancelAnimationFrame(animationID);
  clearInterval(startGameInterval);
  clearInterval(showSnakeInterval);
});


window.addEventListener("keydown", function(event) {
  let code = event.which || event.keyCode;
  let testDirection = direction;
  if(testDirection === "right" || testDirection === "left") {
    if (event.key === "w" || event.key === "W" || code == '38') {
      direction = "up"
    }
    if (event.key === "s" || event.key === "S" || code == '40') {
      direction = "down"
    }
  } 
  if(testDirection === "up" || testDirection === "down") {
    if (event.key === "a" || event.key === "A" || code == '37') {
      direction = "left"
    }
    if (event.key === "d" || event.key === "D" || code == '39') {
      direction = "right"
    }
  }
})


//DECLARING BUTTON EVENT LISTENERS:
btnSlow.addEventListener('click', function() {
  if (!btnSlowPressed) {
    btnSlow.classList.add('btn-color');
    btnNormal.classList.remove('btn-color');
    btnFast.classList.remove('btn-color');
    gameSpeed = 140;
  }
});

btnNormal.addEventListener('click', function() {
  if (!btnNormalPressed) {
    btnNormal.classList.add('btn-color');
    btnSlow.classList.remove('btn-color');
    btnFast.classList.remove('btn-color');
    gameSpeed = 100;
  }
});

btnFast.addEventListener('click', function() {
  if (!btnFastPressed) {
    btnFast.classList.add('btn-color');
    btnSlow.classList.remove('btn-color');
    btnNormal.classList.remove('btn-color');
    gameSpeed = 60;
  }
});

btnSmall.addEventListener('click', function() {
  if (!btnSmallPressed) {
    btnSmall.classList.add('btn-color');
    btnMedium.classList.remove('btn-color');
    btnLarge.classList.remove('btn-color');
    numberOfSquares = 400;
    gameSizeUpdater();
  }
});

btnMedium.addEventListener('click', function() {
  if (!btnMediumPressed) {
    btnMedium.classList.add('btn-color');
    btnSmall.classList.remove('btn-color');
    btnLarge.classList.remove('btn-color');
    numberOfSquares = 676;
    gameSizeUpdater();
  }
});

btnLarge.addEventListener('click', function() {
  if (!btnLargePressed) {
    btnLarge.classList.add('btn-color');
    btnSmall.classList.remove('btn-color');
    btnMedium.classList.remove('btn-color');
    numberOfSquares = 900;
    gameSizeUpdater();
  }
});

btnStart.addEventListener('click', function() {
  if (!gameNeedsResetting) {
  btnStart.classList.add('btn-color');
  btnReset.classList.remove('btn-color');
  if (!btnSlow.classList.contains('btn-color') && !btnFast.classList.contains('btn-color') && !btnSmall.classList.contains('btn-color') && !btnLarge.classList.contains('btn-color')) {
  btnMedium.classList.add('btn-color');
  btnNormal.classList.add('btn-color');
  };
  if (!btnSlow.classList.contains('btn-color') && !btnFast.classList.contains('btn-color') && (btnSmall.classList.contains('btn-color') || btnMedium.classList.contains('btn-color') || btnLarge.classList.contains('btn-color'))) {
    btnNormal.classList.add('btn-color');
  }
  if (!btnSmall.classList.contains('btn-color') && !btnLarge.classList.contains('btn-color') && (btnSlow.classList.contains('btn-color') || btnNormal.classList.contains('btn-color') || btnFast.classList.contains('btn-color'))) {
    btnMedium.classList.add('btn-color');
  }
  animate();
  startCount();
  btnSlowPressed = true;
  btnNormalPressed = true;
  btnFastPressed = true;
  btnSmallPressed = true;
  btnMediumPressed = true;
  btnLargePressed = true;
  gameNeedsResetting = true;
  startGameInterval = setInterval('runGameIntervalTimer()' , 5000);
  showSnakeInterval = setInterval(function() {
  showSnake = function(){
    updateHRPosition();
    horizontalRightSnake = new SnakeSet(snakePositionX,snakePositionY,hRGoToXOne,hRGoToYOne,hRGoToXTwo,hRGoToYTwo,hRGoToXThree,hRGoToYThree);
    horizontalRightSnake.draw();
  };
  clearInterval(showSnakeInterval);
  }, 4000);
  randomizeFood ();
}
})

btnReset.addEventListener('click', function() {
  btnReset.classList.add('btn-color');
  btnStart.classList.remove('btn-color');
  btnSmall.classList.remove('btn-color');
  btnMedium.classList.remove('btn-color');
  btnLarge.classList.remove('btn-color');
  btnSlow.classList.remove('btn-color');
  btnNormal.classList.remove('btn-color');
  btnFast.classList.remove('btn-color');
  highScoreAnimatedEl.style.animationName = "none";
  clearInterval(runGameInterval);
  cancelAnimationFrame(animationID);
  clearInterval(startGameInterval);
  clearInterval(showSnakeInterval);
  if (scoreValue > highScoreValue) {
    highScoreValue = scoreValue;
    highScoreEl.textContent = highScoreValue;
    highScoreAnimatedEl.style.animationName = "enlarge";
  };
  scoreValue = 0;
  scoreEl.textContent = scoreValue;
  numberOfSquares = 676;
  gameSpeed = 100;
  direction = "right";
  snakePassedPositions = [];
  snakeColor = "#a0bc5c";
  eatenFood = null;
  wrongSpawnedFood = null;
  foodArray = [];
  eatenFoodArray = [];
  particlesArray = [];
  btnSlowPressed = false;
  btnNormalPressed = false;
  btnFastPressed = false;
  btnSmallPressed = false;
  btnMediumPressed = false;
  btnLargePressed = false;
  gameNeedsResetting = false;
  showSnake = function() {
    return;
  }
  gameSizeUpdater();
})


//SETTING SNAKE HEAD GENERATOR:
class SnakeSet {
  constructor(startX,startY,goToXOne,goToYOne,goToXTwo,goToYTwo,goToXThree,goToYThree) {
    this.startX = startX;
    this.startY = startY;
    this.goToXOne = goToXOne;
    this.goToYOne = goToYOne;
    this.goToXTwo = goToXTwo;
    this.goToYTwo = goToYTwo;
    this.goToXThree = goToXThree;
    this.goToYThree = goToYThree;
  }

  draw() {
    c.beginPath();
    c.moveTo(this.startX,this.startY);
    c.lineTo(this.goToXOne,this.goToYOne);
    c.lineTo(this.goToXTwo,this.goToYTwo);
    c.lineTo(this.goToXThree,this.goToYThree);
    c.lineTo(this.goToXOne,this.goToYOne);
    c.fillStyle = snakeColor
    c.fill()
    c.strokeStyle = snakeColor;
    c.stroke();
  }
}


//STAYTING FOOD'S GENERATOR:
class foodSet {
  constructor(x,y,color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, halfSquareSide, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
}


//PUSHING FOOD:
function randomizeFood () {
  foodArray = [];
  for (let i = 0; i < numberOfSquares; i++) {
    let x = (Math.trunc(Math.random() * Math.sqrt(numberOfSquares))) * squareSide + halfSquareSide;
    let y = (Math.trunc(Math.random() * Math.sqrt(numberOfSquares))) * squareSide + halfSquareSide;
    
    let r1, r2, r3, r4, r5, r6;
    let rgbComponents = [5,6,7,8,9,"a","b","c","d","e","f"];
    r1 = Math.floor(Math.random()*rgbComponents.length);
    r2 = Math.floor(Math.random()*rgbComponents.length);
    r3 = Math.floor(Math.random()*rgbComponents.length);
    r4 = Math.floor(Math.random()*rgbComponents.length);
    r5 = Math.floor(Math.random()*rgbComponents.length);
    r6 = Math.floor(Math.random()*rgbComponents.length);
    let color = `#${rgbComponents[r1]}${rgbComponents[r2]}${rgbComponents[r3]}${rgbComponents[r4]}${rgbComponents[r5]}${rgbComponents[r6]}`;
    foodArray.push(new foodSet(x, y, color))
  }
  console.log(foodArray);
}
randomizeFood ();

//STAYTING ANIMATED INTERACTION GENERATOR:
class Particles {
  constructor(x,y,radius,color,velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw() {
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.restore();
  } 

  update() {
    this.draw()
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.alpha -= 0.5;
  }
} 



// STAYTING GAME INTERVAL FUNCTION:
function runGame() {
  c.fillStyle = 'rgba(25,25,25)'
  c.fillRect(0,0,canvas.width,canvas.height);

  /* Calling particles animation */
  particlesArray.forEach((Particles, index) => {
    if (particlesArray.alpha <= 0) {
      particlesArray.splice(index,1)
    } else {
      Particles.update();
    }
  }) 

  /* Registering snake's passed positions */
  snakePassedPositions.push({x:snakePositionX, y:snakePositionY});

  /* Removing eatan food and growing snake */
  if (Math.abs(snakePositionX - foodArray[0].x) <= 0.1 && Math.abs(snakePositionY - foodArray[0].y) <= 0.1) {
    for (let i = 0; i < 10; i++) {
      particlesArray.push(new Particles(foodArray[0].x, foodArray[0].y, 3, foodArray[0].color, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200
      }))
    };
    snakeColor = foodArray[0].color;
    eatenFood = foodArray.splice(0,1); 
    eatenFoodArray.push(eatenFood);
    eatFoodAudio.play();
    scoreValue = eatenFoodArray.length;
    scoreEl.textContent = scoreValue;
  }

  if (eatenFoodArray.length != 0) {
    for (let i = 0; i < eatenFoodArray.length; i++) {
      eatenFoodArray[i][0].x = snakePassedPositions[snakePassedPositions.length - i - 2].x;
      eatenFoodArray[i][0].y = snakePassedPositions[snakePassedPositions.length - i - 2].y;
      eatenFoodArray[i][0].draw();
    }
  }
  
  /* Stopping game if head hits tail */ /* Stopping food from spawning on tail */
  for (let i = eatenFoodArray.length - 1; i >= 0; i--) {
    if (Math.abs(snakePositionX - snakePassedPositions[snakePassedPositions.length - i - 2].x) <= 1 && Math.abs(snakePositionY - snakePassedPositions[snakePassedPositions.length - i - 2].y) <= 1) {
      loseGameAudio.play();
      clearInterval(runGameInterval);
      if (scoreValue > highScoreValue) {
      highScoreValue = scoreValue;
      highScoreEl.textContent = highScoreValue;
      highScoreAnimatedEl.style.animationName = "enlarge";
      };
    }
    if (Math.abs(foodArray[0].x - snakePassedPositions[snakePassedPositions.length - i - 2].x) <= 0.1 && Math.abs(foodArray[0].y - snakePassedPositions[snakePassedPositions.length - i - 2].y) <= 0.1) {
      wrongSpawnedFood = foodArray.splice(0,1);
      foodArray.push(wrongSpawnedFood);
    }
  }
  
  /* Fixing food being spawned in the wrong place */
  if (Math.abs(snakePositionX - foodArray[0].x) <= 0.1 && Math.abs(snakePositionY - foodArray[0].y) <= 0.1) {
    wrongSpawnedFood = foodArray.splice(0,1);
    foodArray.push(wrongSpawnedFood);
  }
  foodArray[0].draw();

  /* Controlling snake head */
    if (direction === "right") {
      updateHRPosition();
      horizontalRightSnake = new SnakeSet(snakePositionX,snakePositionY,hRGoToXOne,hRGoToYOne,hRGoToXTwo,hRGoToYTwo,hRGoToXThree,hRGoToYThree);
      horizontalRightSnake.draw();
      snakePositionX += squareSide;
    }
    else if (direction === "left") {
      updateHLPosition()
      horizontalLeftSnake = new SnakeSet(snakePositionX,snakePositionY,hLGoToXOne,hLGoToYOne,hLGoToXTwo,hLGoToYTwo,hLGoToXThree,hLGoToYThree);
      horizontalLeftSnake.draw();
      snakePositionX -= squareSide;
    }
    else if (direction === "up") {
      updateVUPosition();
      verticalUpSnake = new SnakeSet(snakePositionX,snakePositionY,vUGoToXOne,vUGoToYOne,vUGoToXTwo,vURGoToYTwo,vUGoToXThree,vUGoToYThree);
      verticalUpSnake.draw();
      snakePositionY -= squareSide;
    }
    else if (direction === "down") {
      updateVDPosition();
      verticalDownSnake = new SnakeSet(snakePositionX,snakePositionY,vDGoToXOne,vDGoToYOne,vDGoToXTwo,vDRGoToYTwo,vDGoToXThree,vDGoToYThree);
      verticalDownSnake.draw();
      snakePositionY += squareSide;
    }
    if (snakePositionX + halfSquareSide - 0.1 > canvas.width || snakePositionX - halfSquareSide + 0.1 < 0 || snakePositionY + halfSquareSide - 0.1 > canvas.height || snakePositionY - halfSquareSide + 0.1 < 0) {
      loseGameAudio.play();
      clearInterval(runGameInterval);
      if (scoreValue > highScoreValue) {
        highScoreValue = scoreValue;
        highScoreEl.textContent = highScoreValue;
        highScoreAnimatedEl.style.animationName = "enlarge";
      };
    }
}
 
//DECLARING ANIMATION FUNCTION TO USE COUNTER:
let animationID;
function animate() {
  animationID = requestAnimationFrame(animate);
  c.clearRect(0,0,canvas.width,canvas.height);
  counterDisplay.update();
  showSnake();
}