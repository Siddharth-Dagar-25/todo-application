import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from './firebase'; 
import { useEffect, useState } from "react";

const createNewUser = (email, password, fullName) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Create a user document in Firestore
      const userDocRef = doc(db, "users", userCredential.user.uid);
      setDoc(userDocRef, { fullName, email });
    })
    .catch((error) => {
      console.error("Error creating user:", error);
    });
};
