
// Computer will choose a random choice
function getComputerChoice() {
    let choices = [
        "Rock",
        "Paper",
        "Scissors"
    ];

    return choices[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection = getComputerChoice()) {
    computerSelection = computerSelection.toLowerCase();

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



function runTests() {

    const testGetComputerChoice = () => {
        const testcase = 'testGetComputerChoice';
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
        console.assert(hitChoices.Rock !== 0 || hitChoices.Paper !== 0 || hitChoices.Scissors !== 0, `${testcase} => Test random choices`);
    };

    const testplayRound = () => {
        const testcase = 'testplayRound';
        console.assert(playRound('Rock', 'Scissors') === 'You Win! Rock beats Scissors', `${testcase} => Test Player Win`);
        console.assert(playRound('Paper', 'Rock') === 'You Win! Paper beats Rock', `${testcase} => Test Player Win`);
        console.assert(playRound('Scissors', 'Paper') === 'You Win! Scissors beats Paper', `${testcase} => Test Player Win`);

        console.assert(playRound('Scissors', 'Rock') === 'You Lose! Rock beats Scissors', `${testcase} => Test Player Lose`);
        console.assert(playRound('Rock', 'Paper') === 'You Lose! Paper beats Rock', `${testcase} => Test Player Lose`);
        console.assert(playRound('Paper', 'Scissors') === 'You Lose! Scissors beats Paper', `${testcase} => Test Player Lose`);

        console.assert(playRound('Rock', 'Rock') === 'Draw!', `${testcase} => Test Draw`);
        console.assert(playRound('Paper', 'Paper') === 'Draw!', `${testcase} => Test Draw`);
        console.assert(playRound('Scissors', 'Scissors') === 'Draw!', `${testcase} => Test Draw`);
    };


    testGetComputerChoice();
    testplayRound();
}

function display(result) {
    const output = document.querySelector('div#results');
    output.textContent = result;
}

function getResult(e) {
    const playerChoice = e.target.textContent;
    const result = playRound(playerChoice);

    display(result);
}

const buttons = document.querySelectorAll('button');

buttons.forEach((btn) => {
    btn.addEventListener('click', getResult);
});