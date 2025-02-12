import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBFve1MHi_-y_yK7t6fQVU_qElV6fbHQck",
    authDomain: "council-president-vote.firebaseapp.com",
    projectId: "council-president-vote",
    storageBucket: "council-president-vote.firebasestorage.app",
    messagingSenderId: "1097271427889",
    appId: "1:1097271427889:web:18a06c2b8d80f3c7de6610",
    measurementId: "G-3Y0FT8M1PC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)