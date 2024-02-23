import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import './index.css'


const root = createRoot(document.getElementById('root'));

const Index = () => {
  return (
    <>

    <React.StrictMode>
      <App/>
    </React.StrictMode>
    
    </>
    
  )
}

root.render(<Index/>)
