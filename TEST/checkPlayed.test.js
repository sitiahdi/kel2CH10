const checkPlayed = require("../utils/checkPlayed");



test("check if game id inside user game history", () => {
    const data = [1, 2, 3, 4];
    const gameId = 2;

    expect(checkPlayed(data, gameId)).toBe(true);
});



test("check if game id not inside user game history", () => {
    const data = [1, 2, 3, 4];
    const gameId = 5;

    expect(checkPlayed(data, gameId)).toBe(false);
});