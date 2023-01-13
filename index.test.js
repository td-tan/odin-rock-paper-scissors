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
        expect(playRound("Scissors", "Rock")).toBe("You Lose! Scissors beats Rock");
    });
    test('Player selects Rock and Computer selects Scissors', () => {
        expect(playRound("Rock", "Scissors")).toBe("You Win! Scissors beats Rock");
    });
    test('Player selects Rock and Rock selects Paper', () => {
        expect(playRound("Rock", "Rock")).toBe("Draw!");
    });
});