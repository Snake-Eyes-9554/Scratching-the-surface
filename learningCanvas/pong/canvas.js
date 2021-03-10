//SELECTING CANVAS:
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

//DECLARING STARTING CONDITIONS:
canvas.width = (17 * window.innerWidth) / 25;
canvas.height = (17 * window.innerHeight) / 25;

//DECLARING VARIABLES:
const colorArray = ["#F1DAC4", "#A69CAC", "#474973", "#161B33", "#0D0C1D"];

/* Bouncing balls' parameters */
let bouncingBallRadius = canvas.height / 64;
let bouncingBallXSpeed = canvas.width / 435;
let bouncingBallYSpeed = canvas.height / 212;
let bouncingBallOneStartingPosition = [
  bouncingBallRadius,
  canvas.width / 2,
  canvas.width / 1.5 - bouncingBallRadius,
];
let bouncingBallTwoStartingPosition = [
  bouncingBallRadius * 3,
  canvas.width / 2 - bouncingBallRadius * 2,
  canvas.width / 1.3 - bouncingBallRadius,
];
let bouncingBallThreeStartingPosition = [
  bouncingBallRadius * 6,
  canvas.width / 2 + bouncingBallRadius * 2,
  canvas.width / 1.1 - bouncingBallRadius,
];
/* Bouncing balls' parameters */

/* Animated balls' parameters */
let animateBallsRadius = canvas.height / 400;
let animatedBallsXSpeed = 9* canvas.width / 26100;
let animatedBallsYSpeed = 9* canvas.height / 12720;
const animatedBallsNumber = 100;
/* Animated balls' parameters */

/* Declaring balls' variables */
let ballOne;
let ballTwo;
let ballThree;
/* Declaring balls' variables */

/* Canvas spacing declarations */
let spaceAboveCanvas = document.getElementById("top-side").offsetHeight;
let spaceLeftOfCanvas = (innerWidth - canvas.width) / 2;
let spaceRightOfCanvas = (innerWidth - canvas.width) / 2;
/* Canvas spacing declarations */

/* Paddle's parameters */
let paddleX1 = (37 * canvas.width) / 80;
let paddleX2 = (43 * canvas.width) / 80;
let paddleY1 = (35 * canvas.height) / 38;
let paddleY2 = (59 * canvas.height) / 62;
let paddleXCenter = canvas.width / 2;
let paddleYCenter = (368 * canvas.height) / 393;
let paddleRadius = (3 * canvas.width) / 80;
let paddleArcAngle = (720 * canvas.height) / (1769 * canvas.width);
/* Paddle's parameters */

/* Selecting elements */
const btnNew = document.querySelector(".btn-new");
const btnEasy = document.querySelector(".easy-mode");
const btnNormal = document.querySelector(".normal-mode");
const btnHard = document.querySelector(".hard-mode");
const scoreEl = document.querySelector(".score-value");
const highScoreOneEl = document.querySelector(".high-score-value-one");
const highScoreTwoEl = document.querySelector(".high-score-value-two");
const highScoreThreeEl = document.querySelector(".high-score-value-three");
let scoreValue = 0;
let highScoreValueOne = 0;
let highScoreValueTwo = 0;
let highScoreValueThree = 0;
/* Selecting elements */

/* Variables for determining ball launches */
let btnEasyPressed = false;
let btnNormalPressed = false;
let btnHardPressed = false;
let startGameInterval;
let ballTwoInterval;
let ballThreeInterval;
/* Variables for determining ball launches */

/* Variables for counter */
let countValue = 3;
let counterRunnerInterval;
/* Variables for counter */

/* Variables for laucnhing balls */
let launchBallTwoInterval;
let launchBallThreeInterval;
/* Variables for laucnhing balls */

//DECLARING FUNCTIONS:

