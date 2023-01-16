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

function chooseColor(e) {
    const color = e.target.id;

    const body = document.querySelector('body');
    if (body.classList.length > 1 && (body.classList.contains('light-mode') || body.classList.contains('night-mode'))) {
        body.className = body.classList[0];
    }
    body.classList.add(color);
}

function changeMode(e) {
    if (e.target.parentNode.classList.contains('night')) {
        e.target.parentNode.classList.remove('night');
        e.target.parentNode.classList.add('light');
        e.target.src = 'resources/brightness.png';

        const body = document.querySelector('body');
        const container = document.querySelector('div.container');
        const colorBlack = document.querySelector('div.color#black');

        container.classList.remove('light-mode');
        container.classList.add('night-mode');
        body.className = '';
        body.classList.add('night-mode');
        body.classList.add('white');
        colorBlack.setAttribute('id', 'white');
    } else {
        e.target.parentNode.classList.remove('light');
        e.target.parentNode.classList.add('night');
        e.target.src = 'resources/moon.png';

        const body = document.querySelector('body');
        const container = document.querySelector('div.container');
        const colorWhite = document.querySelector('div.color#white');

        container.classList.remove('night-mode');
        container.classList.add('light-mode');
        body.className = '';
        body.classList.add('light-mode');
        body.classList.add('black');
        colorWhite.setAttribute('id', 'black');
    }
}

const selects = document.querySelectorAll('div.player');
const resetBtn = document.querySelector('div.button#reset');
const colors = document.querySelectorAll('div.color');
const mode = document.querySelector('div.mode');

colors.forEach((color) => {
    color.addEventListener('click', chooseColor);
});

selects.forEach((choice) => {
    choice.addEventListener('click', getResult);
});

mode.addEventListener('click', changeMode);

resetBtn.addEventListener('click', resetGame);