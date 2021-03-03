//Declaring variables:
let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");

//Declaring starting conditions:
canvas.width = (2 * window.innerWidth) / 3;
canvas.height = (2 * window.innerHeight) / 3;

//Declaring variables:
let colorArray = [
    '#A6A6A6',
    '#737373',
    '#404040',
    '#262626',
    '#0D0D0D'
];

let bouncingCircleRadius = 10;
let bouncingCircleXSpeed = 3;
let bouncingCircleYSpeed = 3;
let bouncingCircleStartingPositions = [
    bouncingCircleRadius,
    canvas.width/2,
    canvas.width - bouncingCircleRadius
];

let animateCirclesRadius = 1;
let animatedCirclesXSpeed = 0.5;
let animatedCirclesYSpeed = 0.5;
let animatedCirclesNumber = 1000;

let spaceAboveCanvas = document.getElementById('space-top').offsetHeight;
let spaceLeftOfCanvas = (canvas.width / 4);
let spaceRightOfCanvas = (canvas.width / 4);

let mouse = {
    x: undefined,
    y: undefined
};

//Declaring event listeners:

window.addEventListener('mousemove' , function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function() {
    init();
})

//Creating handle generator:
function handleSet(x1, x2, y1, y2, xCenter, yCenter, radius, arcAngle) {
    this.radius = radius;
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    this.xCenter = xCenter;
    this.yCenter = yCenter;
    this.arcAngle = arcAngle;

    this.draw = function () {
        c.beginPath();
        c.moveTo(this.x1, this.y1);
        c.lineTo(this.x2, this.y1);
        c.stroke();
        c.beginPath();
        c.arc(this.xCenter, this.yCenter, this.radius ,-Math.atan(this.arcAngle), Math.atan(this.arcAngle), false);
        c.stroke();
        c.beginPath();
        c.moveTo(this.x2, this.y2);
        c.lineTo(this.x1, this.y2);
        c.stroke();
        c.beginPath();
        c.arc(this.xCenter, this.yCenter, this.radius, Math.PI - Math.atan(this.arcAngle), Math.PI + Math.atan(this.arcAngle), false);
        c.stroke();

        let rectX = (3 * this.x1 + this.x2) / 4;
        let rectY = this.y1;
        let rectX2 = (this.x2 - this.x1) / 2;
        let rectY2 = this.y2 - this.y1;

        c.fillStyle = colorArray[4];
        c.fillRect(rectX, rectY, rectX2, rectY2);
    }

    this.update = function () {
        this.draw();

        if(mouse.x > (innerWidth-canvas.width) / 2 && mouse.x < (innerWidth+canvas.width) / 2 && mouse.y > spaceAboveCanvas && mouse.y < spaceAboveCanvas + canvas.height) { 

            this.x1 = mouse.x - radius - (innerWidth-canvas.width) / 2;
            this.x2 = mouse.x + radius - (innerWidth-canvas.width) / 2;
            this.xCenter = mouse.x - (innerWidth-canvas.width) / 2;
            this.draw();
        }

        else {
            this.x1 = x1;
            this.x2 = x2;
            this.xCenter = xCenter;
            this.draw();
        }

    }
 
}


//Setting the game handle:
let originX1Handle = (37 * canvas.width) / 80;
let originX2Handle = (43 * canvas.width) / 80;
let originY1Handle = (35 * canvas.height) / 38;
let originY2Handle = (59 * canvas.height) / 62;
let originXCenterHandle = canvas.width / 2;
let originYCenterHandle = (368 * canvas.height) / 393;
let originRadiusHandle = (3 * canvas.width) / 80;
let originArcAngleHandle = (720 * canvas.height) / (1769 * canvas.width);

let handleStart = new handleSet(originX1Handle, originX2Handle, originY1Handle, originY2Handle, originXCenterHandle, originYCenterHandle, originRadiusHandle, originArcAngleHandle);


