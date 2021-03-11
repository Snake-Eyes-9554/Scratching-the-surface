//SELECTING CANVAS:
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

//DECLARING STARTING CONDITIONS:
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//DECLARING VARIABLES:
const cloudImage = new Image();
cloudImage.src = "cloudImage.png";
const birdImage = new Image();
birdImage.src = "birdImage.png";
const shortTrunkImage = new Image();
shortTrunkImage.src = "shortTrunkImage.png";
const mediumTrunkImage = new Image();
mediumTrunkImage.src = "mediumTrunkImage.png";
const largeTrunkImage = new Image();
largeTrunkImage.src = "largeTrunkImage.png";
let gameFrame = 0;

//DECLARING FUNCTIONS:

/* Reset function */
/* Reset function */

/* Functions for buttons */
/* Functions for buttons */

//DECLARING CANVAS EVENT LISTENERS:
window.addEventListener("resize", function () {
  init();
});

window.addEventListener("mousedown", function (event) {
  if (MouseEvent && event.button == 0) {
    player.dy = -3.3;
    if (player.dyRotate > -1.5)
    player.dyRotate -= 0.2
  }
});

window.addEventListener("keypress", function (event) {
  if ((event.key = " ")) {
    cancelAnimationFrame(animationId);
  }
});

//DECLARING BUTTONS' EVENT LISTENERS:

//STAYTING INITIAL SETTINGS FUNCTION:
function init() {
  return;
}

//DECLARING CLASSES:

/* Player class */
class Bird {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.radius = 14 * (canvas.width / canvas.height);
    this.dy = 0;
    this.angle = 0;
    this.frame = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.spriteWidth = 1390;
    this.spriteHeight = 1299;
    this.dxRotate = 1;
    this.dyRotate = 0;
  }

  draw() {
    // c.beginPath();
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.fillStyle = "red";
    // c.fill();
    c.save();
    c.translate(this.x, this.y);
    c.rotate(this.angle);
    c.drawImage(
      birdImage,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      - canvas.width / 38.4,
      - canvas.height / 18.74,
      canvas.width / 24.265,
      canvas.height / 12.4315
    );
    c.restore();
  }

  update() {
    /* Setting top and bottom boundaries for bird */
    if (this.y - this.radius < 0) {
      this.dy = 0;
    }
    if (this.y > canvas.height) {
      cancelAnimationFrame(animationId);
    }
    this.dy += 0.09;
    this.y += this.dy;

    /* Setting bird angle */
    if (gameFrame % 40 == 0 && this.dyRotate < 0) {
      this.dyRotate += 0.2
    }
    let theta = Math.atan2(this.dyRotate, this.dxRotate)
    this.angle = theta;

    /* Setting bird animation */
    if (gameFrame % 1 == 0) {
      this.frame ++;
      if (this.frame >= 16) this.frame = 0;
      if (this.frame == 3 || this.frame == 7 || this.frame == 11 || this.frame == 15) {
        this.frameX = 0;
      } else {
        this.frameX++;
      }
      if (this.frame < 3) this.frameY = 0;
      else if (this.frame < 7) this.frameY = 1;
      else if (this.frame < 11) this.frameY = 2;
      else if (this.frane < 15) this.frameY = 3;
      else this.frameY = 0;
    }
  }
}

/* Calling player class */
let player = new Bird();

/* Tubes class */
class Obstacles {
  constructor(x, y, height, imageName) {
    this.x = x;
    this.y = y;
    this.width = canvas.width / 14;
    this.height = height;
    this.dx = 1.8;
    this.imageNameTop = null;
    this.imageNameBottom = null;
    this.imageName = imageName;
  }

