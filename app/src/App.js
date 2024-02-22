import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home'
import About from './pages/About'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
    </Route>
))


const App = () => {
  return (
     <RouterProvider router={router}/>
  );
};

export default App;
