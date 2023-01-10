
// Computer will choose a random choice
function getComputerChoice() {
    let choices = [
        "Rock",
        "Paper",
        "Scissors"
    ];

    return choices[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection = getComputerChoice().toLowerCase()) {

    // Use simple math to determine the win conditions
    // Wins: -2, 1, 1
    // Lose: -1, -1, 2
    // Draw: 0 
    let result = (playerSelection) => {
        let choice_values = {
            "rock": 1,
            "paper": 2,
            "scissors": 3
        };

        sum = choice_values[playerSelection] - choice_values[computerSelection];

        switch(sum) {
            case 0:
                return "Draw!";
            case -2:
            case 1:
                return `You Win! ${playerSelection} beats ${computerSelection}`;
            case -1:
            case 2:
                return `You Lose! ${playerSelection} beats ${computerSelection}`;
        }
    };

    switch(playerSelection.toLowerCase()) {
        case "rock":
            return result("rock");
        case "paper":
            return result("paper");
        case "scissors":
            return result("scissors");
        default:
            return "Invalid input!"
    }
}