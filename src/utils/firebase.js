// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqep8tkRjUXFd7z6ggic3CoK1c0QZfVik",
  authDomain: "netflix-gpt-75699.firebaseapp.com",
  projectId: "netflix-gpt-75699",
  storageBucket: "netflix-gpt-75699.firebasestorage.app",
  messagingSenderId: "20825167952",
  appId: "1:20825167952:web:41744b4ab0e3aaf2f85955",
  measurementId: "G-PE2TZEQWJ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
