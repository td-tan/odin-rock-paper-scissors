const playRound = require('./index');

describe('playRound', () => {
    test('Player selects Rock and Computer selects Paper', () => {
        expect(playRound("Rock", "Paper")).toBe("You Lose! Paper beats Rock");
    });
    test('Player selects Paper and Computer selects Rock', () => {
        expect(playRound("Paper", "Rock")).toBe("You Win! Paper beats Rock");
    });
    test('Player selects Paper and Computer selects Paper', () => {
        expect(playRound("Paper", "Paper")).toBe("Draw!");
    });

    test('Player selects Scissors and Computer selects Rock', () => {
        expect(playRound("Scissors", "Rock")).toBe("You Lose! Rock beats Scissors");
    });
    test('Player selects Rock and Computer selects Scissors', () => {
        expect(playRound("Rock", "Scissors")).toBe("You Win! Rock beats Scissors");
    });
    test('Player selects Rock and Rock selects Paper', () => {
        expect(playRound("Rock", "Rock")).toBe("Draw!");
    });

    test('Player selects Paper and Computer selects Scissors', () => {
        expect(playRound("Paper", "Scissors")).toBe("You Lose! Scissors beats Paper");
    });
    test('Player selects Rock and Computer selects Scissors', () => {
        expect(playRound("Scissors", "Paper")).toBe("You Win! Scissors beats Paper");
    });
    test('Player selects Scissors and Scissors selects Paper', () => {
        expect(playRound("Scissors", "Scissors")).toBe("Draw!");
    });
});