const chatForm = document.getElementById('chat-form');
const user_name = document.getElementById('username');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const msgImg = document.getElementById('msg_img');
const groupImg = document.getElementById('group-img');
const userImg = document.getElementById('user_img');
const data_file_input = document.getElementById('data_file_input');

const username = localStorage.getItem("userName")
console.log(username);

// Get username and room from URL
const { room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

function submitMenu(id) {
  document.getElementById('room').value = id;
  document.getElementById('groups-menu-form').submit();
}

const socket = io();

user_name.value = username

if(room !== "default"){
  if( room !== "profile"){
    if( room !== "new-group"){
      if( room !== "search-results"){
        // Join Group chatroom
        socket.emit('joinRoom', { username, room });
        socket.emit('joinRoomPrivate', { username1:"kpbarasa", username2:"GraceK" });
      }
    }
  }
}

// Older Message from server
socket.on('roomInfo', (roomInfo) => {

getChatRoom_header(roomInfo)

});

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});
// Older Message from Db
socket.on('olderMesseges', (olderMesseges) => {

  olderMesseges.map(res => {
    console.log(res)
    outputOldMessage(res)

  })

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;

});


// Older Message from redis cache
socket.on('messagesCache', (keysArr) => {

  keysArr.map(res => {
    outputOldMessage(res)

  }).sort((a, b) => a.date - b.date)
  // console.log(keysArr);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;

});

// Message from server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;

});

// IMG Message from server
socket.on('messageimg', (message) => {
  console.log(message);
  outputMessageImg(message);

  // // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;

});


// Get data from file input 
function getUpldedGalleryiImg(e) {

  let arrFiles = []

  let msg_img = msgImg.files;

  arrFiles.push(msg_img[0])

  console.log(arrFiles);

  uploadImgMessage(arrFiles[0], "data-image", "id456rfg", "img")

}

// Message submit
chatForm.addEventListener('submit', (e) => {

  e.preventDefault()

  // // Get message text
  console.log(e.target.elements.msg_img.files)

  // // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // // Emit message to server
  socket.emit('chatMessage', msg);


  // // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Image submit 
function uploadImgMessage(msg_img, data_type, data_usr_id, mediaType) {

  const reader = new FileReader();

  reader.readAsDataURL(msg_img);

  reader.onloadend = function () {

    const img = reader.result;

    console.log(img);

    socket.emit('chatImg', { img: img, user_id: "", room_id: "" });


    // // Clear input
    arrFiles = []
    msg_img.value = ''

  }

}

// Output message to DOM
function outputOldMessage(message) {

  if(message.message !== "media"){
    const div = document.createElement('div');
    div.classList.add('message');

    const avatar = document.createElement('div');
    avatar.classList.add('message-avatar');
    div.appendChild(avatar);

    
    const avatarImg = document.createElement('img');
    avatarImg.classList.add('avatar-img');
    avatarImg.src = "https://th.bing.com/th/id/OIP.kzBJh7OsGaHYoYX1pMj1uwHaHa?pid=ImgDet&rs=1" ;
    avatar.appendChild(avatarImg);

    const container = document.createElement('div');
    div.appendChild(container);
  
    // Meta text 
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.user_name || message.username;
    p.innerHTML += `<span>${message.time}</span>`;
    container.appendChild(p);
  
    // Message text 
    const para = document.createElement('p');
    para.classList.add('text');
    para.innerText = message.message || message.text;
    container.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
  }
  else{
    const div = document.createElement('div');
    div.classList.add('message-img');

    const avatar = document.createElement('div');
    avatar.classList.add('message-avatar');
    div.appendChild(avatar);

    
    const avatarImg = document.createElement('img');
    avatarImg.classList.add('avatar-img');
    avatarImg.src = "https://th.bing.com/th/id/OIP.kzBJh7OsGaHYoYX1pMj1uwHaHa?pid=ImgDet&rs=1" ;
    avatar.appendChild(avatarImg);

    const container = document.createElement('div');
    div.appendChild(container);
  
    const p = document.createElement('p');
    p.classList.add('meta');
    p.innerText = message.user_name;
    p.innerHTML += `<span>${message.time}</span>`;
    container.appendChild(p);
  
    const img = document.createElement('img');
    img.classList.add('meta');
    img.src = "/media/" + message.media;
    container.appendChild(img);
  
    document.querySelector('.chat-messages').appendChild(div);
  }
}

// Output message to DOM
function outputMessage(message) {
  
  const div = document.createElement('div');
  div.classList.add('message');

  const avatar = document.createElement('div');
  avatar.classList.add('message-avatar');
  div.appendChild(avatar);

  
  const avatarImg = document.createElement('img');
  avatarImg.classList.add('avatar-img');
  avatarImg.src = "https://th.bing.com/th/id/OIP.kzBJh7OsGaHYoYX1pMj1uwHaHa?pid=ImgDet&rs=1" ;
  avatar.appendChild(avatarImg);

  const container = document.createElement('div');
  div.appendChild(container);

  // Meta text 
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  container.appendChild(p);

  // Message text 
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  container.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);

}


// Output message to DOM
function outputMessageImg(message) {
  const div = document.createElement('div');
  div.classList.add('message-img');

  const avatar = document.createElement('div');
  avatar.classList.add('message-avatar');
  div.appendChild(avatar);

  
  const avatarImg = document.createElement('img');
  avatarImg.classList.add('avatar-img');
  avatarImg.src = "https://th.bing.com/th/id/OIP.kzBJh7OsGaHYoYX1pMj1uwHaHa?pid=ImgDet&rs=1" ;
  avatar.appendChild(avatarImg);

  const container = document.createElement('div');
  div.appendChild(container);

  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  container.appendChild(p);

  const img = document.createElement('img');
  img.classList.add('meta');
  img.src = "/media/" + message.media;
  container.appendChild(img);

  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}


// Add users to DOM
function outputUsers(users) {
  console.log(users);
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    userList.appendChild(li);

    const div = document.createElement('div');
    div.classList.add('profile-small-container');
    div.classList.add('grid-col-2-sm');
    li.appendChild(div);

    const imgHolder = document.createElement('div');
    imgHolder.classList.add('profile-small-image-holder')
    div.appendChild(imgHolder);

    const img = document.createElement('img');
    img.src = "https://th.bing.com/th/id/OIP.kzBJh7OsGaHYoYX1pMj1uwHaHa?pid=ImgDet&rs=1"
    // img.src = "/media/"+user.image;
    imgHolder.appendChild(img);

    const divText = document.createElement('div');
    div.appendChild(divText);

    const spanTitle = document.createElement('span');
    spanTitle.classList.add('title-medium');
    spanTitle.innerText = user.username;
    divText.appendChild(spanTitle);

    const spanText = document.createElement('span');
    spanText.classList.add('title-small');
    spanText.innerText = user.username;
    divText.appendChild(spanText);

  });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../login.html';
  } else {
  }
});

