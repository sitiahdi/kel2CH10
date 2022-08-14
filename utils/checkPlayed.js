import firebaseApp from '../services/firebase';

const db = firebaseApp.firestore();

export default function checkPlayed(userGameHistory, gameId) {
    let result
    userGameHistory.forEach(e => {
        if (e === gameId) {
            result = true
        } else {
            result = false
        }
    })
    return result
}