  draw() {
    c.drawImage(
      this.imageName,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update() {
    this.x -= this.dx;
  }
}

/* Calling tubes class */
let upperTubesArray = [];
let lowerTubesArray = [];
let x;
for (let i = 7; i <= 15; i += 2) {

  x = (Math.trunc(Math.random() * 4) + 1);
  let height = (x * canvas.height) / 6;

  if (x == 1) {
      this.imageNameTop = shortTrunkImage;
      this.imageNameBottom = largeTrunkImage;
  }
  if (x == 2) {
      this.imageNameTop = mediumTrunkImage;
      this.imageNameBottom = largeTrunkImage;
  }
  if (x == 3) {
      this.imageNameTop = largeTrunkImage;
      this.imageNameBottom = mediumTrunkImage;
  }
  if (x == 4) {
      this.imageNameTop = largeTrunkImage;
      this.imageNameBottom = shortTrunkImage;
  }

  let heightTwo = (5 * canvas.height) / 6 - height;
  upperTubesArray.push(new Obstacles((i * canvas.width) / 7, -40, height, imageNameTop));
  lowerTubesArray.push(new Obstacles((i * canvas.width) / 7, canvas.height + 40, -heightTwo, imageNameBottom));
}

/* Clouds class */
class Clouds {
  constructor(x, y, xTwo, yTwo, xThree, yThree) {
    this.spriteWidth = 800;
    this.spriteHeight = 315;
    this.x = x;
    this.y = y;
    this.xTwo = xTwo;
    this.yTwo = yTwo;
    this.xThree = xThree;
    this.yThree = yThree;
    this.dx = Math.random() * 3 + 2;
  }

  draw() {
    c.drawImage(
      cloudImage,
      0,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.spriteWidth / 6,
      this.spriteHeight / 6
    );
    c.drawImage(
      cloudImage,
      0,
      this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.xTwo,
      this.yTwo,
      this.spriteWidth / 6,
      this.spriteHeight / 6
    );
    c.drawImage(
      cloudImage,
      0,
      2 * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.xThree,
      this.yThree,
      this.spriteWidth / 6,
      this.spriteHeight / 6
    );
  }

  update() {
    this.x -= this.dx;
    this.xTwo -= 1.3 * this.dx;
    this.xThree -= 1.6 * this.dx;
  }
}

/* Calling clouds */
let cloudsArray = [];
for (let i = 0; i < 3; i++) {
  let x = Math.random() * i * canvas.width + canvas.width;
  let y = Math.random() * i * (canvas.height - 315 / 6);
  let xTwo = Math.random() * i * canvas.width + canvas.width;
  let yTwo = Math.random() * i * (canvas.height - 315 / 6);
  let xThree = Math.random() * i * canvas.width + canvas.width;
  let yThree = Math.random() * i * (canvas.height - 315 / 6);
  cloudsArray.push(new Clouds(x, y, xTwo, yTwo, xThree, yThree));
}

//CALLING THE ANIMATION FUNCTION:
let animationId;
function animate() {
  animationId = requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  gameFrame++;

  /* Drawing clouds */
  if (cloudsArray.length < 3) {
    let x = Math.random() * canvas.width + canvas.width;
    let y = Math.random() * (canvas.height - 315 / 6);
    let xTwo = Math.random() * canvas.width + canvas.width;
    let yTwo = Math.random() * (canvas.height - 315 / 6);
    let xThree = Math.random() * canvas.width + canvas.width;
    let yThree = Math.random() * (canvas.height - 315 / 6);
    cloudsArray.push(new Clouds(x, y, xTwo, yTwo, xThree, yThree));
  }

  for (let i = 0; i < 3; i++) {
    cloudsArray[i].update();
    cloudsArray[i].draw();
  }

  if (
    cloudsArray[0].x + 400 / 3 < 0 &&
    cloudsArray[0].xTwo + 400 / 3 < 0 &&
    cloudsArray[0].xThree + 400 / 3 < 0
  ) {
    cloudsArray.splice(0, 1);
  }

  /* Drawing tubes */
  if (upperTubesArray.length < 5) {
    x = (Math.trunc(Math.random() * 4) + 1);
    let height = (x * canvas.height) / 6;

    if (x == 1) {
        this.imageNameTop = shortTrunkImage;
        this.imageNameBottom = largeTrunkImage;
    }
    if (x == 2) {
        this.imageNameTop = mediumTrunkImage;
        this.imageNameBottom = largeTrunkImage;
    }
    if (x == 3) {
        this.imageNameTop = largeTrunkImage;
        this.imageNameBottom = mediumTrunkImage;
    }
    if (x == 4) {
        this.imageNameTop = largeTrunkImage;
        this.imageNameBottom = shortTrunkImage;
    }

    let heightTwo = (5 * canvas.height) / 6 - height;
    upperTubesArray.push(new Obstacles((9 * canvas.width) / 7, -40, height, imageNameTop));
    lowerTubesArray.push(new Obstacles((9 * canvas.width) / 7, canvas.height + 40, -heightTwo, imageNameBottom));
  }

  /* Detecting contact */
  for (let i = 0; i < 5; i++) {
    if (
      (player.y + player.radius >
        lowerTubesArray[i].y + lowerTubesArray[i].height + 40 &&
        lowerTubesArray[i].x < canvas.width / 2 &&
        lowerTubesArray[i].x > canvas.width / 2 - lowerTubesArray[i].width) ||
      (player.y - player.radius <
        upperTubesArray[i].y + upperTubesArray[i].height - 40 &&
        lowerTubesArray[i].x < canvas.width / 2 &&
        lowerTubesArray[i].x > canvas.width / 2 - lowerTubesArray[i].width)
    ) {
      cancelAnimationFrame(animationId);
    }
    upperTubesArray[i].update();
    lowerTubesArray[i].update();
    upperTubesArray[i].draw();
    lowerTubesArray[i].draw();
  }

  /* Removing tubes that left screen */
  if (upperTubesArray[0].x + canvas.width / 7 < 0) {
    upperTubesArray.splice(0, 1);
    lowerTubesArray.splice(0, 1);
  }

  /* Drawing Plyaer */
  player.update();
  player.draw();
}

animate();
