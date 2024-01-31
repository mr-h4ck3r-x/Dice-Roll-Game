//player Sections
const player_1 = document.querySelector('.player_1');
const player_2 = document.querySelector('.player_2');

//rolling the dice
const rollBtn = document.querySelector('.btn--roll');

//players score elements
let player1Score = document.querySelector('#p1Score');
let player2Score = document.querySelector('#p2Score');

//displaying the total number of wins of each user
let p1CurrentScore = document.getElementById('p1CurrentScore');
let p2CurrentScore = document.getElementById('p2CurrentScore');

//total wins storing in a variables
p1Wins = 0;
p2Wins = 0;

//targetscores
let player1Target = 0;
let p1Chance = 5;
let player2Target = 0;
let p2Chance = 5;


//total number of chances of each user
let p1TChances = document.querySelector("#player1chances");
p1TChances.innerHTML = `RollsLeft:${p1Chance}`;
let p2TChances = document.querySelector('#player2chances');
p2TChances.innerHTML = `RollsLeft:${p2Chance}`;

//player turn
let turn = 'player1';

//gameover
let gameOver = false;

//players Text
const player1Text = document.getElementById('p1Name');
const player2Text = document.getElementById('p2Name');
player1Text.classList.add('playerturn');//default User

//Dice Img
const diceImg = document.querySelector('.dice');
//hiding the dice by default
diceImg.classList.add('.hidden');

//rollbtn Script
function rollingDice(){
    if(!gameOver && p1Chance != 0 || p2Chance !=0)
    {
        const num = genarateNumbre();
        diceImg.src = `dice-${num}.png`;
        playerTurn(num);
    }
}
//click event Listener
rollBtn.addEventListener('click', rollingDice);

//genarating random Number 
function genarateNumbre(){
    return Math.trunc(Math.random()*6)+1;
}

function playerTurn(num){
    if(turn == 'player1'){
        player1Target += num;
        if(player1Target <=25){
            player1Score.innerHTML = player1Target;
        }
        p1Chance -=1;
        p1TChances.innerHTML = `RollsLeft:${p1Chance}`;
        player2Text.classList.add('playerturn');
        player1Text.classList.remove('playerturn');
    }
    if(turn == 'player2'){
        player2Target += num;
        if(player2Target <=25){
            player2Score.innerHTML = player2Target;
        }
        p2Chance -=1;
        p2TChances.innerHTML = `Rollsleft:${p2Chance}`;
        player2Text.classList.remove('playerturn');
        player1Text.classList.add('playerturn');
    }
    turn = turn==='player1'?'player2':'player1';
    if(player1Score.innerHTML == 25||player2Score.innerHTML == 25||p1Chance ==0 ||p2Chance ==0){
        gameOver = true;
    }
    checkWin();
}

function playAgain(){
    player1Score.innerHTML = 0;
    player2Score.innerHTML = 0;
    player1Target = 0; 
    player2Target = 0;
    gameOver = false;
    p1Chance = 5;
    p2Chance = 5;
    p1TChances.innerHTML = 'RollsLeft:5';
    p2TChances.innerHTML = 'RollsLeft:5';
}

function restartGame(){
    location.reload();
}

let player1_name = 'player 1';
let player2_name = 'player 2';
// Function to change the player name
function editNames() { 
    player1_name = prompt("Change Player1 name");
    player2_name = prompt("Change player2 name");

    // console.log( player1_name)

    if(player1_name == null || player2_name == null ||player1_name === "" || player2_name ==="" ){
        
            player1_name = 'player 1';
            player2_name = 'player 2';  
    }
    document.getElementById('p1Name').innerHTML=player1_name;
    document.getElementById('p2Name').innerHTML=player2_name;
}


function checkWin() {
    if (p1Chance == 0 && p2Chance == 0) {
        let winner = null;

        if (player1Score.innerHTML > player2Score.innerHTML) {
            p1Wins += 1;
            p1CurrentScore.textContent = p1Wins;
            winner = player1_name;
        } else if (player2Score.innerHTML > player1Score.innerHTML) {
            p2Wins += 1;
            p2CurrentScore.textContent = p2Wins;
            winner = player2_name;
        }

        if (winner) {
            // Display custom popup
            showWinnerPopup(`${winner} is the winner 🏆`);
            
        } else {
            // Display tie popup
            showWinnerPopup("both are got same It's a tie 👎");
        }
    }
}

let audio = new Audio('crowd-cheer-ii-6263.mp3');

function playWinnerSound() {
    audio.play();
}

function stopWinnerSound() {
    audio.pause();
    audio.currentTime = 0;
}

function showWinnerPopup(message) {

    const popupContainer = document.createElement('div');
    popupContainer.classList.add('winner-popup');

    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');
    popupContent.textContent = message;

    const winnerGif = document.createElement('img');
    winnerGif.src = 'award.gif'; // Replace with the path to your animated GIF
    winnerGif.alt = 'Winner Animation';
    winnerGif.classList.add('winner-gif');
  
    const brtag = document.createElement('br');


    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(popupContainer);
        stopWinnerSound();
    });

    popupContent.appendChild(brtag);
    popupContent.appendChild(winnerGif);
    popupContent.appendChild(brtag);
    popupContent.appendChild(closeButton);
    popupContainer.appendChild(popupContent);
    document.body.appendChild(popupContainer);

    // Start the winner sound
    playWinnerSound();
}


function playSound() {
    var audio = new Audio('dice-rolling-sound.mp3');
    audio.play();
  }