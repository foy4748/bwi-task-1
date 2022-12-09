import firebaseApp from "../firebase.config.js";
import { useEffect, useState, createContext } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const auth = getAuth(firebaseApp);

export { auth };

const userContext = createContext(null);

export { userContext };

export default function AuthContextProvider({ children }) {
  const [activeUser, setActiveUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setActiveUser(user);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Authentication Handlers

  // Sign In using Email / Password Handler
  const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign Up using Email / Password Handler
  const registerWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Log Out
  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged Out");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const value = {
    some: "loggedin",
    activeUser,
    authLoading,
    loginWithEmail,
    registerWithEmail,
    logOut,
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}
