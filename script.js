/* game status element */
const statusDisplay = document.querySelector(".game-status");

/* fadeout loader after 3 seconds */
setTimeout(function () {
  document.querySelector(".loader").style.animation = "fadeout 2s linear";
}, 3000);

/* remove loader after 5 seconds */
setTimeout(function () {
  let loaderWrapper = document.querySelector(".loader-wrapper");
  loaderWrapper.parentElement.removeChild(loaderWrapper);
}, 5000);

/* a clock, so you don't lose all sense of time playing this amazing game */
setInterval(function () {
  var d = new Date();
  var t = d.toLocaleTimeString();
  document.getElementById("clock").innerHTML = t;
}, 1000);

// variables

/* pause the game in case of an end scenario */
let gameActive = true;

/* current player, so you know whos turn it is */
let currentPlayer = "X";

/* current game state, form of empty strings in an array
 will track played cells and validate the game state later */
let gameState = ["", "", "", "", "", "", "", "", ""];

/* declared some messages as functions to display to the user during the game. */
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

/* the inital message to let the players know whose turn it is */
statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
  /* update the internal game state to reflect the played move, 
    and update the user interface to reflect the played move
    */
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

/* game ongoing, no one has won so changing the current player */
function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  /* checking if there are any values in the game state array 
  that are still not populated with a player sign */
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }
  handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
  /* clicked html element in a variable saved for easier further use */
  const clickedCell = clickedCellEvent.target;

  /* get the 'data-cell-index' attribute from the clicked cell to identify where that cell is in the grid */
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  /* check whether the call has already been played, or if the game is paused. 
    If either of those is true it will ignore the click */
  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }
  /* If everything is in order it will proceed with the game flow*/
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

/* add event listeners to the game cells, and a restart button */
document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".game-restart")
  .addEventListener("click", handleRestartGame);


