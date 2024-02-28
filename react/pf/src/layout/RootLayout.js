
import {NavLink, Outlet} from 'react-router-dom';
import './layout.css'
const RootLayout = () => {
  return (<>

    
         <NavLink className='top-navlink' to='projects'>
         Projects
        </NavLink>
        <NavLink className='top-navlink' to='about'>
        About
        </NavLink>
 
    <main>
        <Outlet/>
    </main>
 </> )
}

export default RootLayout