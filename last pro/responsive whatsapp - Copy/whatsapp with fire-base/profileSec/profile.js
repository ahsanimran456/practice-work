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
import { auth, signOut, onAuthStateChanged, } from "../firebase/firebase.js";
import { db, doc, addDoc, getDocs, getDoc, collection, query, where, onSnapshot, orderBy, updateDoc, deleteField } from "../firebase/firebase.js";
window.onload = async () => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.replace("../index.html")
    }
    getdata_CurrentUser(user.uid)
  });
};

let loader = document.querySelector('.loader');
let loader_res = document.querySelector('.loaderRes');

let getdata_CurrentUser = async (uid) => {
  loader.style.display = "block";
  loader_res.style.display = "block";
  const docRef = doc(db, "users", uid);
  // console.log("hhhhh",docRef)
  const docSnap = await getDoc(docRef);
  let my_dp = document.getElementById("my-dp")
  let my_dp_res = document.getElementById("my_dp_res")
  let heading = document.getElementById('heading')
  // let currentUser = document.getElementById("current-user");
  if (docSnap.exists()) {
    loader.style.display = "none";
    loader_res.style.display = "none";
    my_dp.innerHTML = `
      <img src="${docSnap.data().profile}" alt="" width="50" height="50" style="border-radius:50px; border:2px solid gray">
      <span class="text-uppercase">${docSnap.data().name}</span> `
    getAllUsers(docSnap.data().email, uid, docSnap.data().name);
    // my_dp_res.innerHTML=
    // `<img src="${docSnap.data().profile}" alt="" width="50" height="50" style="border-radius:50px; border:2px solid gray">
    // <span class="text-uppercase" id="heading">${docSnap.data().name}</span> `
  }
  else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

// initial to chat 
function initialToChat() {
  let chat_initial = document.querySelector(".chat-initial")
  let chat_click = document.querySelector(".chat-click")
  chat_initial.style.display = "none"
  chat_click.style.display = "block"
  ofcanvaClick()
}
window.initialToChat = initialToChat

// get all user list 

const getAllUsers = async (email, currentId, currentName) => {
  const withoutCUrrentUser = query(collection(db, "users"), where("email", "!=", email));
  const querySnapshot = await getDocs(withoutCUrrentUser);
  let each_friend = document.querySelector(".each-friend");
  let res_each_friend = document.querySelector(".res-user-show");
  querySnapshot.forEach((doc) => {
    // frnd_names.innerHTML += `<li>${doc.data().name} <button onclick='startChat("${doc.id}","${doc.data().name}","${currentId}","${currentName}")' id="chat-btn">Start Chat</button></li>`
    each_friend.innerHTML +=
      `<div class="container p-0" onclick='startChat("${doc.id}","${doc.data().name}","${currentId}","${currentName}","${doc.data().profile}")' >
                        <div onclick="initialToChat()">
                           <a class="navbar-brand" href="#">
                              <img src="${doc.data().profile}" alt="" width="50" height="50" style="border-radius:50px ;">
                              <span class="text-uppercase" >${doc.data().name}</span>
                           </a>
                        </div>
                     
                        <hr class="hr-sec">
                      </div>
                  `
    res_each_friend.innerHTML +=
      `<div class="container res-each-friend  p-0" onclick="chat()">
          <div class="profiles">
              <a class="navbar-brand" href="#" style="color:black">
                    <img src="${doc.data().profile}" alt="" width="50" height="50" style="border-radius:50px ;">
              </a>
         </div>
          <div class="names">
              <span class="text-uppercase" >${doc.data().name}</span>
          </div>
        </div>`
      ;
  });
};

// location to chat 
const chat = ()=>{
  window.location.href = "./chats.html";
}
window.chat=chat

//start chat..............................>

const startChat = (otherUserid, otherUsername, myId, currentName, other_profile) => {
  console.log(otherUserid, otherUsername, myId, currentName)
  let friendName = document.getElementById("friendName")
  friendName.innerHTML = `
    <img src="${other_profile}" alt="" width="50" height="50" style="border-radius:50px">
    <span class="text-uppercase" >${otherUsername}</span>
    `
  let send = document.getElementById("send");
  let message = document.getElementById("message");
  let chatID;
  if (otherUserid < myId) {
    chatID = `${otherUserid}${myId}`;
    console.log("chat", chatID)
  } else {
    chatID = `${myId}${otherUserid}`;
  }
  loadAllChats(chatID, otherUserid, myId);
  send.addEventListener("click", async () => {
    console.log(message.value)
    let user_chats_realtime_ul = document.querySelector(".user-chats-realtime-ul");
    user_chats_realtime_ul.innerHTML = "";
    await addDoc(collection(db, "messages"), {
      sender_name: currentName,
      receiver_name: otherUsername,
      sender_id: myId,
      receiver_id: otherUserid,
      chat_id: chatID,
      message: message.value,
      timestamp: new Date(),
    })
    message.value = ""
  })
}
//  const deleteChat= async()=>{
//   const query = doc(db, 'messages', where("chat_id","==",chatID));
// await updateDoc(query, {
//     query: deleteField()
// });}

const loadAllChats = (chatID, otherUserid, myId) => {
  const q = query(collection(db, "messages"), where("chat_id", "==", chatID), orderBy("timestamp", "desc"));
  let user_chats_realtime_ul = document.querySelector(".user-chats-realtime-ul");
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    user_chats_realtime_ul.innerHTML = "";
    deleteChat(chatID)
    querySnapshot.forEach((doc) => {
      if (doc.data().sender_id == otherUserid) {

        user_chats_realtime_ul.innerHTML +=
          `<li class="frnd">${doc.data().message}</li>`;
      }
      else if (doc.data().sender_id == myId) {
        user_chats_realtime_ul.innerHTML += `<li class="myme">${doc.data().message}</li>`;

      }

    }
    );
  });
};


const deleteChat = async (chatID) => {
  const query = doc(db, 'messages', where("chat_id", "==", chatID));
  await deleteDoc(doc(db, "messages", query))
  // await updateDoc(query, {
  //     query: deleteField()

  // });
}

window.deleteChat = deleteChat
window.startChat = startChat


// signOut 

let logout_wrapper = document.querySelector(".logout_wrapper");
let logout_wrapper_res = document.querySelector(".logout_wrapper-res");

let button_logout = () => {
  logout_wrapper.classList.toggle("show")
  logout_wrapper_res.classList.toggle("show-res")
}

// window.button_logout = button_logout;
//     let signtout = document.querySelector('.signtout')
//     let signtout_res = document.querySelector('.signtout-res')
//     signtout.addEventListener("click",()=>{
//       signOut(auth).then(() => {
//         window.location.href = "../index.html";
//       }).catch((error) => {
//         // An error happened.
//       });
//     })
//     signtout_res.addEventListener("click",()=>{
//       signOut(auth).then(() => {
//         window.location.href = "../index.html";
//       }).catch((error) => {
//         // An error happened.
//       });
//     })
// window.signtout= signtout
// window.signtout_res= signtout_res


// ofcanva click
// function ofcanvaClick(){
//   let ofcanva_hide_click = document.querySelector(".ofcanva-hide-click")
//   ofcanva_hide_click.style.display="none"
// }
// window.ofcanvaClick=ofcanvaClick



// import { doc, updateDoc, deleteField } from "firebase/firestore";

// const cityRef = doc(db, 'cities', 'BJ');

// // Remove the 'capital' field from the document
// await updateDoc(cityRef, {
//     capital: deleteField()
// });