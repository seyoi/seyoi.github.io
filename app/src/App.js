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
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaBmEnQzintOIqSd3SpMJ5Cyhurlh3PuU",
  authDomain: "ozoz-d73ae.firebaseapp.com",
  projectId: "ozoz-d73ae",
  storageBucket: "ozoz-d73ae.appspot.com",
  messagingSenderId: "775649749579",
  appId: "1:775649749579:web:646694ed46cb885947fbce",
  measurementId: "G-SX77DEY0TL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const loader = async () => {
  try {
    const res = await fetch(`https://firebasestorage.googleapis.com/v0/b/ozoz-d73ae.appspot.com/o/data.json?alt=media&token=b7fbab42-45fc-417c-87a3-ed7f32f25601`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // 빈 배열 또는 다른 기본값을 반환하여 데이터 로딩 실패 시 화면에 표시할 수 있도록 합니다.
  }
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route 
      index 
      element={<Home/>}
      loader={loader}
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
