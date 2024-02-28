import React, { useState, useRef } from 'react'
import './p7.css'
const P7 = () => {
 
  const [toggles, setToggles] = useState([false,false,false,false])
  const toggleAnswer = function (i){
    const newToggle = [...toggles]
    newToggle[i] = !newToggle[i]
    setToggles(newToggle)
    console.log(newToggle)
  }


  return (<>
        <div className="p7">
          <div className="p7-wrapper">
            <div className="p7-title">Questions</div>
            <div className="questions">
              <div className="question">
                <p>Lorem ipsum dolor sit amet.</p>
                <button onClick={()=>toggleAnswer(0)} className="p7-btn">Answer</button>
                <div className={toggles[0] ? 'answer show' : 'answer'}>
                <hr />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                </div>
              </div>
              <div className="question">
                <p>2Lorem ipsum dolor sit amet.</p>
                <button onClick={()=>toggleAnswer(1)} className="p7-btn">Answer</button>
                <div className={toggles[1] ? 'answer show' : 'answer'}>
                <hr />
                <p>2Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                </div>
              </div>

              <div className="question">
                <p>2Lorem ipsum dolor sit amet.</p>
                <button onClick={()=>toggleAnswer(2)} className="p7-btn">Answer</button>
                <div className={toggles[2] ? 'answer show' : 'answer'}>
                <hr />
                <p>2Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                </div>
              </div>

              <div className="question">
                <p>2Lorem ipsum dolor sit amet.</p>
                <button onClick={()=>toggleAnswer(3)} className="p7-btn">Answer</button>
                <div className={toggles[3] ? 'answer show' : 'answer'}>
                <hr />
                <p>2Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
  </>
  )
}

export default P7