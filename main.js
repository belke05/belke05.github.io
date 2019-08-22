import Player from "./JScode/model/player.js";
import Grid from "./JScode/model/grid.js";
import Target from "./JScode/model/target.js";
import Obstacle from "./JScode/model/obstacle.js";
import Countdown from "./JScode/view/countdown.js";

// ------------------ global variables
let widthObjects = 60;
let heightObjects = 60;
let gridWidth = widthObjects * 10;
// this way we can say we want a 10 by 10 grid for our player to move in
let gridHeight = heightObjects * 10;
let parent_container = document.getElementById("parent_container");
let intervalId; // needs to be deleted on each update
const failAudio = new Audio("./music/failed.mp3");
const nextLevelAudio = new Audio("./music/good.mp3");
const winAudio = new Audio("./music/levelCompleted.mp3");
let playElement;
let currentLevel = 1;
// margin from obstacle
// otherwise it will register things for hit that dont seem to be hit on screen
let timeLimitPerLevel = [20];
let firstPress = true;
let ArrayForObstacles = {
  level1: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]
  // level2: [
  //   [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  //   [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  //   [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  //   [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  //   [0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 1, 1, 1, 0, 0, 0, 1, 0, 0],
  //   [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  // ],
  // level3: [
  //   [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  //   [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  //   [0, 1, 1, 0, 0, 1, 0, 0, 0, 0],
  //   [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  //   [0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  //   [0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
  //   [0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
  //   [0, 0, 1, 1, 0, 1, 0, 1, 0, 0],
  //   [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  // ],
  // level4: [
  //   [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  //   [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  //   [0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
  //   [0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
  //   [0, 1, 1, 0, 1, 1, 0, 1, 0, 0],
  //   [0, 1, 1, 0, 0, 0, 0, 1, 0, 0],
  //   [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  //   [0, 0, 0, 1, 0, 1, 0, 1, 1, 0],
  //   [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  // ],
  // level5: [
  //   [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  //   [0, 1, 0, 1, 1, 0, 0, 1, 0, 1],
  //   [0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  //   [0, 1, 0, 0, 0, 1, 0, 1, 0, 0],
  //   [0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  //   [0, 0, 1, 0, 0, 0, 1, 0, 1, 0],
  //   [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  //   [0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
  //   [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
  //   [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
  // ],
  // level6: [
  //   [0, 1, 0, 0, 0, 1, 0, 1, 0, 0],
  //   [0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
  //   [0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
  //   [0, 1, 0, 0, 0, 1, 0, 1, 0, 0],
  //   [0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  //   [0, 0, 1, 0, 0, 0, 0, 1, 1, 0],
  //   [1, 0, 1, 0, 0, 1, 1, 1, 0, 0],
  //   [0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
  //   [0, 0, 0, 0, 0, 1, 1, 0, 0, 1],
  //   [0, 0, 1, 0, 0, 1, 0, 1, 0, 0]
  // ]
};
// ------------------

// -------------------create instance of classes we will be using
let board = new Grid(gridWidth, gridHeight, "#f3f0ad", 100);
// par for grid are defining the width / height / background of our div
// player arguments will define the width and height of the div our image is in
let player = new Player(
  widthObjects,
  heightObjects,
  board.boardX,
  board.boardY
);
let target = new Target(widthObjects, heightObjects, gridWidth, gridHeight);
let obstacle = new Obstacle(widthObjects, heightObjects);
let countdown = new Countdown(timeLimitPerLevel[0]);
let obstacles;
//----------------

// --------- 1 we need to load the grid the obstacles, the player and the target

importBoard();
importPlayerAndTargetOnBoard();
// put our countdown inside of our game
countdown.createBar();

// --------- remove the player on every keystroke  --------//
// we set an interval id --> we can del it at make new one every arrow push
window.onkeydown = function(e) {
  // we can only move if we have a player

  firstPress ? countdown.countdownstart() : console.log("no restarting");
  if (document.getElementById("player")) {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      firstPress = false;
      player.direction = e.key;
      clearInterval(intervalId); // we delete our previous interval
      intervalId = setInterval(() => {
        // every x amount of time we want to check if the player hit an obstacle and update it's location
        player.updatePlayer(); // we update the location with this function and happens when within boarders
        if (checkForLocationMatch() || countdown.checkIftimeLeft()) {
          // code to exectue if player overlaps with an obstacle or if the time runs out
          obstacleHitAboard();
          // to stop this function from infinite looping
        } else {
          //console.log("avoided");
          if (
            /*checkIfTargetReached()*/ gridWidth - player.x <
              widthObjects * 1.5 &&
            gridHeight - player.y < heightObjects * 1.5
          ) {
            console.log("target reached");
            // this means we reached the target without crashing next level
            // can be loaded
            targetReachedNextLevel();
          } else {
            // console.log("not there yet");
          }
        }
      }, 1);
    }
  }
  console.log("just hit try again!");
};

