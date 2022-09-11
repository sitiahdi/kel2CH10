import React, {useEffect} from "react";
import firebase from "../services/firebase";
import style from "../styles/Register.module.css";
import {getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import { data } from "autoprefixer";

const db = firebase.firestore();
const auth = getAuth(firebase);

const Register = () => {
	const navigate = useRouter();

	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [email, setEmail] = React.useState("");

	// get data from database
	// useEffect(() => {
	//     db.collection("users").get().then (querySnapShot => {
	//         querySnapShot.forEach (e => {
	//             console.log (e.data())
	//         })    
	//     }) 
	// }, [])
    

	const handleRegister = async (event) => {
		event.preventDefault();
		try {
			if (email.length === 0 || password.length === 0 || username.length === 0) {
				alert (" do not leave blank..");
			} else { 
				const userData = await createUserWithEmailAndPassword (auth, email, password );
				db.collection("users").add ({
					username, 
					email,
					userUid: userData.user.uid,
					score : 0,
					gameHistory: [],
					pict: ""
				}) .then(data => {navigate.push ("/login");});  
            
			}} catch (error) {
			alert ("The password must consist of 6 digits and letters or a combinationThe password must consist of 6 digits or letters or a combination"); 
			console.error(error);
		}}; 

	// function Register () {
	//     const [email, setEmail] = useState ("");
	//     const [password, setPassword] = useState ("");
	//     const [user, setUser] = useState ("");

	//     onAuthStateChanged (auth, (currentUser) => {
	//         setUser(currentUser);
	//     });

	//     const Register = async () => {
	//         try {
	//           const user = await createUserWithEmailAndPassword(
	//             auth,
	//             email,
	//             password
	//           );
	//           console.log(user);
	//         } catch (error) {
	//           console.log(error.message);
	//         }
	//       };


	return (
		<div className = {style.wrapper}>
			<div className ={style.container}> 
				<h1>Sign Up</h1>
				<form onSubmit={(v) => handleRegister(v)}>
					<h3>Username</h3>
					<input type="Username" placeholder="write your username here" onChange={(v)=> setUsername (v.target.value) }/>
					<h3>Email</h3>
					<input type="Email" placeholder="write your email here" onChange={(v)=> setEmail (v.target.value) }/>
					<h3>Password</h3>
					<input type="Password" placeholder="write your password here" onChange={(v)=> setPassword (v.target.value) }/>
					<input type="submit" />
					<Link href={"/login"}>already have an account</Link>
    
				</form>
			</div>
		</div>
	);
};

export default Register;
    
