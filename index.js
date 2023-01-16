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
    rounds: 5,
    playerPoints: 0,
    cpuPoints: 0,
    getComputerChoice: function () {
        const choices = Object.keys(this);
        return choices[Math.floor(Math.random() * 3)];
    },
    playRound: function (playerSelection, cpu = this.getComputerChoice()) {
        return this[`${playerSelection.toLowerCase()}`][`${cpu}`];
    }
};

function resetGame() {
    const playerChoice = document.querySelector('div#playerChoice');
    const cpuChoice = document.querySelector('div#cpuChoice');
    
    const playerPoints = document.querySelector('div#playerPoints');
    const cpuPoints = document.querySelector('div#cpuPoints');

    const output = document.querySelector('div#results');

    game.rounds = 5;
    game.cpuPoints = 0;
    game.playerPoints = 0;

    cpuPoints.textContent = '0';
    playerPoints.textContent = '0';
    playerChoice.textContent = '?';
    cpuChoice.textContent = '?';

    output.textContent = '';
}

function display(player, cpu, result) {
    const playerChoice = document.querySelector('div#playerChoice');
    const cpuChoice = document.querySelector('div#cpuChoice');
    
    const playerPoints = document.querySelector('div#playerPoints');
    const cpuPoints = document.querySelector('div#cpuPoints');

    const output = document.querySelector('div#results');

    if (game.rounds == 0) {
        if(game.playerPoints > game.cpuPoints) {
            output.textContent = 'Congratulations! You won against a bot in 5 Rounds';
        } else if (game.playerPoints === game.cpuPoints) {
            output.textContent = 'Congratulations! That is a draw';
        } else {
            output.textContent = 'Go back to training! You are losing against a bot';
        }

        resetGame();
        return;
    }

    const prettifyText = (result) => {
        player = player.toUpperCase();
        cpu = cpu.toUpperCase();

        playerChoice.textContent = player;
        cpuChoice.textContent = cpu;

        switch(result) {
            case -1: 
                game.cpuPoints++;
                cpuPoints.textContent = game.cpuPoints;
                return `You Lose! ${cpu} beats ${player}`; 
            case 0 : 
                return `Draw!`;
            case 1 : 
                game.playerPoints++;
                playerPoints.textContent = game.playerPoints;
                return `You Win! ${player} beats ${cpu}`; 
        }
    }

    output.textContent = prettifyText(result);
    game.rounds--;
}

function getResult(e) {
    const playerChoice = e.target.id;
    const cpu = game.getComputerChoice();
    const result = game.playRound(playerChoice, cpu);

    display(playerChoice, cpu, result);
}

const selects = document.querySelectorAll('div.player');
const resetBtn = document.querySelector('div.button#reset');

selects.forEach((choice) => {
    choice.addEventListener('click', getResult);
});

resetBtn.addEventListener('click', resetGame);