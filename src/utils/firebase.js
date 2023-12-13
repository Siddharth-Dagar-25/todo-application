// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWqxR8QSjTivzu0mZq1HuAnVja7aATJEk",
  authDomain: "todo-application-56573.firebaseapp.com",
  projectId: "todo-application-56573",
  storageBucket: "todo-application-56573.appspot.com",
  messagingSenderId: "956813388335",
  appId: "1:956813388335:web:b15d1ed4b52a079f24f4da",
  measurementId: "G-CPBJZ9VB1E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
export { db };
export default app;
