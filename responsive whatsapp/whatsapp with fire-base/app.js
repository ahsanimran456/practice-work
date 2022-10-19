let stylesArray = [
    'background-color: black; ',
    'color: purple',
    'width : 300px',
    'height : 150px',
    'padding : 30px',
    'font-size : 20px',
    'font-weight : bold',
    'text-align : center',
    'border: 1px dashed black;'].join(';')
  
  console.log('%c Created By Ahsan Imran‍...!', stylesArray);
  
  
  const showSignup = document.getElementById('showsignup');
  const showLogin = document.getElementById('showlogin');
  
  const changeSignup = () => {
    document.getElementById('login').className = 'hidden';
    document.getElementById('signup').className = 'login-box';
  }
  
  function changeLogin() {
    document.getElementById('signup').className = 'hidden';
    document.getElementById('login').className = 'login-box';
  }
  try {
    showSignup.addEventListener("click", changeSignup);
    showLogin.addEventListener("click", changeLogin)
  } catch (error) {
    console.log(error)
  }

//   import function from firebase.js 
import { app } from "./firebase/firebase.js";
import { auth,  query,where,orderBy, getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, } from "./firebase/firebase.js";
import { db, setDoc, doc ,  updateDoc,} from "./firebase/firebase.js";
import {getStorage,ref,uploadBytesResumable,getDownloadURL,
} from "./firebase/firebase.js";



let spinner = document.querySelector('.spinner-border')
const signup = () => {
  let name = document.getElementById("name")
  let email = document.getElementById("email")
  let password = document.getElementById("password")
  let s_usernametest = /^[A-Za-z .]{3,20}$/
  let s_emailtest = /^([\w]*[\w\.]*(?!\.)@gmail.com)/
  let s_passwordtest = /^[a-zA-Z0-9]{6,16}$/;
  let profile = document.getElementById("profile")
  if ((s_usernametest.test(name.value)) && (s_emailtest.test(email.value)) && (s_passwordtest.test(password.value))&&(profile.files.length !=0 )) {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        spinner.style.display = "block";
        await setDoc(doc(db, "users", user.uid), {
          name: name.value,
          email: email.value,
          password: password.value,
          userUid:user.uid
        })
        getProfile();
        // Swal.fire({
        //   imageUrl: "./favicon.png",
        //   imageWidth: 100,
        //   imageHeight: 100,
        //   title:"aa raha",
        //   showConfirmButton: false,
        //   timer: 1500})
      
        Swal.fire({
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        spinner.style.display = "none";
        name.value = ""
        email.value = ""
        password.value = ""
        changeLogin()
        console.log("signup===>", user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          icon: 'error',
          title: errorCode,
          text: errorMessage,
          iconColor: 'red',
          confirmButtonColor: "red",
          background: 'black',
          color: 'whitesmoke',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          },
        });
        console.log("signup error===>", errorMessage)
      });
  }
  else {
    Swal.fire({
      imageUrl: "./whatsapp-icon.png",
      imageWidth: 100,
      imageHeight: 100,
      title: "Error",
      text: "Please enter a valid e-mail,Password or Profile picture",
      iconColor: 'red',
      confirmButtonColor: "red",
      background: 'rgb(54 54 54 / 57%)',
      color: 'whitesmoke',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      // timer:3000,
      // confirmButtonText:"hello",
      // icon: "warning",
      // backdrop: "linear-gradient(yellow, orange)",  
    });
  }
}
let signupbtn = document.getElementById("signupbtn")
signupbtn.addEventListener("click", signup)


//   login portion >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

let spinner2 = document.querySelector('.spinner-grow')
const login = () => {
    let l_email = document.getElementById("l_email")
    let l_password = document.getElementById("l_password")
    let l_emailtest = /^([\w]*[\w\.]*(?!\.)@gmail.com)/
    let l_passwordtest = /^[a-zA-Z0-9]{6,16}$/;
    if (l_emailtest.test(l_email.value) && l_passwordtest.test(l_password.value)) {
        
      signInWithEmailAndPassword(auth, l_email.value, l_password.value)
        .then((userCredential) => {
            spinner2.style.display = "block";
          // Signed in 
         const user = userCredential.user;

          console.log(user)
          // sin(user)
          window.location="./profileSec/dashboard.html"
          console.log("login user .....", user)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Swal.fire({
            icon: 'error',
            title: errorCode,
            text: errorMessage,
            iconColor: 'red',
            confirmButtonColor: "red",
            background: 'black',
            color: 'whitesmoke',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            },
          });
          console.log("login error", errorMessage)
        });
    }
    else (
      Swal.fire({
        imageUrl: "./whatsapp-icon.png",
        imageWidth: 100,
        imageHeight: 100,
        title: "Error",
        text: "Please enter a valid e-mail,Password",
        iconColor: 'red',
        confirmButtonColor: "red",
        background: '#363636',
        color: 'whitesmoke',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        // timer:3000,
        // confirmButtonText:"hello",
        // icon: "warning",
        // backdrop: "linear-gradient(yellow, orange)",  
      }))
  
  }
  let loginbtn = document.getElementById("loginbtn")
  loginbtn.addEventListener("click", login)

//   window.onload = async () => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       window.location.replace("./profile/profile.html")
//     }
//     getdata_CurrentUser(user.uid)
     
//   });
// };

  
// images get 


 async function getProfile() {
  let profile_pic = document.getElementById("profile");
  let file = profile_pic.files[0];
  console.log("file",file)
  const auth = getAuth();
  let uid = auth.currentUser.uid;
  console.log(uid)
  let url = await uploadFiles(file);
  const imagePut = doc(db, "users", uid);
  await updateDoc(imagePut, {
    profile: url,
  })
}
const uploadFiles = (file) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    const auth = getAuth();
    let uid = auth.currentUser.uid;
    const storageRef = ref(storage, `users/${uid}.png`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        }
        );
      }
    );
  }
  );
};

window.getProfile = getProfile