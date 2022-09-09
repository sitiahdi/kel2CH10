import { Container } from "postcss";
import { Col } from "react-bootstrap";
import { Grid } from "swiper";
import Image from "next/image";
import Kertas from "../public/image/kertas.png";
import Batu from "../public/image/batu.png";
import Gunting from "../public/image/gunting.png";
import Logo from "../public/image/logo.png";
import Refresh from "../public/image/refresh.png";
import { style } from "dom-helpers";
import { useId, useState } from "react";

function GamePage() {
	function handleClick() {
		window.location.reload();
	}

	let scorePlayer = 0;
	let scoreCom = 0;
	let random = null;

	function batuOnClick() {
		// var element = document.getElementById('playerWin');
		// var value = element.innerHTML;
		document.getElementById("playerKertas").style.backgroundColor = "#9C835F";
		document.getElementById("playerGunting").style.backgroundColor = "#9C835F";
		document.getElementById("playerBatu").style.backgroundColor = "red";

		random = Math.round(Math.random() * 3);
		console.log(random);
		document.getElementById("menang").style.display = "none";
		document.getElementById("kalah").style.display = "none";
		document.getElementById("seri").style.display = "none";
		document.getElementById("comBatu").style.backgroundColor = "#9C835F";
		document.getElementById("comKertas").style.backgroundColor = "#9C835F";
		document.getElementById("comGunting").style.backgroundColor = "#9C835F";

		if (random === 1) {
			console.log("Batu");
			document.getElementById("comBatu").style.backgroundColor = "red";
			document.getElementById("seri").style.display = "block";
		} else if (random === 2) {
			console.log("Kertas");
			document.getElementById("comKertas").style.backgroundColor = "red";
			document.getElementById("kalah").style.display = "block";
			++scoreCom;
			console.log(scoreCom);
			// ++value;
			// console.log(value);
			document.getElementById("comWin").innerHTML = scoreCom;
		} else {
			console.log("Gunting");
			document.getElementById("comGunting").style.backgroundColor = "red";
			document.getElementById("menang").style.display = "block";
			++scorePlayer;
			console.log(scorePlayer);
			// ++value;
			// console.log(value);
			document.getElementById("playerWin").innerHTML = scorePlayer;
		}
	}
	function kertasOnClick() {
		// var element = document.getElementById('playerWin');
		// var value = element.innerHTML;
		document.getElementById("playerBatu").style.backgroundColor = "#9C835F";
		document.getElementById("playerGunting").style.backgroundColor = "#9C835F";
		document.getElementById("playerKertas").style.backgroundColor = "red";

		random = Math.round(Math.random() * 3);
		console.log(random);
		document.getElementById("menang").style.display = "none";
		document.getElementById("kalah").style.display = "none";
		document.getElementById("seri").style.display = "none";
		document.getElementById("comBatu").style.backgroundColor = "#9C835F";
		document.getElementById("comKertas").style.backgroundColor = "#9C835F";
		document.getElementById("comGunting").style.backgroundColor = "#9C835F";

		if (random === 1) {
			console.log("Batu");
			document.getElementById("comBatu").style.backgroundColor = "red";
			document.getElementById("menang").style.display = "block";
			++scorePlayer;
			console.log(scorePlayer);
			// ++value;
			// console.log(value);
			document.getElementById("playerWin").innerHTML = scorePlayer;
		} else if (random === 2) {
			console.log("Kertas");
			document.getElementById("comKertas").style.backgroundColor = "red";
			document.getElementById("seri").style.display = "block";
		} else {
			console.log("Gunting");
			document.getElementById("comGunting").style.backgroundColor = "red";
			document.getElementById("kalah").style.display = "block";
			++scoreCom;
			console.log(scoreCom);
			// ++value;
			// console.log(value);
			document.getElementById("comWin").innerHTML = scoreCom;
		}
	}
	function guntingOnClick() {
		// var element = document.getElementById('playerWin');
		// var value = element.innerHTML;
		document.getElementById("playerBatu").style.backgroundColor = "#9C835F";
		document.getElementById("playerKertas").style.backgroundColor = "#9C835F";
		document.getElementById("playerGunting").style.backgroundColor = "red";

		random = Math.round(Math.random() * 3);
		console.log(random);
		document.getElementById("menang").style.display = "none";
		document.getElementById("kalah").style.display = "none";
		document.getElementById("seri").style.display = "none";
		document.getElementById("comBatu").style.backgroundColor = "#9C835F";
		document.getElementById("comKertas").style.backgroundColor = "#9C835F";
		document.getElementById("comGunting").style.backgroundColor = "#9C835F";

		if (random === 1) {
			console.log("Batu");
			document.getElementById("comBatu").style.backgroundColor = "red";
			document.getElementById("kalah").style.display = "block";
			++scoreCom;
			console.log(scoreCom);
			// ++value;
			// console.log(value);
			document.getElementById("comWin").innerHTML = scoreCom;
		} else if (random === 2) {
			console.log("Kertas");
			document.getElementById("comKertas").style.backgroundColor = "red";
			document.getElementById("menang").style.display = "block";
			++scorePlayer;
			console.log(scorePlayer);
			// ++value;
			// console.log(value);
			document.getElementById("playerWin").innerHTML = scorePlayer;
		} else {
			console.log("Gunting");
			document.getElementById("comGunting").style.backgroundColor = "red";
			document.getElementById("seri").style.display = "block";
		}
	}

	// function comOnClick() {
	//     var element = document.getElementById('comWin');
	//     var value = element.innerHTML;

	//     ++value;

	//     console.log(value);
	//     document.getElementById('comWin').innerHTML = value;
	// }

	//

	return (
		<div style={{ backgroundColor: "#9C835F", height: "100vh", paddingLeft: "100px" }}>
			<div style={{ display: "flex", alignItems: "center", fontFamily: "monospace", fontSize: "30px", marginBottom: "30px" }}>
				<div>
					<Image src={Logo} alt="Home" />
				</div>
				<div style={{ padding: "20px" }}>Batu Kertas Gunting</div>
			</div>
			<div style={{ display: "flex", justifyContent: "center", fontSize: "20px" }}>
				<div style={{ display: "flex", justifyContent: "center", backgroundColor: "yellowgreen", width: "200px" }} className="rounded-full">
					<h1 id="playerWin">{scorePlayer}</h1>-<h1 id="comWin">{scoreCom}</h1>
				</div>
			</div>
			<div style={{ display: "flex", justifyContent: "space-evenly" }}>
				<div style={{ width: "100px" }}>
					<div style={{ display: "flex", justifyContent: "space-around" }}>Player 1</div>
					<div id="playerBatu" className="bg-#9C835F-500 hover:bg-red-700 rounded-full" style={{ padding: "20px" }} onClick={batuOnClick} value="1">
						<Image src={Batu} />
					</div>
					<div id="playerKertas" className="bg-#9C835F-500 hover:bg-red-700 rounded-full" style={{ padding: "20px" }} onClick={kertasOnClick} value="2">
						<Image src={Kertas} />
					</div>
					<div id="playerGunting" className="bg-#9C835F-500 hover:bg-red-700 rounded-full" style={{ padding: "20px" }} onClick={guntingOnClick} value="3">
						<Image src={Gunting} />
					</div>
				</div>
				<div style={{ display: "flex", alignItems: "center" }}>
					<div>
						<div id="menang" style={{ display: "none" }}>
              Player WIN
						</div>
						<div id="kalah" className="rounded-full" style={{ display: "none" }}>
              Player LOSE
						</div>
						<div id="seri" className="rounded-full" style={{ display: "none" }}>
              DRAW
						</div>
						<h1 style={{ fontSize: "80px", color: "tomato", fontWeight: "bold " }}>VS</h1>
						<div onClick={handleClick} style={{ display: "flex", justifyContent: "center" }}>
							<Image src={Refresh} />
						</div>
					</div>
				</div>
				<div
					// onClick={comOnClick}
					style={{ width: "100px" }}
				>
					<div style={{ display: "flex", justifyContent: "space-around" }}>Com</div>
					<div id="comBatu" className="rounded-full" style={{ padding: "20px" }}>
						<Image src={Batu} />
					</div>
					<div id="comKertas" className="rounded-full" style={{ padding: "20px" }}>
						<Image src={Kertas} />
					</div>
					<div id="comGunting" className="rounded-full" style={{ padding: "20px" }}>
						<Image src={Gunting} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default GamePage;
