import React from "react";
import firebase from "../services/firebase";
import style from "../styles/Register.module.css";
import {getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from 'next/dist/client/link';
import { useRouter } from "next/router"

const Login = () => {
    const navigate = useRouter();
    const [email, setEmail] = React.useState ("");
    const [password, setPassword] = React.useState ("");

    const auth = getAuth(firebase);
    const handleLogin = (event) => {
        event.preventDefault();
        if (email.length === 0 || password.length === 0) {
            alert ("do not leave form blank")
        } else {
            signInWithEmailAndPassword (auth, email, password). then (v => {
                document.cookie = v.user.accessToken
            });
        }
        navigate.push("/")
        
        
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
    )
};

export default Login;