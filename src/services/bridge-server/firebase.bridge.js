import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/**
 * Firebase config
 * AMAN untuk backend ringan / bridge
 * Tidak pakai Analytics
 */
const firebaseConfig = {
  apiKey: "AIzaSyBRNJxdd-Xq1_qIbMHVflqD1wPsyNagc4A",
  authDomain: "tesdhtt.firebaseapp.com",
  projectId: "tesdhtt",
  storageBucket: "tesdhtt.firebasestorage.app",
  messagingSenderId: "522121365140",
  appId: "1:522121365140:web:aebadafe6131cfcb0bd681",
};

// Init sekali saja
const app = initializeApp(firebaseConfig);

// EXPORT KHUSUS FIRESTORE
export const firestore = getFirestore(app);
