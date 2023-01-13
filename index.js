
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
                return `You Win! ${playerSelection[0].toUpperCase()+playerSelection.slice(1)} beats ${computerSelection[0].toUpperCase()+computerSelection.slice(1)}`;
            case -1:
            case 2:
                return `You Lose! ${computerSelection[0].toUpperCase()+computerSelection.slice(1)} beats ${playerSelection[0].toUpperCase()+playerSelection.slice(1)}`;
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

function game() {
    for(i = 0; i < 5; i++) {
        playerChoice = prompt("Your choice(Rock, Paper, Scissors)?");
        console.log(playRound(playerChoice));
    }
}


function runTests() {

    const testGetComputerChoice = () => {
        let hitChoices = {
            'Rock': 0,
            'Paper': 0,
            'Scissors': 0
        };
        for (let i = 0; i < 100; i++) {
            const randomChoice = getComputerChoice();
            
            hitChoices[randomChoice]++;
        }
        console.log(hitChoices);
        console.assert(hitChoices.Rock !== 0 || hitChoices.Paper !== 0 || hitChoices.Scissors !== 0, "Test random choices");
    };


    testGetComputerChoice();
}