const socket = io.connect();

const roomModal =  $('#roomModal');
const roomJoin = $('#roomModal .room-join');
let roomName;

window.addEventListener('load', () => {
    roomModal.modal('show');
});

const joinRoom = () => {
    roomName = $('input.roomname').val().toString().trim();
    if(roomName) {
        sessionStorage.setItem('roomname', roomName);
        socket.emit("new user", roomName);
        roomModal.modal('hide');
    }
}

roomJoin.on('click', joinRoom);
