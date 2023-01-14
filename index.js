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

function display(result) {
    const output = document.querySelector('div#results');
    output.textContent = result;
}

function getResult(e) {
    const playerChoice = e.target.id;
    const result = game.playRound(playerChoice);
    
    display(result);
}

const selects = document.querySelectorAll('div.player');

selects.forEach((choice) => {
    choice.addEventListener('click', getResult);
});