//Declaring variables:
let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");

//Declaring starting conditions:
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Drawing:

//Rectangles:
// c.fillStyle = "rgb(0,255,255,0.3)";
// c.fillRect(100,100,100,100)
// c.fillStyle = "rgb(0,255,255,0.5)";
// c.fillRect(200,200,200,200)
// c.fillStyle = "rgb(0,255,255,0.7)";
// c.fillRect(400,400,400,400)

//Lines:
// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(50,500);
// c.lineTo(250,500);
// c.lineTo(50,300);
// c.strokeStyle = "red";
// c.stroke();

//Arcs:
// c.beginPath();
// c.arc(1000,800,30,0,Math.PI*2,false);
// c.strokeStyle = "green"
// c.stroke();

//Creating a bouncing circle:
// let x = Math.random() * innerWidth;
// let y = Math.random() * innerHeight;
// let dx = (Math.random() - 0.5) * 8;
// let dy = (Math.random() - 0.5) * 8;
// let radius = 30;
// function animate() {
//     requestAnimationFrame(animate)
//     c.clearRect(0,0,innerWidth,innerHeight);
//     c.beginPath();
//     c.arc(x,y,radius,0,Math.PI*2,false);
//     c.strokeStyle = "green"
//     c.stroke();
//     if (x + radius > innerWidth || x - radius < 0) {
//         dx = -dx
//     } ;

//     if (y + radius > innerHeight || y - radius < 0) {
//         dy = -dy
//     };

//     x += dx;
//     y += dy;
// }
// animate();


//Creating random colors and positions for circles:
// let rgbComponents = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"]
// let col;
// for(i=0; i<100000; i++) {
//     let r1, r2, r3, r4, r5, r6;
//     r1 = Math.floor(Math.random()*rgbComponents.length);
//     r2 = Math.floor(Math.random()*rgbComponents.length);
//     r3 = Math.floor(Math.random()*rgbComponents.length);
//     r4 = Math.floor(Math.random()*rgbComponents.length);
//     r5 = Math.floor(Math.random()*rgbComponents.length);
//     r6 = Math.floor(Math.random()*rgbComponents.length);
//     col = `#${rgbComponents[r1]}${rgbComponents[r2]}${rgbComponents[r3]}${rgbComponents[r4]}${rgbComponents[r5]}${rgbComponents[r6]}`;
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x,y,30,0,Math.PI*2,false);
//     c.strokeStyle = col;
//     c.stroke();
// }

//Creating multiple moving colored sized circles:
// function circle(x, y, dx, dy, radius, color) {
//   this.x = x;
//   this.y = y;
//   this.dx = dx;
//   this.dy = dy;
//   this.radius = radius;
//   this.color = color;

//   this.draw = function () {
//     c.beginPath();
//     c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//     c.strokeStyle = "green";
//     c.stroke();
//     c.fillStyle = this.color;
//     c.fill();
//   };

//   this.update = function () {
//     if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
//       this.dx = -this.dx;
//     }

//     if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
//       this.dy = -this.dy;
//     }

//     this.x += this.dx;
//     this.y += this.dy;

//     this.draw();
//   };
// }

// let circleArray = [];

// for (let i = 0; i < 1000; i++) {
//   let radius = Math.random() * 20;
//   let x = Math.random() * (innerWidth - radius * 2) + radius;
//   let y = Math.random() * (innerHeight - radius * 2) + radius;
//   let dx = (Math.random() - 0.5) * 2;
//   let dy = (Math.random() - 0.5) * 2;
  
//   let r1, r2, r3, r4, r5, r6;
//   let rgbComponents = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"]
//   r1 = Math.floor(Math.random()*rgbComponents.length);
//   r2 = Math.floor(Math.random()*rgbComponents.length);
//   r3 = Math.floor(Math.random()*rgbComponents.length);
//   r4 = Math.floor(Math.random()*rgbComponents.length);
//   r5 = Math.floor(Math.random()*rgbComponents.length);
//   r6 = Math.floor(Math.random()*rgbComponents.length);
//   let color = `#${rgbComponents[r1]}${rgbComponents[r2]}${rgbComponents[r3]}${rgbComponents[r4]}${rgbComponents[r5]}${rgbComponents[r6]}`;
//   circleArray.push(new circle(x, y, dx, dy, radius, color));
// }

// function animate() {
//   requestAnimationFrame(animate);
//   c.clearRect(0, 0, innerWidth, innerHeight);

//   for(var i = 0; i < circleArray.length; i++) {
//     circleArray[i].update();
//   }
// }

// animate();

//Animating mouse movements:
let mouse = {
  x: undefined,
  y: undefined
};

let maxRadius = 40;

let colorArray = [
  '#333B40',
  '#A3D9D9',
  '#F2EFE9',
  '#F2B5A7',
  '#D96459'
]

window.addEventListener('mousemove' , function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
})

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
})

function circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.dr = 1;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color
    c.fill();
  };

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    if (this.x - mouse.x < 50 && this.x - mouse.x > -50 && this.y - mouse.y < 50 && this.y - mouse.y > -50) {
      if(this.radius < maxRadius) {
      this.radius += this.dr;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= this.dr;
    }
    
    this.draw();
}
}
let circleArray = [];

for (let i = 0; i < 1000; i++) {
  let radius = Math.random() * 5 + 1;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let dx = (Math.random() - 0.5) * 0.5;
  let dy = (Math.random() - 0.5) * 0.5;
  circleArray.push(new circle(x, y, dx, dy, radius));
}

function init() {
  circleArray = [];
  for (let i = 0; i < 1000; i++) {
    let radius = Math.random() * 5 + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 1;
    let dy = (Math.random() - 0.5) * 1;
    circleArray.push(new circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for(var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