/* Functions for launching balls */
    function launchBallOne() {
        ballOne = new ballSet(bouncingBallOneStartingPosition[Math.floor(Math.random() * (bouncingBallOneStartingPosition.length))], bouncingBallRadius, bouncingBallXSpeed, bouncingBallYSpeed, bouncingBallRadius, colorArray[4]);
    }
    function launchBallTwo() {
        ballTwo = new ballSet(bouncingBallTwoStartingPosition[Math.floor(Math.random() * (bouncingBallTwoStartingPosition.length))], bouncingBallRadius, bouncingBallXSpeed, bouncingBallYSpeed * 1.2, bouncingBallRadius, colorArray[4]);
        clearInterval(launchBallTwoInterval);
        if (btnHardPressed === true) {
            startCount();
            launchBallThreeInterval = setInterval("launchBallThree()", 5000);
        }
    }
    function launchBallThree() {
        ballThree = new ballSet(bouncingBallThreeStartingPosition[Math.floor(Math.random() * (bouncingBallThreeStartingPosition.length))], bouncingBallRadius, bouncingBallXSpeed, bouncingBallYSpeed * 1.5, bouncingBallRadius, colorArray[4]);
        clearInterval(launchBallThreeInterval);
    }
/* Functions for launching balls */

/* Functions for counter */
class counterRunner {
    constructor(number) {
        this.number = number;
    }

    update = function () {
        c.font = "7rem Arial";
        c.textAlign = "center";
        c.fillText(this.number, canvas.width / 2, canvas.height / 2);
      };
}
let counterRunnerDisplay = new counterRunner("");

function startCount() {
    clearInterval(counterRunnerInterval);
    countValue = 3;
    counterRunnerDisplay = new counterRunner("");
    counterRunnerInterval = setInterval("startCountSecondary()", 1000);
}

function startCountSecondary() {
  if (countValue === 0) {
    countValue = "Go!";
    counterRunnerDisplay = new counterRunner(countValue);
  } else if (countValue === "Go!") {
    countValue = "";
    counterRunnerDisplay = new counterRunner(countValue);
    clearInterval(counterRunnerInterval);
  }
  if (countValue > 0) {
    counterRunnerDisplay = new counterRunner(countValue);
    countValue--;
  }
}
/* Functions for counter */


/* Functions for buttons */
function startEasyMode() {
    if (btnEasyPressed === false) {
    btnNormal.disabled = true;
    btnHard.disabled = true;
    startCount();
    btnEasyPressed = true;
    startGameInterval= setInterval("startGame()", 5000);
    }
};

function startNormalMode() {
    if (btnNormalPressed === false) {
    btnEasy.disabled = true;
    btnHard.disabled = true;
    startCount();
    btnNormalPressed = true;
    startGameInterval= setInterval("startGame()", 5000);
    }
};

function startHardMode() {
    if (btnHardPressed === false) {
    btnEasy.disabled = true;
    btnNormal.disabled = true;
    startCount();
    btnHardPressed = true;
    startGameInterval= setInterval("startGame()", 5000);
    }
};

function startGame() {
    launchBallOne();
    clearInterval(startGameInterval);
    if (btnNormalPressed === true || btnHardPressed === true) {
        startCount();
        launchBallTwoInterval = setInterval("launchBallTwo()", 5000);
    }
};
/* Functions for buttons */

/* Reset function */
function resetGame() {
    if (scoreValue > highScoreValueOne && btnEasyPressed === true) {
        highScoreValueOne = scoreValue;
        highScoreOneEl.textContent = highScoreValueOne;
      }
    
    if (scoreValue > highScoreValueTwo && btnNormalPressed === true) {
        highScoreValueTwo = scoreValue;
        highScoreTwoEl.textContent = highScoreValueTwo;
    }

    if (scoreValue > highScoreValueThree && btnHardPressed === true) {
        highScoreValueThree = scoreValue;
        highScoreThreeEl.textContent = highScoreValueThree;
    }

    btnEasy.disabled = false;
    btnNormal.disabled = false;
    btnHard.disabled = false;
    btnEasyPressed = false;
    btnNormalPressed = false;
    btnHardPressed = false;
    ballOne = new ballSet(-1000, -1000, 0, 0, 0, 0);
    ballTwo = new ballSet(-1000, -1000, 0, 0, 0, 0);
    ballThree = new ballSet(-1000, -1000, 0, 0, 0, 0);
    scoreValue = 0;
    scoreEl.textContent = 0;
    counterRunnerDisplay = new counterRunner('');
    clearInterval(counterRunnerInterval);
    clearInterval(startGameInterval);
    clearInterval(launchBallTwoInterval);
    clearInterval(launchBallThreeInterval);
    cancelAnimationFrame(animationId);
    animate();
}
/* Reset function */

