import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpP0eknAHwqvuIYpOcqpMPtS4gDLH17hg",
  authDomain: "task-management-a3f77.firebaseapp.com",
  projectId: "task-management-a3f77",
  storageBucket: "task-management-a3f77.firebasestorage.app",
  messagingSenderId: "63748003365",
  appId: "1:63748003365:web:4747bea549fd5d7fe991cc",
  measurementId: "G-ETKRX3Z5ZC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export authentication and Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);