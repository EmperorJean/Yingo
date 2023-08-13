const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    boardID: String,
    board: Array,
    marks: [Number]
  });
  
const gameSchema = new mongoose.Schema({
gameID: {
    type: String,
    required: true,
    unique: true
},
creatorBoardID: String,
boards: [boardSchema]
});

module.exports = mongoose.model('Game', gameSchema);