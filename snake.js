//Game Constants and variables
let inputDir={x:0,y:0};
let board=document.querySelector(".board");
let easy=document.querySelector("#easy");
let medium=document.querySelector("#medium");
let hard=document.querySelector("#hard");
    
 let speed=9;

 let score=0;
//  let highscore=0;
 let lastPaintTime=0;
 let snakeArray=[
    {x:13,y:15}
 ]
 let food= {x:2,y:9}

 //main(2);



//Game Functions

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime -lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
isCollide=(snake)=>{
    //agar tum khud se takra jaoo
    for(let i=1;i<snakeArray.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y=== snake[0].y){
           return true;
        }
        if((snake[0].x>=18||snake[0].x<=0)&& (snake[0].y>=18||snake[0].y<=18)){
             return true;
        }
    }

    return false;   
}
gameEngine=()=>{    
    //part 1 updating the snake  array

    if(isCollide(snakeArray)){
        inputDir={x:0,y:0};
        alert("Game Over. Press Any Key to play again!");
        snakeArray=[
            {x:13,y:15}
         ]
         score=0;
    }


    //If you have eaten the food,increment the score and regenerate the food
    if(snakeArray[0].y=== food.y&& snakeArray[0].x===food.x){
        score+=1;
        document.getElementById("score").innerHTML= "Score: "+ score;
        let a=2;
        let b=16;
        snakeArray.unshift({x:snakeArray[0].x + inputDir.x, y:snakeArray[0].y + inputDir.y});
        food={x: Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //Moving the snake
    for(let i=snakeArray.length-2;i>=0;i--){
        snakeArray[i+1]={...snakeArray[i]};
    }
    snakeArray[0].x+=inputDir.x;
    snakeArray[0].y+=inputDir.y;


    // part 2 display the snake and food
    board.innerHTML="";
    snakeArray.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        snakeElement.classList.add('snake-head');
        board.appendChild(snakeElement);

   
        foodElement=document.createElement('div');//creating a div
        foodElement.style.gridRowStart=food.y;//positioning it
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');//adding the class
        board.appendChild(foodElement);
    })

}



//Main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}//start the game
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x=1;
            inputDir.y=0;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x=-1;
            inputDir.y=0;
            break;
    
        default:
            alert("Please press correct keys");
            break;
    }
})
