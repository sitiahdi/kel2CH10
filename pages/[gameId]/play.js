import { useEffect, useState } from 'react';
import styles from '../../styles/playPage.module.css';



function PlayPage() {

    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsPlaying(false);
        }, 1500)
    }, [])

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