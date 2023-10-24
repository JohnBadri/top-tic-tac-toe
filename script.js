const myBoard = (function gameBoard() {
  const board = ["", "", "", "", "", "", "", "", ""];

  function getBoard() {
    return board;
  }

  function setCell(index, value) {
    if (index >= 0 && index < 9) {
      board[index] = value;
    }
  }

  return {
    getBoard,
    setCell,
  };
})();

function win() {
  const scenario = myBoard.getBoard();
  let decideWin = false;

  const winScenario = [
    [scenario[0], scenario[1], scenario[2]],
    [scenario[3], scenario[4], scenario[5]],
    [scenario[6], scenario[7], scenario[8]],
    [scenario[0], scenario[3], scenario[6]],
    [scenario[1], scenario[4], scenario[7]],
    [scenario[2], scenario[5], scenario[8]],
    [scenario[0], scenario[4], scenario[8]],
    [scenario[2], scenario[4], scenario[6]],
  ];

  winScenario.forEach((innerArray) => {
    if (innerArray[0] !== "") {
      const isWin = innerArray.every((element) => element === innerArray[0]);
      if (isWin) {
        decideWin = true;
      }
    }
  });

  return decideWin;
}

function createPlayer(name, marker) {
  let marking = 0;
  const getMarkingCount = () => marking;
  const addMarkingCount = () => marking++;
  return {
    name,
    marker,
    getMarkingCount,
    addMarkingCount,
  };
}

function addMarkingToCell(cell, player) {
  cell.textContent = player === "John" ? "✗" : "O";
}

function updateMarkingCount(playerObj) {
  playerObj.addMarkingCount();
}

function handleCellClick(event) {
  const target = event.target;
  const cellId = target.getAttribute("id");
  const cellElement = document.getElementById(cellId);
  let placementCount = john.getMarkingCount() + computerAI.getMarkingCount();
  if (target.classList.contains("box") && !target.classList.contains("value")) {
    const currentPlayer =
      john.getMarkingCount() === computerAI.getMarkingCount() ? "John" : "AI";
    const playerObj = currentPlayer === "John" ? john : computerAI;
    addMarkingToCell(cellElement, currentPlayer);
    myBoard.setCell(cellId, currentPlayer === "John" ? "✗" : "O");
    updateMarkingCount(playerObj);
    if (win()) {
      const winner =
        currentPlayer === "John" ? "You, (/•-•)/" : "Computer AI, └[`ヮ´]┘";
      endGame(winner);
    } else if (placementCount == 8 && !win()) {
      drawGame();
    }
    target.classList.add("value");
  }
}

const john = createPlayer("John, ✗");
const computerAI = createPlayer("AI, O");

const tbody = document.querySelector("tbody");
tbody.addEventListener("click", handleCellClick);

function endGame(winner) {
  tbody.removeEventListener("click", handleCellClick);
  const div = document.createElement("div");
  const ticDiv = document.querySelector(".tic-tac-toe");
  ticDiv.appendChild(div).classList.add("result");
  div.textContent = `The winner is ${winner} !`;
}

function drawGame() {
  tbody.removeEventListener("click", handleCellClick);
  const div = document.createElement("div");
  const ticDiv = document.querySelector(".tic-tac-toe");
  ticDiv.appendChild(div).classList.add("result");
  div.textContent = `The game is a Draw!`;
}
