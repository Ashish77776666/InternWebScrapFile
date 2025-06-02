import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCtRNDLsXdXpKdQ3-VoHD6IFEjpvWHjkwQ",
  authDomain: "internwebscraper.firebaseapp.com",
  projectId: "internwebscraper",
  storageBucket: "internwebscraper.firebasestorage.app",
  messagingSenderId: "277519899120",
  appId: "1:277519899120:web:452125ae90afec17222535",
  databaseURL : "https://internwebscraper-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

export const app = initializeApp(firebaseConfig);