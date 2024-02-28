import './p5.css';

import { useState } from 'react';

export default function P5 (){
    
    const [toggle, setToggle] = useState(false)
    function handdleToggle (){
        setToggle(!toggle)

    }

    return(<>
        <div className="project5">
            <hr />
        <div className="p5wrapper">
        <div className="small">
        </div>
        <div className={toggle ? 'big show': 'big'}>
        <button onClick={handdleToggle}>slide menu</button>
        <ul className='p5ul'>
            <li>home</li>
            <li>about</li>
        </ul>
        </div>
        </div>
    
        </div>
    </>)
}