//Creating circle generator:
function circleSet(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  
    this.draw = function () {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
    };
  
    this.update = function () {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        };

        if (this.radius < bouncingCircleRadius) {
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.dy = -this.dy;
            };
        }
        else if (this.radius == bouncingCircleRadius) {
            if (this.y + this.radius > originY1Handle && this.x <= mouse.x - spaceLeftOfCanvas + (originX2Handle - originX1Handle) / 2 && this.x >= mouse.x - spaceLeftOfCanvas - (originX2Handle - originX1Handle) / 2 && this.dy 
            > 0 || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }
            else if (this.y + this.radius > originY2Handle) {
                this.dy = 0;
                this.dx = 0;
                this.x = -this.x;
                this.y = -this.y;
            }
        };
    
        this.x += this.dx;
        this.y += this.dy;
        
        this.draw();
    } 
};

//Setting the circle:
let circleOne = new circleSet(bouncingCircleStartingPositions[Math.floor(Math.random() * (bouncingCircleStartingPositions.length - 1))], bouncingCircleRadius, bouncingCircleXSpeed, bouncingCircleYSpeed, bouncingCircleRadius, colorArray[4]);


//Setting and randomizing circles for background:
let circleArray = [];
for (let i = 0; i < animatedCirclesNumber; i++) {
  let ranRadius = Math.random() * animateCirclesRadius + 1;
  let ranX = Math.random() * (canvas.width -  ranRadius * 2) +  ranRadius;
  let ranY = Math.random() * (canvas.height -  ranRadius * 2) +  ranRadius;
  let ranDx = (Math.random() - 0.5) * animatedCirclesXSpeed;
  let ranDy = (Math.random() - 0.5) * animatedCirclesYSpeed;
  let ranColor = colorArray[Math.floor(Math.random() * colorArray.length) + 1];
  circleArray.push(new circleSet(ranX, ranY, ranDx, ranDy, ranRadius, ranColor));
};

//Stayting initial settings function:
function init() {
    canvas.width = (2 * window.innerWidth) / 3;
    canvas.height = (2 * window.innerHeight) / 3;

    circleArray = [];
    for (let i = 0; i < animatedCirclesNumber; i++) {
        let ranRadius = Math.random() * animateCirclesRadius + 1;
        let ranX = Math.random() * (canvas.width -  ranRadius * 2) +  ranRadius;
        let ranY = Math.random() * (canvas.height -  ranRadius * 2) +  ranRadius;
        let ranDx = (Math.random() - 0.5) * animatedCirclesXSpeed;
        let ranDy = (Math.random() - 0.5) * animatedCirclesYSpeed;
        let ranColor = colorArray[Math.floor(Math.random() * colorArray.length) + 1];
        circleArray.push(new circleSet(ranX, ranY, ranDx, ranDy, ranRadius, ranColor));
    };

    spaceAboveCanvas = document.getElementById('space-top').offsetHeight;
    spaceLeftOfCanvas = (canvas.width / 4);
    spaceRightOfCanvas = (canvas.width / 4);

    originX1Handle = (37 * canvas.width) / 80;
    originX2Handle = (43 * canvas.width) / 80;
    originY1Handle = (35 * canvas.height) / 38;
    originY2Handle = (59 * canvas.height) / 62;
    originXCenterHandle = canvas.width / 2;
    originYCenterHandle = (368 * canvas.height) / 393;
    originRadiusHandle = (3 * canvas.width) / 80;
    originArcAngleHandle = (720 * canvas.height) / (1769 * canvas.width);
    handleStart = new handleSet(originX1Handle, originX2Handle, originY1Handle, originY2Handle, originXCenterHandle, originYCenterHandle, originRadiusHandle, originArcAngleHandle);
}

//Creating the animation function:
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    c.fillStyle = colorArray[1];
    c.fillRect(0,0,canvas.width,canvas.height);
    

    for(let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
        
    circleOne.update();
    handleStart.update();
}

animate();
// //innerWidth = 1920 , innerHeight = 937;