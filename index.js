const game = {
    rounds: 5,
    playerWins: 0,
    playerDraws: 0,
    playerLoses: 0,
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

function display(player, cpu, result) {
    const output = document.querySelector('div#results');
    const prettifyText = (result) => {
        player = player.toUpperCase();
        cpu = cpu.toUpperCase();
        switch(result) {
            case -1: 
                game.playerLoses++;
                return `You Lose! ${cpu} beats ${player}`; 
            case 0 : 
                game.playerDraws++;
                return `Draw!`;
            case 1 : 
                game.playerWins++;
                return `You Win! ${player} beats ${cpu}`; 
        }
    }

    output.textContent = prettifyText(result);
}

function getResult(e) {
    const playerChoice = e.target.id;
    const cpu = game.getComputerChoice();
    const result = game.playRound(playerChoice, cpu);

    display(playerChoice, cpu, result);
}

const selects = document.querySelectorAll('div.player');

selects.forEach((choice) => {
    choice.addEventListener('click', getResult);
});