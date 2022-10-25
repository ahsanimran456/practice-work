import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, signOut ,createUserWithEmailAndPassword,signInWithEmailAndPassword , onAuthStateChanged,} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore,setDoc,doc,getDocs,getDoc,collection ,query,onSnapshot,addDoc,orderBy,where,  updateDoc,deleteField} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import {getStorage,ref,uploadBytesResumable,getDownloadURL,} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";  
const firebaseConfig = {
    apiKey: "AIzaSyDWOci-uhl9sNnqe68S-jx0uvH0qtqehwI",
    authDomain: "whatsapp-b630b.firebaseapp.com",
    projectId: "whatsapp-b630b",
    storageBucket: "whatsapp-b630b.appspot.com",
    messagingSenderId: "784524018623",
    appId: "1:784524018623:web:292d4a0b40c7c93ca8d70a",
    measurementId: "G-8X7SBTHGEQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// export auth 

export{app,auth,getAuth,signOut,orderBy ,createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged,where,query}
// firestore 

export{db,setDoc,doc,getDocs,getDoc,collection,onSnapshot,addDoc,  updateDoc, deleteField}
// storage 

export {getStorage,ref,uploadBytesResumable,getDownloadURL,} 


