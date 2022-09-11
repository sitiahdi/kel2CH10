import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAqRoF_peP4UDiI5NUShSh1K5EdNsNPBgA",
	authDomain: "binarchal9-b5d9f.firebaseapp.com",
	databaseURL: "https://binarchal9-b5d9f-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "binarchal9-b5d9f",
	storageBucket: "binarchal9-b5d9f.appspot.com",
	messagingSenderId: "945906490653",
	appId: "1:945906490653:web:bada437c89b4e792e6d5f4",
	measurementId: "G-XEFWZVDEK2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;