import './p1.css';
import React, { useState } from 'react';

export default function P1 (){
//JS code
  // const container = document.getElementById('container');
         
  // const changeColor = function(){
  //    const characters = '0123456789ABCDEF'; let randomString = '#';
  //       for(let i= 0; i<6; i++){
  //         const randomIndex = Math.floor(Math.random()*characters.length)
  //         randomString += characters.charAt(randomIndex)
        
  //         container.style.background = `${randomString}`
  //         document.getElementById('color-display').innerText = `Background Color:#${randomString}`
  //       }
  // }

//React Code
const [backgroundColor, setBackgroundColor] = useState('#000000');

const changeColor = () => {
  const newColor = '#' + Math.floor(Math.random()*16777215).toString(16);
  
  setBackgroundColor(newColor);
}

const getFontColor = (color) => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#ffffff'; // 밝기에 따라 폰트 색상 조정
};
  
  return(<>

          {
  //JS code
          /* <p>Code Flipper</p>
      <div className="project1" id='container'>
        <div className="wrapper">
          <div className="color-display" >
           <p id='color-display'>Background Color:#</p>
          </div>
          <button onClick={changeColor}>Change Color</button>
        </div>
      </div> */
      
  }

    <div className="project1" style={{backgroundColor:backgroundColor}}>
      <div className="wrapper" >
        <div className="color-display" >
          <p id="color-display" style={{ color: getFontColor(backgroundColor)}}>{backgroundColor}</p>
        </div>
        <button onClick={changeColor}>Change Color</button>
      </div>
    </div>


  </>)
}

