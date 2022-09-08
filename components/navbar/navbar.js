import React from "react";
import Image from "next/image";
import style from "./navbar.module.css";
import Link from "next/link";
import firebase from "../../services/firebase";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { selectName, setLogout, setName } from "../../redux/name";

import getCookie from "../../utils/getCookie";
import jwtDecode from "jwt-decode";
import firebaseApp from "../../services/firebase";

import unknownUserImg from "../../public/image/unknownUser.png";
import { setPict } from "../../redux/profilePict";
import Canvas from "../canvas/canvas";

function Navbar() {
  const auth = getAuth(firebase);
  const dispatch = useDispatch();
  const user = useSelector(selectName);
  const profilePict = useSelector((state) => state.profilePict.pict);
  const db = firebaseApp.firestore();

  React.useEffect(() => {
    const cookie = getCookie("token");

    if (!cookie) {
      return;
    }
    const decoded = jwtDecode(cookie);

    db.collection("users")
      .get()
      .then((querrySnapShot) => {
        if (!querrySnapShot) {
          throw Error("failed to get data");
        }

        querrySnapShot.forEach((e) => {
          if (e.data().userUid === decoded.user_id) {
            dispatch(setName(e.data().username));
            dispatch(setPict(e.data().pict));
          }
        });
      })
      .catch((err) => {
        alert(err);
      });
  }, [dispatch, db]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        document.cookie.split(";").forEach((c) => {
          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        dispatch(setLogout);
        window.location.href = "/";
        console.log("User logged out");
      })
      .catch((error) => console.log(error.massage));
  };
  return (
    <div>
      <nav className={`navbar fixed-top navbar-expand-lg navbar-dark py-lg-3 px-sm-5 px-lg-2 px-3 ${style.navbar}`}>
        <div className="container-fluid">
          <Link href="/">
            <a className={`navbar-brand ms-lg-5 ps-lg-5 me-lg-5 ${style.brand}`}>PLAY</a>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className={`navbar-nav text center ms-xl-auto ps-lg-auto me-lg-auto ${style.link}`}>
              <li className="nav-item ms-lg-4">
                <Link href="/game-list">
                  <a className={`${style.link}`}>GAME</a>
                </Link>
              </li>
              <li className="nav-item ms-lg-4">
                <Link href="/moments">
                  <a className={`${style.link}`}>MOMENTS</a>
                </Link>
              </li>
              <li className="nav-item ms-lg-4">
                <Link href="/#features">
                  <a className={`${style.link}`}>FEATURES</a>
                </Link>
              </li>
              <li className="nav-item ms-lg-4">
                <Link href="/#quotes">
                  <a className={`${style.link}`}>REVIEW</a>
                </Link>
              </li>
              <li className="nav-item ms-lg-4">
                <Link href="/#news">
                  <a className={`${style.link}`}>NEWS</a>
                </Link>
              </li>
              <li className="nav-item ms-lg-4">
                <Link href="/specification">
                  <a className={`${style.link}`}>SPECIFICATION</a>
                </Link>
              </li>
            </ul>
            {user.payload.name.name ? (
              <ul className={`navbar-nav text center me-lg-5 pe-lg-5 ${style.link}`}>
                <li className="nav-item">
                  <Link href={"/profile"}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <div className={style.profilePictHolder}>
                        {profilePict && profilePict !== "" ? (
                          <>
                            <img src={profilePict} />
                          </>
                        ) : (
                          <>
                            <Image src={unknownUserImg} />
                          </>
                        )}
                      </div>
                      <a className={`${style.link} text-warning`}>{user.payload.name.name}</a>
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={() => handleLogout()}>
                    <a className={`${style.link} text-danger ms-lg-4`}>LOGOUT</a>
                  </button>
                </li>
              </ul>
            ) : (
              <ul className={`navbar-nav text center me-lg-5 pe-lg-5 ${style.link}`}>
                <li className="nav-item">
                  <Link href="/Register">
                    <a className={`${style.link}`}>REGISTER</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/login">
                    <a className={`${style.link} ms-lg-3`}>LOGIN</a>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      <Canvas style={{ position: "sticky" }} />
    </div>
  );
}

export default Navbar;
