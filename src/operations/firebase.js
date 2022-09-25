import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBnKekJyl4bMJhWzAAeVv-f1zs6esgItoo",
  authDomain: "my168plan.firebaseapp.com",
  projectId: "my168plan",
  storageBucket: "my168plan.appspot.com",
  messagingSenderId: "513050646166",
  appId: "1:513050646166:web:17a9f13c4b00239a3814b7",
  measurementId: "G-YEX7BE16NZ",
  databaseURL: "https://my168plan-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

export {db}

