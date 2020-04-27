
socket.on('user joined', (user) => {
    document.querySelector(".user-count .users").innerHTML = user;
});