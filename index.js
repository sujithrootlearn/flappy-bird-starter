let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';

// load all images
let bg = new Image();
bg.src = './images/bg.png';

let fg = new Image();
fg.src = './images/fg.png';

let bird = new Image();
bird.src = './images/bird.png'

let pipeNorth = new Image();
pipeNorth.src = './images/pipeNorth.png'

let pipeSouth = new Image();
pipeSouth.src = './images/pipeSouth.png'

let intervalId = 0;
let isGameOver = false;


// basic animation template
function draw(){

    if (isGameOver) {
        cancelAnimationFrame(intervalId)
        return;
    }
    intervalId = requestAnimationFrame(draw)
}

window.addEventListener('load', () => {
    draw()
})
