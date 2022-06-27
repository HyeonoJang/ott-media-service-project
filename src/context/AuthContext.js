import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {setDoc,doc} from 'firebase/firestore'
import axios from 'axios';
import { token } from '../context/token';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function signUp(email, password) {
    console.log("=====================");
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, 'users', email), {
        savedShows: []
    })
  }

  function logIn(email, password) {
    axios(
      'http://localhost:8080/auth/login', {
      method: 'post',
      data: {
          email,
          password
      }
  })
    // return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
