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

function createPlayer(name) {
  let marking = 0;
  const getMarkingCount = () => marking;
  const addMarkingCount = () => marking++;
  return {
    name,
    getMarkingCount,
    addMarkingCount,
  };
}

function addMarkingToCell(cell, player) {
  cell.textContent = player === "John" ? "X" : "O";
}

function updateMarkingCount(playerObj) {
  playerObj.addMarkingCount();
}

function handleCellClick(event) {
  const target = event.target;
  const cellId = target.getAttribute("id");
  const cellElement = document.getElementById(cellId);
  if (target.classList.contains("box") && !target.classList.contains("value")) {
    const currentPlayer =
      john.getMarkingCount() === computerAI.getMarkingCount() ? "John" : "AI";
    const playerObj = currentPlayer === "John" ? john : computerAI;
    addMarkingToCell(cellElement, currentPlayer);
    myBoard.setCell(cellId, currentPlayer === "John" ? "X" : "O");
    updateMarkingCount(playerObj);
    console.log(
      `Cell ID = ${cellId}, John count at ${john.getMarkingCount()} and AI count at ${computerAI.getMarkingCount()}`
    );
    target.classList.add("value");
  }
}

const john = createPlayer("John");
const computerAI = createPlayer("AI");

const tbody = document.querySelector("tbody");
tbody.addEventListener("click", handleCellClick);
