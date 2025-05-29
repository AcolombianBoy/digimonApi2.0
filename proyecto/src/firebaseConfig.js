import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDs1Cw4b6oHZT2l1eoH6pr2GaAFD7Tbo9c",
    authDomain: "digimonapi2-0.firebaseapp.com",
    projectId: "digimonapi2-0",
    storageBucket: "digimonapi2-0.firebasestorage.app",
    messagingSenderId: "259760830559",
    appId: "1:259760830559:web:3b8d5649ccf0dc4041c3ea"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ ¡Esto es necesario!

export { auth, db };