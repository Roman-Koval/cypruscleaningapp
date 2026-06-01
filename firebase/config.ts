import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";

// ⚠️ Замени значения на свои из Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyB2a5uoXNJNP_c6UzeSB_GoixVlDRob7c8",
  authDomain: "cypruscleaningapp.firebaseapp.com",
  databaseURL: "https://cypruscleaningapp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cypruscleaningapp",
  storageBucket: "cypruscleaningapp.firebasestorage.app",
  messagingSenderId: "799755770827",
  appId: "1:799755770827:web:87885c03c377a6d481344e"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Экспорт сервисов
export const db = getFirestore(app);
export const auth = getAuth(app);
export const messaging = getMessaging(app);