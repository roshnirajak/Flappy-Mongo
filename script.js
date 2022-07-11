const boxs = document.querySelectorAll(".box");
const PLAYER_X = "X";
const PLAYER_O = "O";
let turn = PLAYER_X;

const boardState = Array(boxs.length);
boardState.fill(null);

//Elements
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);
const gameOverSound = new Audio("assets/success.mp3");

boxs.forEach((box) => box.addEventListener("click", boxClick));

function howerText() {
    //remove all hover text
    boxs.forEach((box) => {
        box.classList.remove("x-hover");
        box.classList.remove("o-hover");
    });

    const hoverClass = `${turn.toLowerCase()}-hover`;

    boxs.forEach((box) => {
        if (box.innerText == "") {
            box.classList.add(hoverClass);
        }
    });
}

howerText();

function boxClick(event) {
    if (gameOverArea.classList.contains("visible")) {
        return;
    }

    const box = event.target;
    const boxNumber = box.dataset.index;
    if (box.innerText != "") {
        return;
    }

    if (turn === PLAYER_X) {
        box.innerText = PLAYER_X;
        boardState[boxNumber - 1] = PLAYER_X;
        turn = PLAYER_O;
    } else {
        box.innerText = PLAYER_O;
        boardState[boxNumber - 1] = PLAYER_O;
        turn = PLAYER_X;
    }

    howerText();
    checkWinner();
}

function checkWinner() {
    //Winner Check
    for (const winningCombination of winningCombinations) {
        //Object Destructuring
        const { combo, strikeClass } = winningCombination;
        const boxValue1 = boardState[combo[0] - 1];
        const boxValue2 = boardState[combo[1] - 1];
        const boxValue3 = boardState[combo[2] - 1];

        if (
            boxValue1 != null &&
            boxValue1 === boxValue2 &&
            boxValue1 === boxValue3
        ) {
            strike.classList.add(strikeClass);
            gameOverScreen(boxValue1);
            return;
        }
    }

    //Draw Check
    const allboxFilledIn = boardState.every((box) => box !== null);
    if (allboxFilledIn) {
        gameOverScreen(null);
    }
}

function gameOverScreen(winnerText) {
    let text = "Draw!";
    if (winnerText != null) {
        text = winnerText;
    }
    gameOverArea.className = "visible";
    gameOverText.innerHTML = "Winner is<br>"+ text + "!";
    gameOverSound.play();
}

function startNewGame() {
    strike.className = "strike";
    gameOverArea.className = "hidden";
    boardState.fill(null);
    boxs.forEach((box) => (box.innerText = ""));
    turn = PLAYER_X;
    howerText();
}

const winningCombinations = [

    { combo: [1, 2, 3], strikeClass: "strike-row-1" },
    { combo: [4, 5, 6], strikeClass: "strike-row-2" },
    { combo: [7, 8, 9], strikeClass: "strike-row-3" },

    { combo: [1, 4, 7], strikeClass: "strike-column-1" },
    { combo: [2, 5, 8], strikeClass: "strike-column-2" },
    { combo: [3, 6, 9], strikeClass: "strike-column-3" },

    { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
    { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },
];