//DECLARING CANVAS EVENT LISTENERS:
let mouse = {
  x: null,
  y: null,
};
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function () {
  init();
});

//DECLARING BUTTONS' EVENT LISTENERS:
btnNew.addEventListener("click", function () {
  resetGame();
});

btnEasy.addEventListener("click", function () {
  startEasyMode();
});

btnNormal.addEventListener("click", function () {
  startNormalMode();
});

btnHard.addEventListener("click", function () {
  startHardMode();
});

//CREATING HANDLE GENERATOR:
class paddleSet {
  constructor(x1, x2, y1, y2, xCenter, yCenter, radius, arcAngle) {
    this.radius = radius;
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.xCenter = xCenter;
    this.yCenter = yCenter;
    this.arcAngle = arcAngle;
  }

  draw() {
    c.beginPath();
    c.moveTo(this.x1, this.y1);
    c.lineTo(this.x2, this.y1);
    c.stroke();
    c.beginPath();
    c.arc(
      this.xCenter,
      this.yCenter,
      this.radius,
      -Math.atan(this.arcAngle),
      Math.atan(this.arcAngle),
      false
    );
    c.stroke();
    c.beginPath();
    c.moveTo(this.x2, this.y2);
    c.lineTo(this.x1, this.y2);
    c.stroke();
    c.beginPath();
    c.arc(
      this.xCenter,
      this.yCenter,
      this.radius,
      Math.PI - Math.atan(this.arcAngle),
      Math.PI + Math.atan(this.arcAngle),
      false
    );
    c.stroke();

    let rectX = (3 * this.x1 + this.x2) / 4;
    let rectY = this.y1;
    let rectX2 = (this.x2 - this.x1) / 2;
    let rectY2 = this.y2 - this.y1;

    c.fillStyle = colorArray[4];
    c.fillRect(rectX, rectY, rectX2, rectY2);
  }

  update() {
    this.draw();

    if (
      mouse.x > (innerWidth - canvas.width) / 2 &&
      mouse.x < (innerWidth + canvas.width) / 2
    ) {
      this.x1 = mouse.x - this.radius - spaceLeftOfCanvas;
      this.x2 = mouse.x + this.radius - spaceLeftOfCanvas;
      this.xCenter = mouse.x - spaceLeftOfCanvas;
      this.draw();
    }
  }
}

/* Specifying paddle */
let paddleStart = new paddleSet(
  paddleX1,
  paddleX2,
  paddleY1,
  paddleY2,
  paddleXCenter,
  paddleYCenter,
  paddleRadius,
  paddleArcAngle
);

