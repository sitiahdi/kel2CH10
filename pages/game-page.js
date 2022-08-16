import { Container } from 'postcss';
import { Col } from 'react-bootstrap';
import { Grid } from 'swiper';
import Image from "next/image";
import Kertas from '../public/image/Kertas.png';
import Batu from '../public/image/Batu.png';
import Gunting from '../public/image/Gunting.png';
import Logo from '../public/image/Logo.png';
import Refresh from '../public/image/Refresh.png';
import { style } from 'dom-helpers';



function GamePage() {
    return (
        <div 
        style={{ backgroundColor:'#9C835F', height:'100vh', paddingLeft:'100px' }}>
            <div style={{ display:'flex', alignItems:'center', fontFamily:'monospace', fontSize:'30px', marginBottom:'30px' }}>
                <div>
                    <Image src={ Logo } alt='Home' />
                </div>
                <div style={{ padding:'20px' }}>
                    Batu Kertas Gunting
                </div>
            </div>
            <div style={{ display:'flex', justifyContent:'center', fontSize:'20px'}}>
                <div style={{backgroundColor:'yellowgreen', width:'200px', textAlign:'center' }} className='rounded-full'>
                    Score 0-0
                </div>
            </div>
            <div style={{ display:'flex', justifyContent:'space-evenly' }}>
                <div style={{width:'100px'}}>
                    <div style={{ display:'flex', justifyContent:'space-around' }}>Player 1</div>
                    <div style={{ padding:'20px' }}>
                        <Image src={Batu} />
                    </div>
                    <div style={{ padding:'20px' }}>
                        <Image src={Kertas} />
                    </div>
                    <div style={{ padding:'20px' }}>
                        <Image src={Gunting} />
                    </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', }}>
                    <div>
                        <h1 style={{ fontSize:'80px', color:'tomato', fontWeight:'bold ' }}>VS</h1>
                        <div style={{ display:'flex', justifyContent:'center' }}>
                            <Image src={Refresh} />
                        </div>
                    </div>
                </div>
                <div style={{width:'100px'}}>
                    <div style={{ display:'flex', justifyContent:'space-around' }}>Com</div>
                    <div style={{ padding:'20px' }}>
                        <Image src={Batu} />
                    </div>
                    <div style={{ padding:'20px' }}>
                        <Image src={Kertas} />
                    </div>
                    <div style={{ padding:'20px' }}>
                        <Image src={Gunting} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GamePage;