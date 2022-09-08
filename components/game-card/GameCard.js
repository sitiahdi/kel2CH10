/* eslint-disable no-undef */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Link from "next/link";
import style from "./gameCard.module.css";

import getCookie from "../../utils/getCookie";

import { useSelector } from "react-redux";

function GameCard(props) {

	const userGameHistory = useSelector(state => state.gameHistory.history);

	const [data, setData] = useState(null);
	const [cookie, setCookie] = useState(null);
	const [isPlayed, setIsPlayed] = useState(false);

	useEffect(() => {
		if (props.data) {
			const theCookie = getCookie("token");
			if (!theCookie) {
				navigate.push("/login");
			}
			setCookie(theCookie);
			setData(props.data);
		}
	}, [props.data]);

	useEffect(() => {
		if (cookie) {
			checkPlayed();
		}
	}, [cookie]);

	function checkPlayed() {
		userGameHistory.forEach(e => {
			if (e === data.id) {
				setIsPlayed(true);
			}
		});
	}

	return (
		<>
			{data &&
                <Link href={"/game-details/" + data.id}>
                	<li className={style.gameCard}>
                		<div className={style.gameCardMain}>
                			<div className={isPlayed ? style.isPlayedOverlay : style.isPlayedOverlayDisabled}>Played</div>
                			<div className={style.gameCardOverlay}>
                				<div style={{height: "70%"}}></div>
                				<div className={style.gameCardTitleHolder}>
                					<p>{data.title}</p>
                				</div>
                			</div>
                			<img src={data.thumbnail} className={style.gameCardImg} alt='game card'></img>
                		</div>
                	</li>
                </Link>
			}
		</>
	);
}

export default GameCard;