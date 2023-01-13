const playRound = require('./index');

describe('playRound', () => {
    test('Player selects Rock and Computer selects Paper', () => {
      expect(playRound("Rock", "Paper")).toBe("You Lose! Paper beats Rock");
    });
});