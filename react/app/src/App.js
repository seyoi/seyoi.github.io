import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Home from './pages/home/Home';
import About from './pages/about/About';
import RootLayout from './layouts/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route 
      index 
      element={<Home/>}
      />
      <Route path='/about' element={<About/>}/>
    </Route>
))


const App = () => {
  return (
     <RouterProvider router={router}/>
  );
};

export default App;
