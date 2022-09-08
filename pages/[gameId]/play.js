import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/playPage.module.css";

import Link from "next/dist/client/link";

import jwtDecode from "jwt-decode";
import getCookie from "../../utils/getCookie";

import firebaseApp from "../../services/firebase";


const db = firebaseApp.firestore();

function PlayPage() {

	const navigate = useRouter();
	const gameId = navigate.query.gameId;

	const [isPlaying, setIsPlaying] = useState(true);
	const [cookie, setCookie] = useState(null);

	const [userHistory, setUserHistory] = useState(null);
	const [userId, setUserId] = useState(null);

	const [score, setScore] = useState(0);
	const [playerScore, setPlayerScore] = useState(null);

	useEffect(() => {
		if (!getCookie("token")) {
			navigate.push("/login");
		}
		const theCookie = getCookie("token");
		setCookie(theCookie);
	}, []);

	useEffect(() => {
		if (cookie) {
			setTimeout(() => {
				setIsPlaying(false);
				getGameHistory();
				getRandomScore();
			}, 1500);
		}
	}, cookie);

	function getRandomScore() {
		const newScore = Math.floor(Math.random() * 10) + 1;

		setScore(newScore);
	}

	function getGameHistory() {
		const decoded = jwtDecode(cookie);

		db.collection("users").get().then(querrySnapShot => {
			if (!querrySnapShot) {
				throw Error("failed to get data");
			}
			querrySnapShot.forEach(e => {

				if (e.data().userUid === decoded.user_id) {
					setUserHistory(e.data().gameHistory);
					setUserId(e.id);
					setPlayerScore(e.data().score);
				}
			});

		}).catch(err => {
			console.log(err);
		});

	}

	useEffect(() => {
		if (userHistory) {
			setGameHistory();
			setUsersScore();
		}
	}, [userHistory]);

	function setGameHistory() {

		let gameHistory = userHistory;

		for (let i = 0; i < gameHistory.length; i++) {
			if (gameHistory[i] === gameId) {
				return;
			}
		}

		gameHistory.push(gameId);

		db.collection("users").doc(userId).update(
			{ gameHistory: gameHistory }
		);
	}

	function setUsersScore() {

		const finalScore = playerScore + score;
		db.collection("users").doc(userId).update(
			{ score: finalScore }
		);
	}

	return (
		<section className={styles.playPage}>
			{isPlaying ? 
                <>
                    <h1 style={{ color: "white", fontSize: 50 }}>Playing...</h1>
                </> : <>
                    <div className={styles.scoringOverlay}>
                    	<h1 style={{ fontWeight: "bold", fontSize: 40, height: "20%" }}>Finish Game</h1>
                    	<div style={{ height: "70%" }}>
                    		<p>Your Total Score: {playerScore} + {score} = {playerScore + score}</p>
                    	</div>
                    	<Link href={"/game-list"}>
                    		<button className={styles.finishBtn}>Finish</button>
                    	</Link>
                    </div>
                </>
			}
		</section>
	);
}

export default PlayPage;