const socket = io.connect();
socket.emit("new user", window.prompt().toString());