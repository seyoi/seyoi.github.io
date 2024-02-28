import './p3.css';
import data from './data.json';

import { useState, } from 'react';

export default function P3 (){

    
    const [profile, setProfile] = useState(0)
   
    const rightArrow = '>';
    const leftArrow = '<';
    function increase (){
       
        setProfile(prevProfile => prevProfile +1);
        console.log(profile);
        if(profile ===3 )setProfile(0)
    }
    function decrease (){
        
        setProfile(profile -1);
        console.log(profile);
        if(profile === 0)setProfile(3)
    }
    
    return(<>
         <div className="project">
            <div className="title">Review</div>
            <div className="wrapper">
                <div className="profile">
                    <img src={data[profile].img} alt="" />
                    <p>{data[profile].name}</p>
                    <p>{data[profile].job}</p>
                    <p>{data[profile].desc}</p>
                </div>
                <div className="buttons">
                    <button onClick={decrease}>{leftArrow}</button>
                    {/* <button onClick={reset}>Suprise me</button> */}
                    <button onClick={increase}>{rightArrow}</button>
                </div>
            </div>
        </div>

    </>)
}

