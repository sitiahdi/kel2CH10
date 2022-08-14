import { useEffect, useState } from 'react'
import Link from 'next/link';
import style from './gameCard.module.css'



function GameCard(props) {

    const [data, setData] = useState(null);
    const [isPlayed, setIsPlayed] = useState(true);

    useEffect(() => {
        if (props.data) {
            setData(props.data);
        }
    }, [props.data])

    return (
        <>
            {data &&
                <Link href={'/game-details/' + data.id}>
                    <li className={style.gameCard}>
                        <div className={style.gameCardMain}>
                            <div className={isPlayed ? style.isPlayedOverlay : style.isPlayedOverlayDisabled}>Played</div>
                            <div className={style.gameCardOverlay}>
                                <div style={{height: '70%'}}></div>
                                <div className={style.gameCardTitleHolder}>
                                    <p>{data.title}</p>
                                </div>
                            </div>
                            <img src={data.thumbnail} className={style.gameCardImg} alt='game card'></img>
                        </div>
                    </li>
                </Link>
            }
        </>
    )
}

export default GameCard