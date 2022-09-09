import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setHistory } from "../../redux/gameHistory";
import Link from "next/dist/client/link";
import styles from "../../styles/gameDetails.module.css";

import firebaseApp from "../../services/firebase";

import jwtDecode from "jwt-decode";
import getCookie from "../../utils/getCookie";

import { useSelector } from "react-redux";

const db = firebaseApp.firestore();



function GameDetailsPage() {

	const dispatch = useDispatch();

	const userGameHistory = useSelector(state => state.gameHistory.history);

	const [data, setData] = useState(null);
	const [isPlayed, setIsPlayed] = useState(false);

	const [cookie, setCookie] = useState(null);

	const [isRps, setIsRps] = useState(false);

	const router = useRouter();
	const gameId = router.query.gameId;

	useEffect(() => {
		if (gameId) {
			const theCookie = getCookie("token");
			if (!theCookie) {
				navigate.push("/login");
			}
			setCookie(theCookie);
		}
	}, [gameId]);

	useEffect(() => {
		if (cookie) {
			setGameHistory();
			getData();
		}
	}, [cookie]);

	useEffect(() => {
		if (data) {
			checkPlayed();
			if (data.id === "OW024DEfpwplQXf2zyIG") {
				setIsRps(true);
			}
		}
	}, [data]);

	function getData() {

		db.collection("game_list").doc(gameId).get().then(querySnapShot => {

			if (!querySnapShot) {
				throw Error("failed to get data");
			}

			const theData = {
				id: querySnapShot.id,
				carousel: querySnapShot.data().carousel,
				description: querySnapShot.data().description,
				developer: querySnapShot.data().developer,
				genre: querySnapShot.data().genre,
				release_date: querySnapShot.data().release_date,
				thumbnail: querySnapShot.data().thumbnail,
				title: querySnapShot.data().title
			};

			if (!theData) {
				throw Error("failed to get data");

			} else {
				setData(theData);
			}

		}).catch(err => {
			console.log(err);
		});
	}


	function setGameHistory() {
		const decoded = jwtDecode(cookie);

		db.collection("users").get().then(querrySnapShot => {
			if (!querrySnapShot) {
				throw Error("failed to get data");
			}
			querrySnapShot.forEach(e => {

				if (e.data().userUid === decoded.user_id) {
					dispatch(setHistory(e.data().gameHistory));
				}
			});

		}).catch(err => {
			console.log(err);
		});
	}

	function checkPlayed() {
		userGameHistory.forEach(e => {
			if (e === data.id) {
				setIsPlayed(true);
			}
		});
	}

	if (!data) {
		return (
			<section className={styles.gameDetailsPage}>
				<h1 style={{textAlign: "center", color: "white"}}>Loading ...</h1>
			</section>
		);
	}

	return (
		<>
			{data && 
                <section className={styles.gameDetailsPage}>
                	<div className={styles.leftSide}>
                		<div className={styles.imageHolder}>
                			<img className={styles.gameImage} src={data.thumbnail} alt='game-image' />
                		</div>
                		<div className={styles.backBtnHolder}>
                			<Link href={"/game-list"}>
                				<button className={styles.backBtn}>Back</button>
                			</Link>
                		</div>
                	</div>

                	<div className={styles.rightSide}>
                		<div className={styles.descriptionHolder}>
                			<div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                				<h1 className={styles.gameTitle}>{data.title}</h1>
                				<p className={isPlayed ? styles.playedOverlay : styles.playedOverlayDisabled}>Played</p>
                			</div>
                			<p className={styles.gameGenre}>{data.genre}</p>
                			<p className={styles.gameDescription}>{data.description}</p>

                			<div className={styles.moreDetailsHolder}>
                				<p className={styles.gameDev}>{data.developer}</p>
                				<p className={styles.gameRelease}>{data.release_date}</p>
                			</div>
                		</div>
                		<div className={styles.playBtnHolder}>
                			<Link href={ isRps ? "/game-page" : "/" + gameId +"/play"}>
                				<button className={styles.playNowBtn}>PLAY NOW</button>
                			</Link>
                		</div>
                	</div>
                </section>
			}
		</>
	);
}

export default GameDetailsPage;