"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/app/(front)/my-page/FirebaseAppConfig";
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "@/app/(front)/my-page/FirebaseAppConfig";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthStateProvider = ({ children }) => {
  const [userState, setUserState] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    setUserState((prev) => !prev);
    const unsubscribe = onAuthStateChanged(auth, setUserState);
    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing in:", error);
      setError(error.message);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;

      // 새로운 사용자의 정보를 users 컬렉션에 추가
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, { email: user.email });

      // 해당 사용자의 카트 서브컬렉션 생성
      const cartCollectionRef = collection(userDocRef, "cart");
      await addDoc(cartCollectionRef, { placeholder: true });

      console.log("Email SignUp Success:", user);
    } catch (error) {
      console.error("Email SignUp Error:", error);
      setError(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userState,
        signIn,
        signOutUser,
        handleSignUp,
        email,
        setEmail,
        password,
        setPassword,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
