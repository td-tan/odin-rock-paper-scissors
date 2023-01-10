
// Computer will choose a random choice
function getComputerChoice() {
    let choices = [
        "Rock",
        "Paper",
        "Scissors"
    ];

    return choices[Math.floor(Math.random() * 3)];
}

function playSingleRound(playerSelection, computerSelection = getComputerChoice().toLowerCase()) {
    switch(playerSelection.toLowerCase()) {
        case "rock":
            if (computerSelection === "paper") {
                return "You Lose! Paper beats Rock";
            } else if (computerSelection === "scissors") {
                return "You Win! Rock beats Scissors";
            } else {
                return "Draw!"
            }
        case "paper":
            if (computerSelection === "scissors") {
                return "You Lose! Scissors beats Paper";
            } else if (computerSelection === "rock") {
                return "You Win! Paper beats Rock";
            } else {
                return "Draw!"
            }
        case "scissors":
            if (computerSelection === "rock") {
                return "You Lose! Rock beats Scissors";
            } else if (computerSelection === "paper") {
                return "You Win! Scissors beats Rock";
            } else {
                return "Draw!"
            }
        default:
            return "Invalid input!"
    }
}