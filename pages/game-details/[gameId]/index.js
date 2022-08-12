import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/dist/client/link';
import styles from '../../../styles/gameDetails.module.css'

import firebaseApp from '../../../services/firebase';

const db = firebaseApp.firestore();



function GameDetailsPage() {

    const [data, setData] = useState(null);
    const [btnActive, setBtnActive] = useState(false);

    const router = useRouter();
    const gameId = router.query.gameId;

    useEffect(() => {
        if (gameId) {
            getData();
            console.log(gameId);
        }
    }, [gameId]);

    function getData() {

        db.collection('game_list').doc(gameId).get().then(querySnapShot => {

            if (gameId === 'OW024DEfpwplQXf2zyIG') {
                setBtnActive(true);
            }

            if (!querySnapShot) {
                throw Error('failed to get data');
            }
            console.log(querySnapShot.data());

            const theData = {
                id: querySnapShot.id,
                carousel: querySnapShot.data().carousel,
                description: querySnapShot.data().description,
                developer: querySnapShot.data().developer,
                genre: querySnapShot.data().genre,
                release_date: querySnapShot.data().release_date,
                thumbnail: querySnapShot.data().thumbnail,
                title: querySnapShot.data().title
            }

            if (!theData) {
                throw Error('failed to get data');

            } else {
                setData(theData);
            }

        }).catch(err => {
            console.log(err);
        });
    }



    if (!data) {
        return (
            <section className={styles.gameDetailsPage}>
                <h1 style={{textAlign: 'center', color: 'white'}}>Loading ...</h1>
            </section>
        )
    }

    return (
        <>
            {data && 
                <section className={styles.gameDetailsPage}>
                    <div className={styles.leftSide}>
                        <div className={styles.imageHolder}>
                            <img className={styles.gameImage} src={data.thumbnail} alt='game-image' />
                        </div>
                        <div className={styles.backBtnHolder}>
                            <Link href={'/game-list'}>
                                <button className={styles.backBtn}>Back</button>
                            </Link>
                        </div>
                    </div>

                    <div className={styles.rightSide}>
                        <div className={styles.descriptionHolder}>
                            <h1 className={styles.gameTitle}>{data.title}</h1>
                            <p className={styles.gameGenre}>{data.genre}</p>
                            <p className={styles.gameDescription}>{data.description}</p>

                            <div className={styles.moreDetailsHolder}>
                                <p className={styles.gameDev}>{data.developer}</p>
                                <p className={styles.gameRelease}>{data.release_date}</p>
                            </div>
                        </div>
                        <div className={styles.playBtnHolder}>
                            {btnActive ?
                                <>
                                    <button className={styles.playNowBtn}>PLAY NOW</button>
                                </> : <>
                                    <button className={styles.playNowBtnDisabled}>PLAY NOW</button>
                                </>
                            }
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default GameDetailsPage