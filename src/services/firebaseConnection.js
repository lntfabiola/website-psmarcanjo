import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA67WGf3JxkmTxHCaABFwo0UEFGh9EAjqw",
  authDomain: "site-paroquiasaomiguel.firebaseapp.com",
  projectId: "site-paroquiasaomiguel",
  storageBucket: "site-paroquiasaomiguel.firebasestorage.app",
  messagingSenderId: "400834320391",
  appId: "1:400834320391:web:aa58a614245e3a42ef32a2",
  measurementId: "G-38L5RLH0Z5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };