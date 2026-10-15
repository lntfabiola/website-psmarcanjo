import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA67WGf3JxkmTxHCaABFwo0UEFGh9EAjqw",
  authDomain: "site-paroquiasaomiguel.firebaseapp.com",
  projectId: "site-paroquiasaomiguel",
  storageBucket: "site-paroquiasaomiguel.firebasestorage.app",
  messagingSenderId: "400834320391",
  appId: "1:400834320391:web:aa58a614245e3a42ef32a2"
};

// Evita o erro de "Duplicate App" verificando se já existe um app iniciado
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);