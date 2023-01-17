
// Computer will choose a random choice
function getComputerChoice() {
    let choices = [
        "Rock",
        "Paper",
        "Scissors"
    ];

    return choices[Math.floor(Math.random() * 3)];
}

// Test ten rounds
for (let i = 0; i < 10; i++) {
    console.log(getComputerChoice());
}