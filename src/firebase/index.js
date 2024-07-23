// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_jrg4yYJi2-Tz6ZdZjVk-XN-2R9pVxn8",
  authDomain: "hs-react-33455.firebaseapp.com",
  projectId: "hs-react-33455",
  storageBucket: "hs-react-33455.appspot.com",
  messagingSenderId: "963573082744",
  appId: "1:963573082744:web:5894edd895fb2354dcdb8d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//* Kimlik doğrulama hizmetlerinin referansını al
export const auth = getAuth(app);
//^ Google sağlayıcısı kurulumu
export const provider = new GoogleAuthProvider();
//~ Veritabanının kurulumu
export const db = getFirestore(app);
