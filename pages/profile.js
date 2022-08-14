import { useEffect, useState } from 'react';
import styles from '../styles/profile.module.css';

import firebase from '../services/firebase';
import jwtDecode from 'jwt-decode';

import { useRouter } from 'next/router';
import getCookie from '../utils/getCookie';



const db = firebase.firestore()

function Profile() {

    const [data, setData] = useState(null);
    const [cookie, setCookie] = useState(null);

    const navigate = useRouter();
    
    useEffect(() => {
        const theCookie = getCookie('token');
        if (!theCookie) {
            navigate.push('/login')
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

        db.collection('users').get().then(querrySnapShot => {

            if (!querrySnapShot) {
                throw Error('failed to get data')
            }


            querrySnapShot.forEach(e => {

                if (e.data().userUid === decoded.user_id) {
                    const theData = {
                        username: e.data().username,
                        email: e.data().email,
                        score: e.data().score
                    }

                    setData(theData);
                }
            });

        }).catch(err => {

        });
    }

    if (!data) {
        return (
            <section className={styles.profilePage}>
                <h1 style={{textAlign: 'center', color: 'white', fontSize: '4rem'}}>Loading ...</h1>
            </section>
        )
    }

    return (
        <>
            {data &&
                <section className={styles.profilePage}>
                    <div className={styles.leftSide}>
        
                    </div>
                    <div className={styles.rightSide}>
                        <h1 className={styles.username}>User : {data.username}</h1>
                        <p className={styles.emailHolder}>email : {data.email}</p>
                        <p>score : {data.score}</p>
                    </div>
                </section>
            }
        </>
    )
}

export default Profile