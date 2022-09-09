import React, { useEffect } from "react";
import firebase from "../services/firebase";
import style from "../styles/Register.module.css";
import {getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import getCookie from "../utils/getCookie";
import { useDispatch } from "react-redux";
import { setName } from "../redux/name";
import { setPict } from "../redux/profilePict";


const db = firebase.firestore();
const Login = () => {
    
	const navigate = useRouter();
	const [email, setEmail] = React.useState ("");
	const [password, setPassword] = React.useState ("");

	useEffect(() => {
		const cookie = getCookie("token");
		if (cookie) navigate.push("/");
	}, []);

	const dispatch = useDispatch();
    
	const auth = getAuth(firebase);
	const handleLogin = (event) => {
		event.preventDefault();
		if (email.length === 0 || password.length === 0) {
			alert ("do not leave form blank");
		} else {
			signInWithEmailAndPassword (auth, email, password). then (v => {
                
				db.collection("users").get().then(querrySnapShot => {

					if (!querrySnapShot) {
						throw Error("failed to get data");
					}
					querrySnapShot.forEach(e => {
						if (e.data().userUid === v.user.uid) {
							dispatch(setName(e.data().username));
							dispatch(setPict(e.data().pict));
						}
					});
        
				}).catch(err => {
        
				});
				document.cookie = `token=${v.user.accessToken}`;

				navigate.push("/");
			}).catch(err => {
				alert("wrong email or password");
			});
		}
	};

	return (
		<div className = {style.wrapper}>
			<div className ={style.container}> 
				<h1>Login</h1>
				<form onSubmit={(v) => handleLogin(v)}>
					<h3>Email</h3>
					<input type="Email" placeholder="write your email here" onChange={(v)=> setEmail (v.target.value) }/>
                
					<h3>Password</h3>
					<input type="Password" placeholder="write your password here" onChange={(v)=> setPassword (v.target.value) }/>

					<input type="submit"/>
                
				</form>
			</div>
		</div>
	);
};

export default Login;