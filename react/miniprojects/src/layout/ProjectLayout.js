import { NavLink, Outlet } from 'react-router-dom'; 
import './layout.css'

const ProjectLayout = (projects) => {
  return (<>
  
  
    <NavLink className='navlink' to='p1'>p1</NavLink>

    <NavLink className='navlink' to='p2'>p2</NavLink>
    
    <NavLink className='navlink'to='p3'>p3</NavLink>

    <NavLink className='navlink'to='p4'>p4</NavLink>

    <NavLink className='navlink'to='p5'>p5</NavLink>
    
    <NavLink className='navlink'to='p6'>p6</NavLink>

    <NavLink className='navlink'to='p7'>p7</NavLink>

    <NavLink className='navlink'to='p8'>p8</NavLink>


    <NavLink className='navlink'to='p9'>p9</NavLink>

    <main>
        <Outlet/>
    </main>

</>  )
}

export default ProjectLayout