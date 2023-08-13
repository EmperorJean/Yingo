const express = require('express');
const { generateGameID, generateBoardID, generateNewBoard } = require('../utils/game.js');
const Game = require('../Schema/Game.js')
const router = express.Router();

router.get('/bingo/new', (req, res) => {
    const gameID = generateGameID();
    const boardID = generateBoardID();
    const board = generateNewBoard();

    let game = new Game({
        gameID: gameID,
        creatorBoardID: boardID,
        boards: [{
            boardID: boardID,
            board: board
        }]
    });

    game.save()
        .then(savedGame => {
            res.json({ gameID: savedGame.gameID, boardID: boardID, board: board });
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to create game.' });
        });
});

router.get('/bingo/:gameID', (req, res) => {
    const gameID = req.params.gameID;

    Game.findOne({ gameID: gameID })
        .then(game => {
            if (game) {
                let newBoardID = generateBoardID();
                game.boards.push({
                    boardID: newBoardID,
                    board: generateNewBoard()
                });
                game.save()
                    .then(savedGame => {
                        res.json({ boardID: newBoardID, board: savedGame.boards[savedGame.boards.length - 1].board });
                    })
                    .catch(err => {
                        res.status(500).json({ error: 'Failed to join game.' });
                    });
            } else {
                res.status(404).json({ error: 'Game not found.' });
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Error joining game.' });
        });
});

router.get('/bingo/:gameID/board/:boardID', (req, res) => {
    const { gameID, boardID } = req.params;
  
    Game.findOne({ "gameID": gameID, "boards.boardID": boardID })
      .then(game => {
        if (game) {
          const board = game.boards.find(b => b.boardID === boardID);
          res.json({ board: board });
        } else {
          res.status(404).json({ error: 'Board not found.' });
        }
      })
      .catch(err => {
        res.status(500).json({ error: 'Failed to retrieve board.' });
      });
  });

router.put('/bingo/:gameId/board/:boardId/marks', (req, res) => {
    const { gameId, boardId } = req.params;
    const { markedCells } = req.body;
    Game.findOne({ "gameID": gameId, "boards.boardID": boardId })
      .then(game => {
        if (!game) {
          return res.status(404).json({ error: 'Game or board not found.' });
        }
        
        // Find the specific board to update it
        const boardIndex = game.boards.findIndex(b => b.boardID === boardId);
        if (boardIndex === -1) {
          return res.status(404).json({ error: 'Board not found.' });
        }
    
        // Update the marks
        game.boards[boardIndex].marks = markedCells;
    
        // Save the updated game document
        game.save()
          .then(updatedGame => {
            res.json({ success: true, message: 'Marks updated' });
          })
          .catch(err => {
            res.status(500).json({ error: 'Failed to update board marks.' });
          });
    
      })
      .catch(err => {
        res.status(500).json({ error: 'Failed to retrieve board.' });
      });
    
});

module.exports = router;
