// Iteration 1: Declare variables required for this game

let gameBody=document.getElementById("game-body");
let $lives = document.getElementById("lives");
let seconds = document.getElementById("timer").textContent;
let zombieId = 0;
const imgs = [
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png"
]

// Iteration 1.2: Add shotgun sound
const shotgunAudio = new Audio("./assets/shotgun.wav");
shotgunAudio.volume = 0.5;

gameBody.onclick=()=>{
    shotgunAudio.pause();
    shotgunAudio.currentTime=0;
    shotgunAudio.play();
}

// Iteration 1.3: Add background sound

let backgroundSound = new Audio("./assets/bgm.mp3");
backgroundSound.play();
backgroundSound.loop = true;

// Iteration 1.4: Add lives

let lives = 4;

// Iteration 2: Write a function to make a zombie

function makeAZombie(zombieId){

    let zombieImg=document.createElement("img");
    let randomIndex=Math.floor(Math.random()*6);
    zombieImg.src=`./assets/${imgs[randomIndex]}`
    zombieImg.setAttribute("class","zombie-image");
    zombieImg.setAttribute("id",`${zombieId}`);
    document.body.append(zombieImg);
    let randomLeftProp=generateRandomInt(20,80);
    zombieImg.style.left=`${randomLeftProp}vw`
    zombieImg.style.animationDuration = `${generateRandomInt(4,6)}s`
    zombieImg.onclick=()=>{
        zombieDestruct(zombieImg);
    }
    zombieId++;
}

makeAZombie(0)

// Iteration 3: Write a function to check if the player missed a zombie

// Initialize a counter for zombie collisions with the top
let zombieCollisions = 0;

// Function to check if a zombie collides with the top of the game area
function checkCollision(zombie) {
    // Get the top position of the zombie relative to the viewport
    let zombieTop = zombie.getBoundingClientRect().top;
    
    // Check if the top of the zombie is above or at the top of the game area
    if (zombieTop <= 0) {
        // Increment the counter for zombie collisions with the top
        zombieCollisions++;
        // Deduct one life
        lives--;
        // Return true to indicate a collision
        return true;
    } else {
        // Return false if no collision
        return false;
    }
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed

function zombieDestruct(zombie){
    zombie.style.display="none";
    zombieId++;
    makeAZombie(zombieId);

}

// Iteration 5: Creating timer

let timer=setInterval(()=>{
    seconds--;
    document.getElementById("timer").textContent=seconds;
    let zombie=document.getElementById(zombieId);

    if(checkCollision(zombie)){
        //zombieDestruct(zombie);
        if( lives === 0){
            clearInterval(timer);
            location.href="game-over.html";
            
        }
        }
        if (seconds === 0) {
            clearInterval(timer);
            location.href = "win.html";
        }
},200);

// Iteration 6: Write a code to start the game by calling the first zombie

makeAZombie(zombieId);

// Iteration 7: Write the helper function to get random integer

function generateRandomInt(min,max){
    min=Math.ceil(min);
    max=Math.floor(max);

    let randomNo = Math.floor(Math.random()*(max-min)+min);
    return randomNo;
}