//CREATING BALL GENERATOR:
class ballSet {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > canvas.height) {
        this.dy = -this.dy;
    }


    if (this.y + this.radius > paddleY1 && this.x <= mouse.x - spaceLeftOfCanvas + (paddleX2 - paddleX1) / 2 && this.x >= mouse.x - spaceLeftOfCanvas - (paddleX2 - paddleX1) / 2 && this.dy > 0 || this.y - this.radius < 0) {
        this.dy = -this.dy;
        if (this.dy < 0 && this.radius === bouncingBallRadius) {
          scoreValue++;
          scoreEl.textContent = scoreValue;
          this.dy -= 0.05;
        }
    } 

    if (this.y > paddleY1 && this.radius === bouncingBallRadius) {
        cancelAnimationFrame(animationId);
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

/* Specifying bouncing balls */
ballOne = new ballSet(-1000, -1000, 0, 0, 0, 0);
ballTwo = new ballSet(-1000, -1000, 0, 0, 0, 0);
ballThree = new ballSet(-1000, -1000, 0, 0, 0, 0);

/* Specifying small animation balls */
let ballArray = [];
for (let i = 0; i < animatedBallsNumber; i++) {
  let ranRadius = Math.random() * animateBallsRadius + 1;
  let ranX = Math.random() * (canvas.width - ranRadius * 2) + ranRadius;
  let ranY = Math.random() * (canvas.height - ranRadius * 2) + ranRadius;
  let ranDx = (Math.random() - 0.5) * animatedBallsXSpeed;
  let ranDy = (Math.random() - 0.5) * animatedBallsYSpeed;
  let ranColor = colorArray[Math.floor(Math.random() * colorArray.length) + 1];
  ballArray.push(
    new ballSet(ranX, ranY, ranDx, ranDy, ranRadius, ranColor)
  );
}

//STAYTING INITIAL SETTINGS FUNCTION:
function init() {
  canvas.width = (17 * window.innerWidth) / 25;
  canvas.height = (17 * window.innerHeight) / 25;

  animateBallsRadius = canvas.height / 400;
  animatedBallsXSpeed = 9* canvas.width / 26100;
  animatedBallsYSpeed = 9* canvas.height / 12720;

  bouncingBallRadius = canvas.height / 64;
  bouncingBallXSpeed = canvas.width / 435;
  bouncingBallYSpeed = canvas.height / 212;
  bouncingBallOneStartingPosition = [
  bouncingBallRadius,
  canvas.width / 2,
  canvas.width / 1.5 - bouncingBallRadius,
  ];
  bouncingBallTwoStartingPosition = [
  bouncingBallRadius * 3,
  canvas.width / 2 - bouncingBallRadius * 2,
  canvas.width / 1.3 - bouncingBallRadius,
  ];
  bouncingBallThreeStartingPosition = [
  bouncingBallRadius * 6,
  canvas.width / 2 + bouncingBallRadius * 2,
  canvas.width / 1.1 - bouncingBallRadius,
  ];

  paddleX1 = (37 * canvas.width) / 80;
  paddleX2 = (43 * canvas.width) / 80;
  paddleY1 = (35 * canvas.height) / 38;
  paddleY2 = (59 * canvas.height) / 62;
  paddleXCenter = canvas.width / 2;
  paddleYCenter = (368 * canvas.height) / 393;
  paddleRadius = (3 * canvas.width) / 80;
  paddleArcAngle = (720 * canvas.height) / (1769 * canvas.width);
  paddleStart = new paddleSet(
    paddleX1,
    paddleX2,
    paddleY1,
    paddleY2,
    paddleXCenter,
    paddleYCenter,
    paddleRadius,
    paddleArcAngle
  );

  ballArray = [];
  for (let i = 0; i < animatedBallsNumber; i++) {
    let ranRadius = Math.random() * animateBallsRadius + 1;
    let ranX = Math.random() * (canvas.width - ranRadius * 2) + ranRadius;
    let ranY = Math.random() * (canvas.height - ranRadius * 2) + ranRadius;
    let ranDx = (Math.random() - 0.5) * animatedBallsXSpeed;
    let ranDy = (Math.random() - 0.5) * animatedBallsYSpeed;
    let ranColor =
      colorArray[Math.floor(Math.random() * colorArray.length) + 1];
    ballArray.push(
      new ballSet(ranX, ranY, ranDx, ranDy, ranRadius, ranColor)
    );
  }

  spaceAboveCanvas = document.getElementById("top-side").offsetHeight;
  spaceLeftOfCanvas = (innerWidth - canvas.width) / 2;
  spaceRightOfCanvas = (innerWidth - canvas.width) / 2;

  ballOne = new ballSet(-1000, -1000, 0, 0, 0, 0);
  ballTwo = new ballSet(-1000, -1000, 0, 0, 0, 0);
  ballThree = new ballSet(-1000, -1000, 0, 0, 0, 0);

  animate()
}

//CALLING THE ANIMATION FUNCTION:
let animationId;
function animate() {
  animationId = requestAnimationFrame(animate);
  c.fillStyle = colorArray[0];
  c.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  }

  c.beginPath();
  c.moveTo(0,paddleY1);
  c.lineTo(canvas.width , paddleY1);
  c.stroke();

  paddleStart.update();
  ballOne.update();
  ballTwo.update();
  ballThree.update();
  counterRunnerDisplay.update();
}

animate();
