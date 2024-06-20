// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

function oldScrabbleScorer(scrabbleWord) {
  scrabbleWord = scrabbleWord.toUpperCase();
  let letterPoints = "";

  for (let i = 0; i < scrabbleWord.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(scrabbleWord[i])) {
        letterPoints += `Points for '${scrabbleWord[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let scrabbleWord = "";
function initialPrompt() {
  console.log("Let's play some Scrabble!");
  scrabbleWord = input.question("Enter a word to score: ");
  console.log(oldScrabbleScorer(scrabbleWord));
}

let newPointStructure = transform(oldPointStructure);

function simpleScorer(scrabbleWord) {
  scrabbleWord = scrabbleWord.toUpperCase();
  let letterPoints = 0;

  for (let i = 0; i < scrabbleWord.length; i++) {
    letterPoints += 1;
  }
  return letterPoints;
}

function vowelBonusScorer(scrabbleWord) {
  scrabbleWord = scrabbleWord.toUpperCase();
  let letterPoints = 0;
  let vowels = ["A", "E", "I", "O", "U"];
  for (let i = 0; i < scrabbleWord.length; i++) {
    if (vowels.includes(scrabbleWord[i])) {
      letterPoints += 3;
    } else {
      letterPoints += 1;
    }
  }
  return letterPoints;
}

function scrabbleScorer(scrabbleWord) {
  let score = 0;
  scrabbleWord = scrabbleWord.toLowerCase();
  for (let i = 0; i < scrabbleWord.length; i++) {
    score += newPointStructure[scrabbleWord[i]];
  }
  return score;
}

const scoringAlgorithms = [
  {
    name: "Simple Score",
    description: "each letter is worth 1 point",
    scorerFunction: simpleScorer,
  },
  {
    name: "Bonus Vowels",
    description: "vowels are 3 pts, consonants are 1pt",
    scorerFunction: vowelBonusScorer,
  },
  {
    name: "Scrabble",
    description: "the traditional scoring algorithm",
    scorerFunction: scrabbleScorer,
  },
];

function scorerPrompt() {
  let score = 0;
  console.log("Let's play some Scrabble!");
  scrabbleWord = input.question("Enter a word to score: ");
  console.log("Which scoring method would you like to use? ");
  console.log(
    scoringAlgorithms[0].name + ": " + scoringAlgorithms[0].description
  );
  console.log(
    scoringAlgorithms[1].name + ": " + scoringAlgorithms[1].description
  );
  console.log(
    scoringAlgorithms[2].name + ": " + scoringAlgorithms[2].description
  );
  scoringChoice = input.question("Enter 0, 1, 2: ");
  if (scoringChoice == "0") {
    score = scoringAlgorithms[0].scorerFunction(scrabbleWord);
  } else if (scoringChoice == "1") {
    score = scoringAlgorithms[1].scorerFunction(scrabbleWord);
  } else {
    score = scoringAlgorithms[2].scorerFunction(scrabbleWord);
  }
  console.log(`score for '${scrabbleWord}' : ${score}`);
}

function transform(oldPointStructure) {
  let newStructure = {};
  for (value in oldPointStructure) {
    let letters = oldPointStructure[value];
    for (let i = 0; i < letters.length; i++) {
      newStructure[letters[i].toLowerCase()] = Number(value);
    }
  }
  return newStructure;
}

function runProgram() {
  scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
