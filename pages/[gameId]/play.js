import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/playPage.module.css';

import jwtDecode from 'jwt-decode';
import getCookie from '../../utils/getCookie';

import firebaseApp from '../../services/firebase';


const db = firebaseApp.firestore();

function PlayPage() {

    const navigate = useRouter();
    const gameId = navigate.query.gameId;

    const [isPlaying, setIsPlaying] = useState(true);
    const [cookie, setCookie] = useState(null);

    const [userHistory, setUserHistory] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (!getCookie('token')) {
            navigate.push('/login')
        }
        const theCookie = getCookie('token');
        setCookie(theCookie);
    }, [])

    useEffect(() => {
        if (cookie) {
            setTimeout(() => {
                setIsPlaying(false);
                getGameHistory();
            }, 1500)
        }
    }, cookie)

    function getGameHistory() {
        const decoded = jwtDecode(cookie);

        db.collection('users').get().then(querrySnapShot => {
            if (!querrySnapShot) {
                throw Error('failed to get data')
            }
            querrySnapShot.forEach(e => {

                if (e.data().userUid === decoded.user_id) {
                    setUserHistory(e.data().gameHistory);
                    setUserId(e.id);
                }
            });

        }).catch(err => {
            console.log(err);
        });

    }

    useEffect(() => {
        if (userHistory) {
            setGameHistory();
        }
    }, [userHistory])

    function setGameHistory() {
        const decoded = jwtDecode(cookie);

        let gameHistory = userHistory;

        for (let i = 0; i < gameHistory.length; i++) {
            if (gameHistory[i] === gameId) {
                return
            }
        }

        gameHistory.push(gameId);

        db.collection("users").doc(userId).update(
            { gameHistory: gameHistory }
        );
    }

    return (
        <section className={styles.playPage}>
            {isPlaying ? 
                <>
                    <h1>Playing...</h1>
                </> : <>
                    <div className={styles.scoringOverlay}>

                    </div>
                </>
            }
        </section>
    )
}

export default PlayPage