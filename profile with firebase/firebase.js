
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
  import { getAuth, signOut ,createUserWithEmailAndPassword,signInWithEmailAndPassword , onAuthStateChanged,sendEmailVerification} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
  import { getFirestore,setDoc,doc,getDocs,getDoc,collection ,query,
    where,} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDUWlqd2uTUDLMDQZVexaIjB4HmuhzM8j4",
    authDomain: "chat-app-6d366.firebaseapp.com",
    projectId: "chat-app-6d366",
    storageBucket: "chat-app-6d366.appspot.com",
    messagingSenderId: "33824317652",
    appId: "1:33824317652:web:77486c2560dd1ac7931b41",
    measurementId: "G-DM11T0Y20C"
  };

  // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// autnentication>>>>>>>>>>>>>>>>>
export{app,auth,getAuth,signOut ,createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged,where,query}


//firestore>>>>>>>>>>>>>>>
export{db,setDoc,doc,getDocs,getDoc,collection}