import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";
  
  
const root = createRoot(document.getElementById('root'));

const Index = () => {
  return (
    <>
    <App/>
    </>
    
  )
}

root.render(<Index/>)
