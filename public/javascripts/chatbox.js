const joinBtn = document.querySelector(".user-join");
const chatList = document.querySelector(".chat-list");
const chatInput = document.getElementById("chatInput");

let user = {
    roomname: '',
    username: '',
    isJoined: false,
    message: ''
}

const joinSend = () => {
    const newNode = document.createElement("li");
    const usernameVal = document.querySelector(".username");

    if (!user.isJoined && usernameVal.value) {
        user.roomname = sessionStorage.getItem('roomname');
        user.username = document.querySelector(".username").value;
        newNode.classList.add("user-joined");
        newNode.innerHTML = 'You have joined the chat.';
        chatList.appendChild(newNode);
        usernameVal.value = "";
        usernameVal.placeholder = "Type Your Message...";
        joinBtn.innerHTML = "SEND";
        user.isJoined = true;
        socket.emit("user joined chat", user);
    } else if (usernameVal.value) {
        newNode.classList.add("user-msg");
        newNode.innerHTML = '<span class="name">You: </span>'+ usernameVal.value;
        chatList.appendChild(newNode);
        user.message = usernameVal.value;
        socket.emit("user new message", user);
        usernameVal.value = "";
    }
}

joinBtn.addEventListener("click", joinSend);
chatInput.addEventListener('keypress', e => {
    if(e.keyCode === 13) {
        e.preventDefault();
        joinSend();
    }
});

socket.on('user counter', (user, name) => {
    let userCount =  document.querySelector(".user-count .users");
    let roomName = document.querySelector(".user-count .roomname");
    userCount.innerHTML = user;
    roomName.innerHTML = name;
});

socket.on("show new user", (username) => {
    const newNode = document.createElement("li");
    newNode.classList.add("user-joined");
    newNode.innerHTML = username + ' has joined the chat.';
    chatList.appendChild(newNode);
});

socket.on("show new message", (user) => {
    const newNode = document.createElement("li");
    newNode.classList.add("user-msg");
    newNode.innerHTML = '<span class="name">'+user.username+': </span>'+ user.message;
    chatList.appendChild(newNode);
});