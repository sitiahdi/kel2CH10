


function checkPlayed(userGameHistory, gameId) {

	for (let i = 0; i < userGameHistory.length; i++) {
		if (userGameHistory[i] === gameId) {
			return true;
		}
	}
	return false;
}

module.exports = checkPlayed;