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
//getdata>>>>>>>>>>>>>>>>>>>>>>
import { auth, getAuth,signOut ,createUserWithEmailAndPassword,signInWithEmailAndPassword, onAuthStateChanged,  } from "../firebase.js";
import { db, setDoc,doc,addDoc, getDocs,getDoc, collection  ,query,where ,onSnapshot,orderBy} from "../firebase.js";




window.onload = async () => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.replace("../index.html")
    }
    getdata_CurrentUser(user.uid)
     
  });
};

let loader = document.querySelector('.loader');





// const auth = getAuth(app);
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
    
    const getAllUsers = async (email, currentId, currentName) => {
      const withoutCUrrentUser = query(collection(db, "users"), where("email", "!=", email));
      const querySnapshot = await getDocs(withoutCUrrentUser);
      let chat = document.getElementById("chat");
      querySnapshot.forEach((doc) => {
        chat.innerHTML += `<li>${doc.data().name} <button onclick='startChat("${doc.id}","${doc.data().name}","${currentId}","${currentName}")' id="chat-btn">Start Chat</button></li>`;
      });
    };

    const startChat = (otherUserid, otherUsername, myId, currentName)=>{
      console.log( otherUserid , otherUsername,myId,currentName)
      let user_chat_with = document.getElementById("chat-with")
      user_chat_with.innerHTML= `<span>${otherUsername}</span>`
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
        let conversation = document.getElementById("conversation");
        conversation.innerHTML = "";
        await addDoc(collection(db, "messages"), {
          sender_name: currentName,
          receiver_name: otherUsername,
          sender_id: myId,
          receiver_id: otherUserid,
          chat_id: chatID,
          message: message.value,
          timestamp: new Date(),
        });
      });
    }
    // query(todoRef, orderBy("timestamp", "asc")),

    const loadAllChats = (chatID,otherUserid,myId) => {
      const q = query(collection(db, "messages"), where("chat_id", "==", chatID),orderBy("timestamp", "asc"));
      let conversation = document.getElementById("conversation");
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        conversation.innerHTML = "";
        querySnapshot.forEach((doc) => {
          conversation.innerHTML += `<li class="frnd  mymesg mt-5 mb-5">${doc.data().message}</li>`;
          
        });
      });
    };
window.startChat = startChat



   

    // const querySnapshot = await getDocs(collection(db, "users"),);
    // console.log(auth.currentUser.uid)
    // // console.log(querySnapshot)
    // querySnapshot.forEach((doc) => {
    //     // console.log(doc.data().email)
    //     // console.log(doc.data().name)
    //     heading.innerHTML=`
    //     <img src="../images/icons8-avatar-67.png" alt="" width="50" height="50">
    //     <span>${doc.data().name}</span>`
    //     let chat = document.getElementById("chat")
    //     chat.innerHTML += `
    //     <div class="chatlist d-flex justify-content-between px-2">
    //     <div>
    //         <img src="../images/friends.png" alt="" width="50">
    //         <span style="font-weight:600;">${doc.data().name}</span>
    //     </div>
    //     <div>
    //         <button type="button" class="btn btn-danger p-1 mt-2" onclick="startChat('${doc.data().name}','${doc.data().userUid}')">Chat </button>   
    //     </div>
    // </div>
    
    //     `
    // });
// }


// start chat 

// function startChat(username,uid){
//   let chat_with = document.getElementById("chat-with")
//   chat_with.innerHTML=`
//   <img src="../images/icons8-avatar-67.png" alt="" width="50" height="50">
//   <span>${username}</span> `
//   console.log(username)
//   console.log(uid)
//   let send = document.getElementById("send");
//   let message = document.getElementById("message");
//   // console.log(auth.currentUser)
//   // userlogOUT()
// }
// window.startChat = startChat;

// // console.log(auth.currentUser)
// let send = document.getElementById("send");
// send.addEventListener("click",msgsned)
// function msgsned (){
//   let message = document.getElementById("message").value;
//   let conversation = document.getElementById("conversation");
//   conversation.innerHTML+=`<li>${message}</li>` 
// }



let signtout = document.getElementById('signtout')
signtout.addEventListener("click",()=>{
  signOut(auth).then(() => {
    window.location.href = "../index.html";
  }).catch((error) => {
    // An error happened.
  });
})









// let signtoutbtn = document.getElementById("signtout")
// signtoutbtn.addEventListener("click",sin)

// function sin (loginuser){
//     console.log("dgfd",loginuser)
// }


// export{sin}




























function alert (){
  let timerInterval
Swal.fire({
//   title: 'Auto close alert!',
  imageUrl: "../favicon.png",
  imageWidth: 100,
  imageHeight: 100,
  background: 'rgb(54 54 54 / 57%)',
  html: 'I will close in <b></b> milliseconds.',
timer: 2000,
timerProgressBar: true,
didOpen: () => {
  Swal.showLoading()
  const b = Swal.getHtmlContainer().querySelector('b')
  timerInterval = setInterval(() => {
    b.textContent = Swal.getTimerLeft()
  }, 100)
},
willClose: () => {
  clearInterval(timerInterval)
}
}).then((result) => {
/* Read more about handling dismissals below */
if (result.dismiss === Swal.DismissReason.timer) {
  console.log('I was closed by the timer')
}
})
}

