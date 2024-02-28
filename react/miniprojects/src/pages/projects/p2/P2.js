import './p2.css'
import { useState,  } from 'react';

export default function P2 (){

    const [number, setNumber] = useState(0)
    
    let increase = () => {
        setNumber(prevNumber => prevNumber+1) 
    }
    let decrease = () => {
        if(number>0)
        setNumber(prevNumber => prevNumber-1) 
    }
    let reset = () => {
        setNumber(0) 
    }
    
    return(<>
        <div className="project">
            <div className="title">Counter</div>
            <div className="wrapper">
                <div className="number">{number}</div>
                <div className="buttons">
                    <button onClick={decrease}>decrease</button>
                    <button onClick={reset}>reset</button>
                    <button onClick={increase}>increase</button>
                </div>
            </div>
        </div>
    </>)
}

