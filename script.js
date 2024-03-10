const statusDisplay = document.querySelector('#statusAction');
const restartButton = document.querySelector('#restartButton');
const cells = document.querySelectorAll('[data-cell]');
let currentPlayer = 'X';
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkForWin() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
            return true;
        }
    }
    return false;
}

function checkForDraw() {
    return [...cells].every(cell => cell.innerText.trim() !== '');
}

function announce(result) {
    switch (result) {
        case 'draw':
            statusDisplay.innerText = 'Draw!';
            break;
        case 'win':
            statusDisplay.innerText = `Player ${currentPlayer} Wins!`;
            break;
    }
    isGameActive = false;
}

function handleCellClick(event) {
    const clickedCell = event.target;

    if (clickedCell.innerText.trim() !== "" || !isGameActive) {
        return;
    }

    clickedCell.innerText = currentPlayer;

    if (checkForWin()) {
        announce('win');
    } else if (checkForDraw()) {
        announce('draw');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
    }
}

function handleRestartGame() {
    isGameActive = true;
    currentPlayer = 'X';
    statusDisplay.innerText = `Player X's turn`;
    cells.forEach(cell => cell.innerText = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', handleRestartGame);
