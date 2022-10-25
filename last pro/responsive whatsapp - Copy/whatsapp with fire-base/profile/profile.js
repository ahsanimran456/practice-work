let stylesArray = [
    'background-color: black; ',
    'color: purple',
    'width : 600px',
    'height : 150px',
    'padding : 30px',
    'font-size : 20px',
    'font-weight : bold',
    'text-align : center',
    'border: 1px dashed black;'].join(';')
console.log('%c Created By Ahsan Imran‍...!', stylesArray);

// import 
import { auth, getAuth,signOut ,createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged,  } from "../firebase/firebase.js";
import { db, setDoc,doc,addDoc, getDocs,getDoc, collection  ,query,where ,onSnapshot,orderBy} from "../firebase/firebase.js";

window.onload = async () => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.replace("../index.html")
      }
      getdata_CurrentUser(user.uid) 
    });
  };

  let loader = document.querySelector('.loader');
  
  let getdata_CurrentUser = async (uid) => {
    loader.style.display = "block";
    const docRef = doc(db, "users",uid);
    // console.log("hhhhh",docRef)
    const docSnap = await getDoc(docRef);
    let my_dp = document.getElementById("my-dp")
    let my_dp_res = document.getElementById("my-dp-res")
    let heading = document.getElementById('heading')
    // let currentUser = document.getElementById("current-user");
    if (docSnap.exists()) {
      loader.style.display = "none";
      my_dp.innerHTML=`
      <img src="${docSnap.data().profile}" alt="" width="50" height="50" style="border-radius:50px; border:2px solid gray">
      <span class="text-uppercase" id="heading">${docSnap.data().name}</span> `
      getAllUsers(docSnap.data().email, uid, docSnap.data().name);
      my_dp_res.innerHTML=
      `<img src="${docSnap.data().profile}" alt="" width="50" height="50" style="border-radius:50px; border:2px solid gray">
      <span class="text-uppercase" id="heading">${docSnap.data().name}</span> `
    }
     else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
function removeimg(){
 let empt_img = document.querySelector(".empt-img")
 let head_remove = document.querySelector (".head-remove")
 let chat_portion = document.querySelector(".chat-portion")
 empt_img.style.display="none"
 head_remove.style.display="block"
 chat_portion.style.display="block"
}
window.removeimg=removeimg

  const getAllUsers = async (email, currentId, currentName) => {
    const withoutCUrrentUser = query(collection(db, "users"), where("email", "!=", email));
    const querySnapshot = await getDocs(withoutCUrrentUser);
    let frnd_names = document.querySelector(".friend-list");
    let frnd_names_res = document.querySelector(".friend-list-res");

    querySnapshot.forEach((doc) => {
        // frnd_names.innerHTML += `<li>${doc.data().name} <button onclick='startChat("${doc.id}","${doc.data().name}","${currentId}","${currentName}")' id="chat-btn">Start Chat</button></li>`
        frnd_names.innerHTML +=
                    `<nav class="navbar navbar-light" onclick='startChat("${doc.id}","${doc.data().name}","${currentId}","${currentName}","${doc.data().profile}")' >
                        <div class="container"  onclick="removeimg()">
                          <a class="navbar-brand" href="#">
                            <img src="${doc.data().profile}" alt="" width="50" height="50" style="border-radius:50px ;">
                            <span class="text-uppercase" >${doc.data().name}</span>
                          </a>
                          
                        </div>
                    </nav>
                    <hr class="intersect p-0 m-0">`
        frnd_names_res.innerHTML +=
                    `<nav class="navbar navbar-light" onclick='startChat("${doc.id}","${doc.data().name}","${currentId}","${currentName}","${doc.data().profile}")' >
                        <div class="container"  onclick="removeimg()">
                          <a class="navbar-brand" href="#">
                            <img src="${doc.data().profile}" alt="" width="50" height="50" style="border-radius:50px ;">
                            <span class="text-uppercase" >${doc.data().name}</span>
                          </a>
                          
                        </div>
                    </nav>
                    <hr class="intersect p-0 m-0">`            
        ;
    });
  };
  const startChat = (otherUserid, otherUsername, myId, currentName,other_profile)=>{
    console.log( otherUserid , otherUsername,myId,currentName)
    let friendName= document.getElementById("friendName")
    friendName.innerHTML= `
    <img src="${other_profile}" alt="" width="50" height="50">
    <span class="text-uppercase" >${otherUsername}</span>
    `
    let send = document.getElementById("send");
    let message = document.getElementById("message");
    let chatID;
    if (otherUserid < myId) {
      chatID = `${otherUserid}${myId}`;
      console.log("chat",chatID)
    } else {
      chatID = `${myId}${otherUserid}`;
    }
    loadAllChats(chatID, otherUserid,myId);
    send.addEventListener("click", async () => {
      console.log(message.value)
      let conversation_div = document.querySelector(".conversation-div-ul");
      conversation_div.innerHTML = "";
      await addDoc(collection(db, "messages"), {
        sender_name: currentName,
        receiver_name: otherUsername,
        sender_id: myId,
        receiver_id: otherUserid,
        chat_id: chatID,
        message: message.value,
        timestamp: new Date(),
      })
      message.innerHTML=""
    })
  }
  // query(todoRef, orderBy("timestamp", "asc")),

  const loadAllChats = (chatID,otherUserid,myId) => {
    const q = query(collection(db, "messages"), where("chat_id","==",chatID),orderBy("timestamp", "desc"));
    let conversation_div = document.querySelector(".conversation-div-ul");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      conversation_div.innerHTML = "";
      querySnapshot.forEach((doc) => {
        if(doc.data().sender_id==otherUserid){
          conversation_div.innerHTML += `<li class="frnd">${doc.data().message}
          
          </li>`;
        }
        else if(doc.data().sender_id==myId){
          conversation_div.innerHTML += `<li class="myme">${doc.data().message}</li>`;

        }
        
      });
    });
  };

window.startChat = startChat




let logout_wrapper = document.querySelector(".logout_wrapper");

let button_logout = ()=>{
  logout_wrapper.classList.toggle("show")
}

window.button_logout = button_logout;
 
    let signtout = document.querySelector('.signtout')
    signtout.addEventListener("click",()=>{
      signOut(auth).then(() => {
        window.location.href = "../index.html";
      }).catch((error) => {
        // An error happened.
      });
    })
window.signtout= signtout

