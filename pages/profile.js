import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/profile.module.css";
import Link from "next/link";

import firebase from "../services/firebase";
import jwtDecode from "jwt-decode";

import { useRouter } from "next/router";
import { getAuth, signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import getCookie from "../utils/getCookie";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setName } from "../redux/name";
import { setPict } from "../redux/profilePict";

import unknownUserImg from "../public/image/unknownUser.png";



const db = firebase.firestore();

function Profile() {

    const [data, setData] = useState(null);
    const [cookie, setCookie] = useState(null);
    const [changeOverlay, setChangeOverlay] = useState(0);
    const [loading, setLoading] = useState(false);

    const [previewSource, setPreviewSource] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [imgValue, setImgValue] = useState("");

    const [newName, setNewName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");

    const navigate = useRouter();
    const dispatch = useDispatch();
    const auth = getAuth(firebase);

    const username = useSelector(state => state.name.name);
    const profilePict = useSelector(state => state.profilePict.pict);
    
    useEffect(() => {
        const theCookie = getCookie("token");
        if (!theCookie) {
            navigate.push("/login");
        }
        setCookie(theCookie);
    }, []);
    
    useEffect(() => {
        if(cookie) {
            getData();
        }
    }, [cookie]);
    
    function getData() {
        const decoded = jwtDecode(cookie);
        
        db.collection("users").get().then(querrySnapShot => {
            
            if (!querrySnapShot) {
                throw Error("failed to get data");
            }
            
            
            querrySnapShot.forEach(e => {
                
                if (e.data().userUid === decoded.user_id) {
                    const theData = {
                        id: e.id,
                        username: e.data().username,
                        email: e.data().email,
                        score: e.data().score,
                        pict: e.data().pict
                    };
                    dispatch(setName(theData.username));
                    dispatch(setPict(theData.pict));
                    setData(theData);
                }
            });

        }).catch(err => {
            
        });
    }

    function handleChangeName(e) {
        e.preventDefault();
        
        if (newName === "") {
            return alert("input your new name");
        }
        db.collection("users").doc(data.id).update(
            { username: newName }
        );
        
        dispatch(setName(newName));
        setChangeOverlay(0);
        setNewName("");
    }

    function handleChangePassword(e) {
        e.preventDefault();
        const decoded = jwtDecode(cookie);
        
        signInWithEmailAndPassword(auth, decoded.email, oldPassword).then(e => {
            const user = auth.currentUser;
            updatePassword(user, newPassword).then(() => {
                setNewPassword("");
                setOldPassword("");
                setChangeOverlay(0);
            }).catch(err=> {
                alert(err);
            });
        }).catch(() => {
            alert("wrong password");
            setNewPassword("");
            setOldPassword("");
        });
    }

    function handleFileInputChange(e) {
        setImgFile(e.target.files[0]);
    }

    useEffect(() => {
        if (imgFile) {
            const reader = new FileReader();
            reader.readAsDataURL(imgFile);
            reader.onloadend = () => {
                setPreviewSource(reader.result);
            };
    
            setChangeOverlay(3);
        }
    }, [imgFile]);



    async function handlePictureSubmit(e) {
        e.preventDefault();
        setLoading(true);
        
        if (!imgFile) {
            alert("Try Again");
            return;
        }
        
        fetch("https://binar-ch10-server.herokuapp.com/api/upload", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pict: previewSource
            })
        }).then(res => {
            res.json().then(resData => {

                if (data.pict !== undefined) {
                    db.collection("users").doc(data.id).update(
                        { pict: resData.url }
                    );
                    dispatch(setPict(resData.url));
                } else {
                    db.collection("users").doc(data.id).add(
                        { pict: resData.url }
                    );
                    dispatch(setPict(resData.url));
                }
                setLoading(false);
            });
            setChangeOverlay(0);
            setImgFile(null);
        }).catch(err => {
            alert("Try Again");
            console.log(err);
        });

        setChangeOverlay(0);
        setImgFile(null);
    }

    function renderedChangeOverlay() {
        if (changeOverlay === 1) {
            return (
                <div className={styles.changeOverlay}>
                    <div className={styles.changeHolder}>
                        <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "white" }}>Change Name</h2>
                        <form onSubmit={(e) => handleChangeName(e)} style={{ display: "flex", flexDirection: "column" }}>
                            <div><input placeholder="new name" value={newName} type="text" onChange={(e) => setNewName(e.target.value)} /></div>
                            <div style={{ marginTop: "20px" }}><button className={styles.submitBtn} type="submit">Submit</button></div>
                        </form>
                        <button style={{ fontSize: "1.2rem", marginTop: "1rem" }} onClick={() => setChangeOverlay(0)} className={styles.backBtn}>Back</button>
                    </div>
                </div>
            );
        } else if (changeOverlay === 2) {
            return (
                <div className={styles.changeOverlay}>
                    <div className={styles.changeHolder}>
                        <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "white" }}>Change Password</h2>
                        <form onSubmit={(e) => handleChangePassword(e)} style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ marginBottom: "1rem" }}><input value={oldPassword} type="Password" placeholder="old password" onChange={(e) => setOldPassword(e.target.value)} /></div>
                            <div><input placeholder="new password" value={newPassword} type="Password" onChange={(e) => setNewPassword(e.target.value)} /></div>
                            <div style={{ marginTop: "20px" }}><button className={styles.submitBtn} type="submit">Submit</button></div>
                        </form>
                        <button style={{ fontSize: "1.2rem", marginTop: "1rem" }} onClick={() => setChangeOverlay(0)} className={styles.backBtn}>Back</button>
                    </div>     
                </div>
            );
        } else if (changeOverlay === 3) {
            return (
                <div className={styles.changeOverlay}>
                    <div className={styles.changeHolder}>
                        <h2 style={{ textAlign: "center", marginBottom: "2rem", color: "white" }}>Change Profile Picture</h2>
                        <div className={styles.previewImgHolder}>
                            <img src={previewSource} />
                        </div>
                        <form onSubmit={e => handlePictureSubmit(e)} style={{ display: "flex", flexDirection: "column" }}>
                            <div className={styles.changePictOverlayBtnHolder}>
                                <button style={{ fontSize: "1.2rem", marginTop: "1rem" }} onClick={() => { setChangeOverlay(0), setImgFile(null); }} className={styles.backBtn}>Back</button>
                                <div style={{ marginTop: "20px" }}><button className={styles.submitBtn} type="submit">Submit</button></div>
                            </div>
                        </form>
                    </div>     
                </div>
            );
        } else if (changeOverlay === 0) {
            return (
                <div style={{ display: "none" }}></div>
            );
        }
    }

    if (!data || loading) {
        return (
            <section className={styles.profilePage}>
                <div className={styles.profilePageContentHolder}>
                    <h1 style={{textAlign: "center", color: "white", fontSize: "4rem"}}>Loading ...</h1>
                </div>
            </section>
        );
    }

    return (
        <>
            {data &&
                <section className={styles.profilePage}>
                    <div style={{ height: "5rem", maxWidth: "100vw" }}></div>
                    {renderedChangeOverlay()}
                    <div className={styles.profilePageContentHolder}>
                        <div className={styles.leftSide}>
                            <div style={{ height: "90%" }}></div>
                            <div style={{ height: "10%", width: "100%", display: "flex", justifyContent: "center" }}>
                                <Link href={"/"}>
                                    <button className={styles.backBtn}>Back</button>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.rightSide}>
                            <div style={{ marginBottom: "5rem" }}>
                                <h1 className={styles.username}>User : {username}</h1>
                                <p style={{ color: "gray", cursor: "pointer" }} onClick={() => setChangeOverlay(1)} >change username</p>
                            </div>
                            <p className={styles.emailHolder}>email : {data.email}</p>
                            <p>score : {data.score}</p>
                            <p style={{ color: "gray", cursor: "pointer", marginTop: "3rem" }} onClick={() => setChangeOverlay(2)} >change password</p>

                            <div className={styles.profilePictureHolder}>
                                {profilePict && profilePict !== "" ?
                                    <>
                                        <img src={profilePict} />
                                    </> : <>
                                        <Image src={unknownUserImg} />
                                    </>
                                }
                                <form className={styles.changePictForm}>
                                    <div className={styles.changePictOverlay}>
                                        <p>CHANGE</p>
                                    </div>
                                    <input
                                        accept="image/png, image/gif, image/jpeg"
                                        className={styles.changePictBtn} 
                                        type={"file"} 
                                        name={"image"}
                                        value={imgValue}
                                        onChange={e => handleFileInputChange(e)} 
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    );
}


export default Profile;