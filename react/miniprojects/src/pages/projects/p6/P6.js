import React, { useState, useRef } from 'react'
import './p6.css'


const P6 = () => {

    const [modal, setModal] = useState(false)
    const modalShow = useRef()
    const modalBG = useRef()
    function controlModal () {
        setModal(!modal)
    }
    function clickBG (e) {
        if(modal && modalShow.current !== e.target && modalBG.current === e.target) setModal(!modal)
        console.log(e.target)
    }
  return (<>
  <div className="p6"  ref={modalBG} onClick={clickBG}>
   <button onClick={controlModal} className="p6-btn">open modal</button>
   <div ref={modalShow} className={modal ? 'p6-modal show' : 'p6-modal'}>
    <div onClick={controlModal} className="close-btn">x</div>
    <div className="modal-content">content</div>
   </div>
  </div>
  
  </>
  )
}

export default P6