// src/App.js
import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import About from './pages/About';
import Home from './pages/Home';
import RootLayout from './layout/RootLayout';
import ProjectLayout from './layout/ProjectLayout';


import P9 from './pages/projects/p9/P9';
import P8 from './pages/projects/p8/P8';
import P7 from './pages/projects/p7/P7';
import P6 from './pages/projects/p6/P6';
import P5 from './pages/projects/p5/P5';
import P4 from './pages/projects/p4/P4';
import P3 from './pages/projects/p3/P3';
import P2 from './pages/projects/p2/P2';
import P1 from './pages/projects/p1/P1';
import NotFound from './pages/NotFound';

const projects = [
  { path: 'p1', component: () => import('./pages/projects/p1/P1') },
  { path: 'p2', component: () => import('./pages/projects/p2/P2') },
  { path: 'p3', component: () => import('./pages/projects/p3/P3') },
  { path: 'p4', component: () => import('./pages/projects/p4/P4') },
  { path: 'p5', component: () => import('./pages/projects/p5/P5') },
  { path: 'p6', component: () => import('./pages/projects/p6/P6') },
  { path: 'p7', component: () => import('./pages/projects/p7/P7') },
];

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<Home/>}></Route>
      <Route path='about' element={<About/>}></Route>
      <Route path='projects' element={<ProjectLayout/>}>
          
          
          <Route path='p1' element={<P1/>}></Route>
          <Route path='p2' element={<P2/>}></Route>
          <Route path='p3' element={<P3/>}></Route>
          <Route path='p4' element={<P4/>}></Route>
          <Route path='p5' element={<P5/>}></Route>
          <Route path='p6' element={<P6/>}></Route>
          <Route path='p7' element={<P7/>}></Route>

          <Route path='p8' element={<P8/>}></Route>

          <Route path='p9' element={<P9/>}></Route>
      </Route> 
      <Route path='*' element={<NotFound/>}></Route>
   </Route>
  )
);


const App = () => {
  
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
};

export default App;
