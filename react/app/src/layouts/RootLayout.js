import React from 'react'
import { NavLink , Outlet} from 'react-router-dom';


const RootLayout = () => {
  return (
    <>
    <div className="root-layout">
        <nav>
        <NavLink className={'nav-home'} to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        </nav>

    </div>
    <main className='outlet'>
        <Outlet/>
    </main></>
  )
}

export default RootLayout;