// every x amount of time we want to check if the player hit an obstacle

function checkForLocationMatch() {
  // we need to check for each of the obstacles if it overlaps with the players current position
  let check = false;
  obstacles.forEach(obstacle => {
    playElement = document.getElementById("player");
    if (
      Math.abs(obstacle.offsetLeft - playElement.offsetLeft) <
        widthObjects - 18 &&
      Math.abs(obstacle.offsetTop - playElement.offsetTop) < heightObjects - 18
    ) {
      check = true;
    }
  });
  return check;
}

// function to fire when a target has been hit
// button shut appear in the middle to replay
function obstacleHitAboard() {
  // we dont want the game to be playing anymore
  // clearInterval(gamePlayingIntervalID);
  clearInterval(intervalId);
  //window.alert("you lost the game");
  // this will access the game_grid
  let gridToRemove = parent_container.lastChild;
  // this will remove our grid
  parent_container.removeChild(gridToRemove);
  // we put in a display with a replay button
  let failMsgBtn = createFailMsgBtn();
  parent_container.appendChild(failMsgBtn);
  console.log("you lost");
  // play fail message
  // playing our fail message
  failAudio.play();
  replay_btn.onclick = () => {
    resetGame(failMsgBtn);
  };
}

// function to reset the game when try again is clicked
function resetGame(elementToRemove) {
  parent_container.removeChild(elementToRemove);
  currentLevel = 1;
  clearInterval(intervalId);
  player.x = 0;
  player.y = 0;
  player.movementSpeed = 0.8;
  importBoard();
  importPlayerAndTargetOnBoard();
  firstPress = true;
  countdown.createBar();
}

// function to fire when we reached the target
// and managed to hit no obstacles

function targetReachedNextLevel() {
  // we dont want the game to be playing anymore
  clearInterval(intervalId);
  // this will access the game_grid
  let gridToRemove = parent_container.lastChild;
  // this will remove our grid
  parent_container.removeChild(gridToRemove);
  // playing our fail message
  nextLevelAudio.play();
  // same as the reset but now we go one level higher instead of resetting to one
  console.log("you won");
  clearInterval(intervalId);
  // reset the player position
  player.x = 0;
  player.y = 0;
  // increase the movement speed to make it harder
  player.movementSpeed += 0.3;
  // will create a board based on the next level
  // change the timelimit on the countdown
  // defined on top
  countdown.timeLimit = timeLimitPerLevel[currentLevel - 1];
  console.log(countdown.timeLimit);
  // if there are no levels left
  if (!ArrayForObstacles["level" + currentLevel]) {
    gameWon();
  } else {
    importBoard();
    importPlayerAndTargetOnBoard();
    // this will reset the timer and make sure that when we press an arrow it starts
    countdown.createBar();
    firstPress = true;
  }
}

// -------------------- functions to create html elements

// if we want to insert a board inside our game
function importBoard() {
  let grid = board.createGrid(); // will return our board element
  // let surface_element = document.createElement('div')
  // surface_element.style.position = "relative"
  // surface_element.style
  obstacles = obstacle.creationBasedOnArray(
    ArrayForObstacles["level" + currentLevel]
  );
  parent_container.appendChild(grid); // assign the location in our dom we want to put it in
}

function importPlayerAndTargetOnBoard() {
  let playing_board = document.getElementById("game_container");
  let ourPlayer = player.creationPlayer(); // returns div and image we put inside our board
  playing_board.appendChild(ourPlayer);
  let ourTarget = target.creationTarget(); // we put the target somewhere in the grid
  playing_board.appendChild(ourTarget);
  console.log("level" + currentLevel);

  currentLevel++;
  // this gives us the array of obstacles we want to render in the board
  obstacles.forEach(rock => {
    playing_board.appendChild(rock);
  });
  // we created an array of obstacles each with a different location based
  // we need to append each of them into our board<wqq<qx
}

function createFailMsgBtn() {
  //we want a div to be put in the middle
  let buttonAndFailDiv = document.createElement("div");
  buttonAndFailDiv.id = "failmsgbtn";
  // optional
  // parent_container.parentElement.style.gridTemplate = "none";
  buttonAndFailDiv.innerHTML = `<p>you made it to level ${currentLevel -
    1}</p><button id="replay_btn">Try Again</button>`;
  return buttonAndFailDiv;
}

function gameWon() {
  let winMsg = document.createElement("div");
  winMsg.id = "winMsg";
  winMsg.innerHTML = `<p id="winMsg">The galaxy is gratefull!</p>`;
  parent_container.appendChild(winMsg);
  winAudio.play();
  setTimeout(gotobonus, 5000);
}

function gotobonus() {
  window.location.href = "bonus.html";
}
