const nanoid = require('nanoid')

const terms = [
    "No credit",
    "\"Reading the caption word for word\"",
    "\"I would be SO embarrassed\"",
    "Stock or Vine Sound Effect",
    "\"What did you expect?\"",
    "Explain the video before it starts",
    "References a famous tiktok audio",
    "Explaining the video in first person",
    "\"Ooooooh noooooo\"",
    "Freebooting a freebooted video",
    "Black and white filter",
    "Shaky Camera effect",
    "Editing Mistake",
    "Weird flex",
    "Talking over the person in the video",
    "Actual insight into the video",
    "Random tangent as the video repeats",
    "Fake Laugh",
    "Says something that makes absolutely no sense",
    "Victim Blaming",
    "Calling someone \"bro\"",
    "\"What is that?\"",
    "\"If that happened to me ...\"",
    "Silent for over 5 seconds",
    "Zooms in on their face"
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0,25);
}

function generateGameID() {
    return nanoid(5);
}

function generateBoardID() {
    return nanoid(10);
}

function generateNewBoard(baseTerms) {
    // If no base terms are provided, use the default terms and shuffle them
    const termsToUse = baseTerms || shuffleArray([...terms]);
    return shuffleArray([...termsToUse]);
}

module.exports = { generateGameID, generateBoardID, generateNewBoard };
