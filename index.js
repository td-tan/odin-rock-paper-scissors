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

    output.className = '';
    output.textContent = '';

    const selects = document.querySelectorAll('div.player');
        
    selects.forEach((select) => {
        select.classList.remove('disabled');
    });
}

function display(player, cpu, result) {
    const playerChoice = document.querySelector('div#playerChoice');
    const cpuChoice = document.querySelector('div#cpuChoice');
    
    const playerPoints = document.querySelector('div#playerPoints');
    const cpuPoints = document.querySelector('div#cpuPoints');

    const output = document.querySelector('div#results');

    if (game.rounds == 0) {
        if(game.playerPoints > game.cpuPoints) {
            output.classList.add('green');
            output.textContent = 'Congratulations! You won against a bot in 5 Rounds';
        } else if (game.playerPoints === game.cpuPoints) {
            output.classList.add('blue');
            output.textContent = 'Congratulations! That is a draw';
        } else {
            output.classList.add('red');
            output.textContent = 'Go back to training! You are losing against a bot';
        }

        const selects = document.querySelectorAll('div.player');
        
        selects.forEach((select) => {
            select.className = 'player';
            select.classList.add('disabled');
        });

        setTimeout(resetGame, 3000);
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

function toggleMode(e, prev_mode, new_mode, prev_fontColor, new_fontColor) {
    const body = document.querySelector('body');
    const container = document.querySelector('div.container');
    const color = document.querySelector(`div.color#${prev_fontColor}`);
    const githubIcon = document.querySelector('img#github-profile');

    e.target.parentNode.classList.remove(prev_mode);
    e.target.parentNode.classList.add(new_mode);
    if (prev_mode === 'night') {
        e.target.src = 'resources/brightness.png';
        githubIcon.src = 'resources/github-mark-white.png';
    } else {
        e.target.src = 'resources/moon.png';
        githubIcon.src = 'resources/github-mark.png';
    }

    container.classList.remove(`${new_mode}-mode`);
    container.classList.add(`${prev_mode}-mode`);
    body.className = '';
    body.classList.add(`${prev_mode}-mode`);
    body.classList.add(new_fontColor);
    color.setAttribute('id', new_fontColor);
}

function changeMode(e) {
    if (e.target.parentNode.classList.contains('night')) {
        toggleMode(e, 'night', 'light', 'black', 'white');
    } else {
        toggleMode(e, 'light', 'night', 'white', 'black');
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
    choice.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('disabled')) {
            return;
        }
        if(e.target.parentNode.classList.contains('light-mode')) {
            e.target.className = 'player';
            e.target.classList.add('border-white');
        } else {
            e.target.className = 'player'; 
            e.target.classList.add('border-black');
        }
    });
    choice.addEventListener('mouseout', (e) => {
        if (e.target.classList.contains('disabled')) {
            return;
        }
        e.target.className = 'player';
    });
});

mode.addEventListener('click', changeMode);

resetBtn.addEventListener('click', resetGame);