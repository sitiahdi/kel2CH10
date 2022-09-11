import React, { useState, useEffect } from "react";
import {
	Document,
	Page,
	Text,
	View,
	Image,
	StyleSheet,
	BlobProvider,
} from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";

const Pdfreact = () => {
	return (
		<Document>
			<Page size={"A4"} style={style.page}>
				<Image
					alt="gambar"
					style={style.image}
					src="https://image.shutterstock.com/image-vector/illustration-3-hands-play-rock-260nw-1891805653.jpg"
				/>
				<View style={style.section}></View>
				<Text style={style.title}> System Requirements</Text>
				<View style={style.section}>
					<View>Recomended Requirements</View>
					<Text> OS: windows 10 </Text>
					<Text> Processor: inter core i5 / AMD Ryzen 3</Text>
					<Text> Memory: 8gb / 16 gb RAM </Text>
					<Text> Graphics: GTX 950 / RTX 3090 </Text>
					<Text> Directx: version 11 / version 12 </Text>
					<Text> Network: Broadband Internet Connection </Text>
					<Text> Storage: 10 GB </Text>
					<Text>
						{" "}
            SoundCard: DirectX compatible oundcard or onboard chipset
					</Text>
					<Text style={style.description}>
						{""}
            Suit atau Gamsit merupakan salah satu cara pengundian yang kerap
            ditemui di berbagai permainan yang bersifat game atau kerap
            dijadikan penentuan untuk memulai permainan lain. Cara Bermain dan
            Peraturan Gamsit atau suten atau sut atau pingsut atau lebih populer
            disebut dengan suit (suwit) dilakukan oleh dua orang dengan cara
            mengadu jari untuk menentukan siapa yang menang. Pola permainan suit
            atau gamsit dilakukan oleh kedua belah pihak, yang sebelumnya telah
            dibuat kesepakatan. Bersama terlebih dahulu. Biasanya dalam
            permainan anak-anak, pemenang suit dapat lebih dulu bermain atau
            terbebas
					</Text>
				</View>
			</Page>
		</Document>
	);
};

const PdfReader = () => {
	const [hasMounted, sethasMounted] = useState(false);
	const [download, setDownload] = useState(false);

	useEffect(() => {
		sethasMounted(true);
		return () => {
			sethasMounted(false);
		};
	}, []);

	return (
    <>
      {hasMounted ? (
      	<div style={{ width: "100vw", height: "100vh", marginTop: "75px" }}>
      		<BlobProvider document={Pdfreact()}>
      			{({ url }) => (
      				<iframe src={url} style={{ width: "100%", height: "100%" }} />
      			)}
      		</BlobProvider>
      	</div>
      ) : null}
    </>
	);
};

const style = StyleSheet.create({
	image: {
		height: "240px",
		width: "220px",
		alignSelf: "center",
		marginTop: "100px",
	},
	page: {
		backgroundColor: "white",
	},
	title: {
		fontSize: "24pt",
		fontWeight: "bold",
		marginLeft: "40px",
	},
	section: {
		margin: 40,
		padding: 8,
		fontSize: "12pt",
	},
	button: {
		marginTop: "100px",
	},
	description: {
		paddingTop: "20px",
		textAlign: "justify",
	},
});

// ReactPDF.renderToStream(<PdfReader />);
export default PdfReader;
