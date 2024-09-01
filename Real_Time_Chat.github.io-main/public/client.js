const socket=io();


if(sessionStorage.getItem('username')=="")window.location.href = '/';
let newUser=document.createElement('div');
newUser.innerHTML=`<div class="username-room float-bottom d-flex ms-3 mb-0 pt-1 ">
       <p class="ms-2 mb-4">User- ${sessionStorage.getItem('username')}</p>         <p class="float-end me-3 ms-auto ">Room- ${sessionStorage.getItem('room')}</p>
 </div>`;

 let parentUserRoom=document.getElementById("appname");
 let existingUserRoom = parentUserRoom.querySelector(".usernameroom");

  if (existingUserRoom) {
    parentUserRoom.replaceChild(newUser, existingUserRoom);
  } else {
    console.error("Element with class 'usernameroom' not found.");
  }
  let logbtn=document.getElementById('logout');
   
  logbtn.addEventListener('click', (e)=>{
    delete(sessionStorage.getItem('username'));
    delete(sessionStorage.getItem('room'));
    window.location.href = '/';
  });



let btn=document.getElementById('tsend')  
btn.addEventListener('click',sendNpt);
let messageArea=document.querySelector('.massageArea');
function sendNpt(e){
    
    e.preventDefault();
    let currentBtn=e.currentTarget;
     
    let currentInput=currentBtn.previousElementSibling
    
    
    
    let msg={
        user:sessionStorage.getItem('username'),
        message:currentInput.value.trim(),
        
    }
    currentInput.value="";
    appendMessage(msg,"outgoing");
    scrollToBottom()
    //send to server
    socket.emit('message',msg);
    

}      

function appendMessage(msg,type){
    let newDiv=document.createElement("div");
    
    newDiv.classList.add("massage",type);
    newDiv.innerHTML=`
       <h4 class="${type}User" >${msg.user}</h4>
        <p>${msg.message}</p>
        `
    messageArea.appendChild(newDiv);
    
}

//recieve message

socket.on('message',(msg)=>{
    
    appendMessage(msg,'incoming');
    scrollToBottom();
})
      


function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight;
}
 
          
         

