import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setHistory } from "../redux/gameHistory";
import styles from "../styles/gameListPage.module.css";

import firebaseApp from "../services/firebase";

import Carousel from "../components/carousel/Carousel";
import GameCard from "../components/game-card/GameCard";


import jwtDecode from "jwt-decode";
import getCookie from "../utils/getCookie";

const db = firebaseApp.firestore();

function GameListPage() {

	const [data, setData] = useState(null);
	const dispatch = useDispatch();

	const navigate = useRouter();

	const [carouselData, setCarouselData] = useState(null);
	const [recommendationData, setRecommendationData] = useState(null);
	const [strategyData, setStrategyData] = useState(null);
	const [shooterData, setShooterData] = useState(null);

	const [cookie, setCookie] = useState(null);

	useEffect(() => {
		const theCookie = getCookie("token");
		if (!theCookie) {
			navigate.push("/login");
		}
		setCookie(theCookie);
	}, []);

	useEffect(() => {
		if (cookie) {
			getData();
			setGameHistory();
		}
	}, [cookie]);

	function getData() {

		db.collection("game_list").get().then(querySnapShot => {

			if (!querySnapShot) {
				throw Error("failed to get data");
			}

			const allData = [];
			querySnapShot.forEach(e => {
				const theData = {
					id: e.id,
					carousel: e.data().carousel,
					description: e.data().description,
					developer: e.data().developer,
					genre: e.data().genre,
					release_date: e.data().release_date,
					thumbnail: e.data().thumbnail,
					title: e.data().title
				};
				allData.push(theData);
			});

			if (allData.length === 0) {
				throw Error("failed to get data");

			} else {
				setData(allData);
			}

		}).catch(err => {
			setData("err");
			console.log(err);
		});
	}

	function getSectionData(data) {

		const carouselArr = [];
		for (let i = 0; i < data.length; i++) {
			if (data[i].carousel) {
				carouselArr.push(data[i]);
			}
		}
		setCarouselData(carouselArr);

		const recommendationArr = [];
		for (let i = 0; i < data.length; i++) {
			if (data[i].id === "OW024DEfpwplQXf2zyIG") {
				recommendationArr.push(data[i]);
			}
		}
		setRecommendationData(recommendationArr);

		const strategyArr = [];
		for (let i = 0; i < data.length; i++) {
			if (data[i].genre === "Strategy") {
				strategyArr.push(data[i]);
			}
		}
		setStrategyData(strategyArr);

		const shooterArr = [];
		for (let i = 0; i < data.length; i++) {
			if (data[i].genre === "Shooter") {
				shooterArr.push(data[i]);
			}
		}
		setShooterData(shooterArr);

	}

	useEffect(() => {
		if (data) {
			getSectionData(data);
		}
	}, [data]);


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

	if (!data) {
		return (
			<section style={{display: "flex", justifyContent: "center"}} className={styles.gameListPage}>
				<h1 style={{textAlign: "center", color: "white"}}>Loading ...</h1>
			</section>
		);
	}

	return (
		<section className={styles.gameListPage}>
			{data !== "err" ?
                <>
                    <div className={styles.gameListPageMain}>
                    	{carouselData && <Carousel data = {carouselData} />}
                    	<div className={styles.sectionHolder}>
                    		<div className={styles.sectionHeader}>
                    			<h1>Recommendation</h1>
                    		</div>
                    		<ul className={styles.gameCardHolder}>
                    			{recommendationData && recommendationData.map((e, i) => {
                    				return <GameCard data={e} key={i} />;
                    			})}
                    		</ul>
                    	</div>
                    	<div className={styles.sectionHolder}>
                    		<div className={styles.sectionHeader}>
                    			<h1>Strategy Games</h1>
                    		</div>
                    		<ul className={styles.gameCardHolder}>
                    			{strategyData && strategyData.map((e, i) => {
                    				return <GameCard data={e} key={i} />;
                    			})}
                    		</ul>
                    	</div>
                    	<div className={styles.sectionHolder}>
                    		<div className={styles.sectionHeader}>
                    			<h1>Shooter Games</h1>
                    		</div>
                    		<ul className={styles.gameCardHolder}>
                    			{shooterData && shooterData.map((e, i) => {
                    				return <GameCard data={e} key={i} />;
                    			})}
                    		</ul>
                    	</div>

                    	<div className={styles.sectionHolder}>
                    		<div className={styles.sectionHeader}>
                    			<h1>Other Games</h1>
                    		</div>
                    		<ul className={styles.gameCardHolderAll}>
                    			{data.map((e, i) => {
                    				return <GameCard data={e} key={i} />;
                    			})}
                    		</ul>
                    	</div>
                    </div>
                </> : <>
                    <h1 style={{textAlign: "center", color: "white"}}>Try Again ...</h1>
                </>
			}
		</section>
	);
}

export default GameListPage;