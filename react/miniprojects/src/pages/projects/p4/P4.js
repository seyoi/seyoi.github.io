import './p4.css'
import { useState, } from 'react';
const P4 = () => {

    const [toggle, setToggle] = useState(false)
    const handdleToggle = function(){
      setToggle(!toggle)
      console.log(toggle)
    }
  return (<>
    <div className="hbg" onClick={handdleToggle}>
    <span>logo</span>
    <div className="p4wrapper">
        <button className='p4btn'>menu</button>
     <ul className={toggle ? 'hbg-list show' : 'hbg-list'} >
        <li>home</li>
        <li>about</li>
        <hr />
        <li>IG</li>
        <li>FB</li>
    </ul>
    </div>
    
    </div>
   
  <div className="p4container">
    <div className="p4logo">logo</div>
    <div className="p4menu">
        <span>home</span>
        <span>about</span>
    </div>
    <div className="p4sns">
        <span>IG</span>
        <span>FB</span>
    </div>
  </div>
  </>
  )
}
export default P4