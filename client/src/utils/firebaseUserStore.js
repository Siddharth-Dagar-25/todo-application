import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from './firebase'; 

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
