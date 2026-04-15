import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAaPNA-ney6KHmb9SjS7CJDP_c2KUDwvVU",
  authDomain: "taiwanpop-b906b.firebaseapp.com",
  projectId: "taiwanpop-b906b",
  storageBucket: "taiwanpop-b906b.firebasestorage.app",
  messagingSenderId: "430751491953",
  appId: "1:430751491953:web:94e649ec62e5fe25cc38d0",
  measurementId: "G-8K3B9PS5S7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
