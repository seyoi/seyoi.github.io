import React from 'react'
import { NavLink , Outlet} from 'react-router-dom'


const RootLayout = () => {
  return (
    <>
    <div className="root-layout">
        <nav>

          <NavLink to='/'>Home</NavLink>

         <NavLink to='/about'>About</NavLink>
        </nav>

    </div>
    <main>
        <Outlet/>
    </main></>
  )
}

export default RootLayout