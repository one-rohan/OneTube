let joinBtn = document.querySelector(".user-join");
let chatList = document.querySelector(".chat-list");
let isJoined = false;
let username = "";

joinBtn.addEventListener("click", (e) => {
    const newNode = document.createElement("li");
    const usernameVal = document.querySelector(".username");

    if (!isJoined) {
        username = document.querySelector(".username").value;
        newNode.classList.add("user-joined");
        newNode.innerHTML = 'You have joined the chat.';
        chatList.appendChild(newNode);
        usernameVal.value = "";
        usernameVal.placeholder = "Type Your Message...";
        joinBtn.innerHTML = "SEND";
        isJoined = true;
        socket.emit("user joined chat", username);
    } else {
        newNode.classList.add("user-msg");
        newNode.innerHTML = '<span class="name">You: </span>'+ usernameVal.value;
        chatList.appendChild(newNode);
        usernameVal.value = "";
    }
});


socket.on('user joined', (user) => {
    let userCount =  document.querySelector(".user-count .users");
    userCount.innerHTML = user;
});

socket.on("show new user", () => {
    
});