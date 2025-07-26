// /client/src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS7HI3FygtwLPdrZ5FBKjw7dPLW-n_Pek",
  authDomain: "b2b-jewel.firebaseapp.com",
  projectId: "b2b-jewel",
  storageBucket: "b2b-jewel.firebasestorage.app",
  messagingSenderId: "942416268496",
  appId: "1:942416268496:web:26d3b1fcf30739a03162d5",
  measurementId: "G-516NERPQFS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
