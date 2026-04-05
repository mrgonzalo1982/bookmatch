// Wipe script
import { initializeApp } from "firebase/app";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjwooj-KUf9R2FSV1bOlBF_21lh6z11yc",
  authDomain: "bookmatch-aeccb.firebaseapp.com",
  projectId: "bookmatch-aeccb",
  storageBucket: "bookmatch-aeccb.firebasestorage.app",
  messagingSenderId: "674108907524",
  appId: "1:674108907524:web:5c3bd84e1be9f2be0dd551"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function wipeAccount() {
  try {
    const cleanRut = "150685478";
    await deleteDoc(doc(db, "users", cleanRut));
    console.log("Account 150685478 completely annihilated from Firestore.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

wipeAccount();
