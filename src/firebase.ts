// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAqNNyb9I-MIohnqh8GtGyvmn2MJt7MhvU",
  authDomain: "neo-tech-shop.firebaseapp.com",
  databaseURL: "https://neo-tech-shop-default-rtdb.firebaseio.com",
  projectId: "neo-tech-shop",
  storageBucket: "neo-tech-shop.firebasestorage.app",
  messagingSenderId: "908430837783",
  appId: "1:908430837783:web:0e52189240964b4002b452",
  measurementId: "G-PFNGK3ERWL"
};

// ❗ Asigură-te că ai introdus datele corecte din Firebase Console

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
