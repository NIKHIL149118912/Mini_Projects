let gameSeq=[];
let userSeq=[];
let High_score=0;

let btns=["yellow","red","purple","green"];

let started=false;
let level=0;

let h2=document.querySelector("h2");
let HS=document.getElementById("HS");
HS.innerText=`Highest Score:${High_score}`;

document.addEventListener("keypress", function()
{
    if(started==false)
        {
            // console.log("Game Started");
           started=true; 
        levelUp();
        }
})

function levelUp()
{   
    userSeq=[];
    level++;
    h2.innerText=`level ${level}`;
    let randInd=Math.floor(Math.random()*3);// Generating a random index
    let randColor=btns[randInd];
    let randBtn=document.querySelector(`.${randColor}`);//choose random btn 
    gameSeq.push(randColor);
    gameFlash(randBtn);
}
function gameFlash(btn)
{

    btn.classList.add("flash"); // add btn flashing
    setTimeout(function (){
        btn.classList.remove("flash"); // remove btn flashing 
    },250);
}
function userFlash(btn)
{

    btn.classList.add("userflash"); // add btn flashing
    setTimeout(function (){
        btn.classList.remove("userflash"); // remove btn flashing 
    },250);
}

//fn to check the User's Answer 
function checkAns(idx)
{
    if(gameSeq[idx]==userSeq[idx])
    {
        if(userSeq.length == gameSeq.length)
        {
            setTimeout(levelUp,1000);

            if(High_score<gameSeq.length)
                {
                High_score=(gameSeq.length)+1;
                }
        }
       
    }
    else
    {
        h2.innerHTML=`Game Over! </br>Your Score was<b> ${level}</b> </br> Press Any key to Start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);

        HS.innerText=`Highest Score: ${High_score}`;
        reset();
    }
}

// fn to detect which btn is pressed by the user
function btnPress()
{
    let btn=this;// button that is pressed
    userFlash(btn);
    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns)
{
    btn.addEventListener("click",btnPress);
}

// fn to reset all the game components except Highest score
function reset()
{
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}
