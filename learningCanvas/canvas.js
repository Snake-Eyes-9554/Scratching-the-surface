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

//Creating random colors and positions for circles:
// let rgbComponents = ["start",0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"]
// let col;
// for(i=0; i<100000; i++) {
//     let r1, r2, r3, r4, r5, r6;
//     r1 = Math.trunc(Math.random()*16)+1;
//     r2 = Math.trunc(Math.random()*16)+1;
//     r3 = Math.trunc(Math.random()*16)+1;
//     r4 = Math.trunc(Math.random()*16)+1;
//     r5 = Math.trunc(Math.random()*16)+1;
//     r6 = Math.trunc(Math.random()*16)+1;
//     col = `#${rgbComponents[r1]}${rgbComponents[r2]}${rgbComponents[r3]}${rgbComponents[r4]}${rgbComponents[r5]}${rgbComponents[r6]}`;
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x,y,30,0,Math.PI*2,false);
//     c.strokeStyle = col;
//     c.stroke();
// }
function circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "green";
    c.stroke();
    c.fillStyle = this.color;
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

    this.draw();
  };
}

let circleArray = [];

for (let i = 0; i < 1000; i++) {
  let radius = Math.random() * 20;
  let x = Math.random() * (innerWidth - radius * 2) + radius;
  let y = Math.random() * (innerHeight - radius * 2) + radius;
  let dx = (Math.random() - 0.5) * 2;
  let dy = (Math.random() - 0.5) * 2;
  
  let r1, r2, r3, r4, r5, r6;
  let rgbComponents = ["start",0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"]
  r1 = Math.trunc(Math.random()*16)+1;
  r2 = Math.trunc(Math.random()*16)+1;
  r3 = Math.trunc(Math.random()*16)+1;
  r4 = Math.trunc(Math.random()*16)+1;
  r5 = Math.trunc(Math.random()*16)+1;
  r6 = Math.trunc(Math.random()*16)+1;
  let color = `#${rgbComponents[r1]}${rgbComponents[r2]}${rgbComponents[r3]}${rgbComponents[r4]}${rgbComponents[r5]}${rgbComponents[r6]}`;
  circleArray.push(new circle(x, y, dx, dy, radius, color));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for(var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();

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
