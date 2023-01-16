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

function display(player, cpu, result) {
    const playerPoints = document.querySelector('div#playerPoints');
    const cpuPoints = document.querySelector('div#cpuPoints');
    const output = document.querySelector('div#results');

    if (game.rounds == 0) {
        const board = document.querySelector('div.container');
        board.childNodes.forEach((card) => {
            card.hidden = true;
        });

        if(game.playerWins > game.playerLoses) {
            output.textContent = 'Congratulations! You won against a bot in 5 Rounds';
        } else if (game.playerWins === game.playerLoses) {
            output.textContent = 'Congratulations! That is a draw';
        } else {
            output.textContent = 'Go back to training! You are losing against a bot';
        }
        
        const resetGame = () => {
            game.rounds = 5;
            board.childNodes.forEach((card) => {
                card.hidden = false;
            });
        };

        setTimeout(resetGame, 3000);
    }

    const prettifyText = (result) => {
        player = player.toUpperCase();
        cpu = cpu.toUpperCase();

        const playerChoice = document.querySelector('div#playerChoice');
        const cpuChoice = document.querySelector('div#cpuChoice');

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

}

function getResult(e) {
    const playerChoice = e.target.id;
    const cpu = game.getComputerChoice();
    const result = game.playRound(playerChoice, cpu);
    game.rounds--;

    display(playerChoice, cpu, result);
}

const selects = document.querySelectorAll('div.player');

selects.forEach((choice) => {
    choice.addEventListener('click', getResult);
});