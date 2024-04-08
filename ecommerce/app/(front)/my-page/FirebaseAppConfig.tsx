import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBYa3C89ST4_TsNk8wLZa-AYKfFu3OghAM",
  authDomain: "ecommerce-11903.firebaseapp.com",
  projectId: "ecommerce-11903",
  storageBucket: "ecommerce-11903.appspot.com",
  messagingSenderId: "901379519957",
  appId: "1:901379519957:web:f82ac5b483a9113184395c",
  measurementId: "G-KH1B76P1MX",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
