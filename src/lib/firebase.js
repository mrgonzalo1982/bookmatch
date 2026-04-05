import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de BookMatch Umbral Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAjwooj-KUf9R2FSV1bOlBF_21lh6z11yc",
  authDomain: "bookmatch-aeccb.firebaseapp.com",
  projectId: "bookmatch-aeccb",
  storageBucket: "bookmatch-aeccb.firebasestorage.app",
  messagingSenderId: "674108907524",
  appId: "1:674108907524:web:5c3bd84e1be9f2be0dd551",
  measurementId: "G-T4WKRJ7TPK"
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
