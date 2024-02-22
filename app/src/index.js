import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './coms/App'

const root = createRoot(document.getElementById('root'));

const Index = () => {
  return (
    <>
    <App/>
    </>
    
  )
}

root.render(<Index/>)
