//SELECTING CANVAS:
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

//DECLARING STARTING CONDITIONS:
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//DECLARING VARIABLES:

/* Selecting elements */
/* Selecting elements */


//DECLARING FUNCTIONS:

/* Reset function */
/* Reset function */

/* Functions for buttons */
/* Functions for buttons */

//DECLARING CANVAS EVENT LISTENERS:
window.addEventListener("resize", function () {
    init();
  });

//DECLARING BUTTONS' EVENT LISTENERS:

//STAYTING INITIAL SETTINGS FUNCTION:
function init() {
    return;
}


//CALLING THE ANIMATION FUNCTION:
let animationId;
function animate() {
  animationId = requestAnimationFrame(animate);
}

animate();