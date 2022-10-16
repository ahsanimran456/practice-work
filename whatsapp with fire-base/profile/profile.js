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
    let heading = document.getElementById('heading')
    // let currentUser = document.getElementById("current-user");
    if (docSnap.exists()) {
      loader.style.display = "none";
      heading.innerHTML = `${docSnap.data().name}`;
      getAllUsers(docSnap.data().email, uid, docSnap.data().name);
    } else {
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
    querySnapshot.forEach((doc) => {
        // frnd_names.innerHTML += `<li>${doc.data().name} <button onclick='startChat("${doc.id}","${doc.data().name}","${currentId}","${currentName}")' id="chat-btn">Start Chat</button></li>`
        frnd_names.innerHTML +=
                    `<nav class="navbar navbar-light" >
                        <div class="container"  onclick="removeimg()">
                          <a class="navbar-brand" href="#">
                            <img src="../friends.png" alt="" width="50" height="50">
                            <span class="text-uppercase" >${doc.data().name}</span>
                          </a>
                          <button onclick='startChat("${doc.id}","${doc.data().name}","${currentId}","${currentName}")' id="chat-btn">Start Chat</button>
                        </div>
                    </nav>
                    <hr class="intersect p-0 m-0">`
        ;
    });
  };
  const startChat = (otherUserid, otherUsername, myId, currentName)=>{
    console.log( otherUserid , otherUsername,myId,currentName)
    let friendName= document.getElementById("friendName")
    friendName.innerHTML= `<span>${otherUsername}</span>`
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
    })
  }
  // query(todoRef, orderBy("timestamp", "asc")),

  const loadAllChats = (chatID,otherUserid,myId) => {
    const q = query(collection(db, "messages"), where("chat_id","==",chatID), );
    let conversation_div = document.querySelector(".conversation-div-ul");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      conversation_div.innerHTML = "";
      querySnapshot.forEach((doc) => {
        if(doc.data().sender_id==otherUserid){
          conversation_div.innerHTML += `<li class="frnd">${doc.data().message}</li>`;
        }
        else if(doc.data().sender_id==myId){
          conversation_div.innerHTML += `<li class="myme">${doc.data().message}</li>`;

        }
        
      });
    });
  };

window.startChat = startChat

