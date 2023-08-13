let markedCells = [];
let url = window.location.origin;
let api = ''

// Function to generate the bingo board
function populateBoard(board) {
    const table = document.querySelector("#bingoBoard tbody");
    table.innerHTML = '';
    let count = 0;
    for (let i = 0; i < 5; i++) {
        const row = table.insertRow();
        for (let j = 0; j < 5; j++) {
            const cell = row.insertCell();
            cell.dataset.cellId = count;
            if (board && board.length > 0) {
                if (count === 12) {
                    cell.textContent = "Aw Hell Nah (Free Space)";
                    cell.classList.add("marked");
                    toggleMarkedCell(12);
                } else {
                    cell.textContent = board[count];
                }

                count++;
                cell.addEventListener("click", function () {
                    const rowIndex = this.parentElement.rowIndex;
                    const cellIndex = this.cellIndex;
                    const uniqueCellId = rowIndex * 5 + cellIndex;
                    this.classList.toggle("marked");
                    toggleMarkedCell(uniqueCellId);
                });
            }
        }
    }
}

function toggleMarkedCell(index) {
    if (markedCells.includes(index)) {
        markedCells = markedCells.filter(cellIndex => cellIndex !== index);
    } else {
        markedCells.push(index);
    }
}

function updateMarksOnServer() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameIdFromUrl = urlParams.get('gameId');
    const boardIdFromUrl = urlParams.get('boardId');

    fetch(`${api}/bingo/${gameIdFromUrl}/board/${boardIdFromUrl}/marks`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            markedCells: markedCells,
        }),
    });
}

function generateNewGame() {
    fetch(`${api}/bingo/new`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            let gameId = data.gameID;
            let boardId = data.boardID;
            let boardData = data.board;

            document.getElementById('shareGameLink').value = `${url}?gameId=${gameId}`;
            document.getElementById('shareBoardLink').value = `${url}?gameId=${gameId}&boardId=${boardId}`;
            populateBoard(boardData);
            window.history.pushState({}, "", `${window.location.origin}${window.location.pathname}?gameId=${gameId}&boardId=${boardId}`);
        })
        .catch(error => console.error('Error fetching a new game'));
}


function copyLink(elementId) {

    if(elementId === "shareBoardLink") {
        updateMarksOnServer();
    }
    
    const inputElement = document.getElementById(elementId);
    inputElement.select();
    document.execCommand("copy");
}


// Fetch an existing game using gameId and boardId from the URL params
function loadGameFromUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameIdFromUrl = urlParams.get('gameId');
    const boardIdFromUrl = urlParams.get('boardId');

    if (gameIdFromUrl) {
        if (boardIdFromUrl) {
            // Fetch the specific board for the user
            fetch(`${api}/bingo/${gameIdFromUrl}/board/${boardIdFromUrl}`, { method: 'GET' })
                .then(boardResponse => boardResponse.json())
                .then(boardData => {
                    board = boardData.board;
                    markedCells = board.marks || [];
                    populateBoard(board.board);
                    markLoadedCells();
                    document.getElementById('shareGameLink').value = `${url}?gameId=${gameIdFromUrl}`;
                    document.getElementById('shareBoardLink').value = `${url}?gameId=${gameIdFromUrl}&boardId=${board.boardID}`;
                    window.history.pushState({}, "", `${window.location.origin}${window.location.pathname}?gameId=${gameIdFromUrl}&boardId=${board.boardID}`);
                })
                .catch(error => console.error('Error fetching a specific board'));

        } else {
            // Just populate with the common game board terms
            fetch(`${api}/bingo/${gameIdFromUrl}`, { method: 'GET' })
                .then(response => response.json())
                .then(data => {
                    populateBoard(data.board);
                    document.getElementById('shareGameLink').value = `${url}?gameId=${gameIdFromUrl}`;
                    document.getElementById('shareBoardLink').value = `${url}?gameId=${gameIdFromUrl}&boardId=${data.boardID}`;
                    window.history.pushState({}, "", `${window.location.origin}${window.location.pathname}?gameId=${gameIdFromUrl}&boardId=${data.boardID}`);
                })
                .catch(error => console.error('Error fetching an existing game'));
        }
    }

}

function markLoadedCells() {
    markedCells.forEach(index => {
        const row = Math.floor(index / 5);
        const col = index % 5;
        const cell = document.querySelector(`#bingoBoard tbody tr:nth-child(${row + 1}) td:nth-child(${col + 1})`);
        cell.classList.add('marked');
    });
}

loadGameFromUrlParams();

document.getElementById("generateButton").addEventListener("click", function () {
    // Clear existing board if any
    const table = document.querySelector("#bingoBoard tbody");
    table.innerHTML = "";
    generateNewGame();
});

document.addEventListener("DOMContentLoaded", () => {
    populateBoard();
});
