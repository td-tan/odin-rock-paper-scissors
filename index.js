const game = {
    rock: {
        rock: 0,
        scissors: 1,
        paper: -1,
    },
    paper: {
        paper: 0,
        rock: 1,
        scissors: -1,
    },
    scissors: {
        scissors: 0,
        paper: 1,
        rock: -1,
    },
    getComputerChoice: function () {
        const choices = Object.keys(this);
        return choices[Math.floor(Math.random() * 3)];
    },
    playRound: function (playerSelection, cpu = this.getComputerChoice()) {
        return this[`${playerSelection.toLowerCase()}`][`${cpu}`];
    }
};


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
    const result = game.playRound(playerChoice);

    display(result);
}

const buttons = document.querySelectorAll('button');

buttons.forEach((btn) => {
    btn.addEventListener('click', getResult);
});