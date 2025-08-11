import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBmdmGi1QWnTWiimqCrOaT4ZR-gi5xH1Vg",
    authDomain: "nebulae-84df9.firebaseapp.com",
    projectId: "nebulae-84df9",
    storageBucket: "nebulae-84df9.firebasestorage.app",
    messagingSenderId: "798461561621",
    appId: "1:798461561621:web:840c6194672ec3bd64b71c",
    measurementId: "G-279ZLKZL1R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export default app;
