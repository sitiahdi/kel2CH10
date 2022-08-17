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
import { useId, useState } from 'react';



function GamePage() {
    function handleClick() {
        window.location.reload();
    }

    function batuOnClick() {
        var element = document.getElementById('playerWin');
        var value = element.innerHTML;
        document.getElementById('playerKertas').style.backgroundColor= '#9C835F';
        document.getElementById('playerGunting').style.backgroundColor= '#9C835F';

        ++value;

        console.log(value);
        document.getElementById('playerWin').innerHTML = value;
        document.getElementById('playerBatu').style.backgroundColor= 'red';
    }
    function kertasOnClick() {
        var element = document.getElementById('playerWin');
        var value = element.innerHTML;
        document.getElementById('playerBatu').style.backgroundColor= '#9C835F';
        document.getElementById('playerGunting').style.backgroundColor= '#9C835F';

        ++value;

        console.log(value);
        document.getElementById('playerWin').innerHTML = value;
        document.getElementById('playerKertas').style.backgroundColor= 'red';
    }
    function guntingOnClick() {
        var element = document.getElementById('playerWin');
        var value = element.innerHTML;
        document.getElementById('playerBatu').style.backgroundColor= '#9C835F';
        document.getElementById('playerKertas').style.backgroundColor= '#9C835F';

        ++value;

        console.log(value);
        document.getElementById('playerWin').innerHTML = value;
        document.getElementById('playerGunting').style.backgroundColor= 'red';
    }

    function comOnClick() {
        var element = document.getElementById('comWin');
        var value = element.innerHTML;

        ++value;

        console.log(value);
        document.getElementById('comWin').innerHTML = value;
    }

    //

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
                <div 
                style={{ display:'flex', justifyContent:'center', backgroundColor:'yellowgreen', width:'200px' }} 
                className='rounded-full'>
                    <h1 id='playerWin'>0</h1>
                    -
                    <h1 id='comWin'>0</h1>
                </div>
            </div>
            <div 
            style={{ display:'flex', justifyContent:'space-evenly' }}>
                <div 
                style={{width:'100px'}}>
                    <div style={{ display:'flex', justifyContent:'space-around' }}>Player 1</div>
                    <div 
                    id='playerBatu'
                    className='bg-#9C835F-500 hover:bg-red-700 rounded-full'
                    style={{ padding:'20px' }}
                    onClick={ batuOnClick }
                    value='1'>
                        <Image src={Batu} />
                    </div>
                    <div 
                    id='playerKertas'
                    className='bg-#9C835F-500 hover:bg-red-700 rounded-full'
                    style={{ padding:'20px' }}
                    onClick={ kertasOnClick }
                    value='2'>
                        <Image src={Kertas} />
                    </div>
                    <div 
                    id='playerGunting'
                    className='bg-#9C835F-500 hover:bg-red-700 rounded-full'
                    style={{ padding:'20px' }}
                    onClick={ guntingOnClick }
                    value='3'>
                        <Image src={Gunting} />
                    </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', }}>
                    <div>
                        <h1 style={{ fontSize:'80px', color:'tomato', fontWeight:'bold ' }}>VS</h1>
                        <div onClick={handleClick} style={{ display:'flex', justifyContent:'center' }}>
                            <Image src={Refresh} />
                        </div>
                    </div>
                </div>
                <div 
                onClick={comOnClick}
                style={{width:'100px'}}>
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