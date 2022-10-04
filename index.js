let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let pipeGap = 60, pipeX = 200, pipeY = 0, birdX=50, birdY = 50; keyPress = false; fgX = 0; score = 0;
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
let pipes = [ {x: 300, y: 0 } ]

let birdExtreemRightX = birdX+bird.width;
let birdExtreemLeftX = birdX;
let birdTopMiddleX = birdX+bird.width/2;
let birdBottomMiddleX = birdTopMiddleX+bird.height;


// basic animation template
function draw(){
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(bird, birdX, birdY);

    keyPress ? birdY=birdY-1 :birdY=birdY+1;   
    

    for(let i=0; i<pipes.length; i++){
        ctx.drawImage(pipeNorth, pipes[i].x, pipes[i].y);
        ctx.drawImage(pipeSouth, pipes[i].x, pipes[i].y+pipeNorth.height+pipeGap);        
        
        pipes[i].x = pipes[i].x -1;

        if(pipes[i].x+pipeNorth.width == 0){
            pipes[i].x = canvas.width;
            pipes[i].y = pipes[0].y = Math.floor(Math.random()*(1-(-125))-125);
        }
        if(pipes[i].x == 0){                        
            score = score+1;
        }
    }
     
    ctx.drawImage(fg, fgX, canvas.height-100);

    ctx.fillStyle = "white";
    ctx.font = "13px Arial";
    ctx.fillText(`SCORE=${score}`, canvas.width-87,35);
        
    
    if(birdY+bird.height>canvas.height-100){
        isGameOver = true;
    }
    if (isGameOver) {
        ctx.fillStyle = "black";
        ctx.font = "14px Arial";
        ctx.fillText("GAME OVER", canvas.width-90,17);       
        cancelAnimationFrame(intervalId)
    }
    else {
        intervalId = requestAnimationFrame(draw)        
    }

    //pipe collision logic
    if(birdExtreemRightX-5 > pipes[0].x && birdY+4 < pipeNorth.height+pipes[0].y && birdExtreemLeftX < pipes[0].x + pipeNorth.width ){
        isGameOver = true;
    }else if(birdExtreemRightX-5 > pipes[0].x && birdY+bird.height > pipeNorth.height+pipeGap+pipes[0].y && birdExtreemLeftX+10 < pipes[0].x + pipeNorth.width ){
        isGameOver = true;
    }    
}


window.addEventListener('load', () => {
    draw();
    window.addEventListener('keydown',(evt)=>{
        if(evt.code==='ArrowUp'){
            keyPress=true;
        }
        
    });
    window.addEventListener('keyup',(evt)=>{
        if(evt.code==='ArrowUp'){
            keyPress=false;
        }
    })

})
