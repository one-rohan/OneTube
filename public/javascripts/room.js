const socket = io.connect();

const roomModal =  $('#roomModal');
const roomJoin = $('#roomModal .room-join');
let roomName;

window.addEventListener('load', () => {
    roomModal.modal('show');
});

roomJoin.on('click', function() {
    roomName = $('input.roomname').val().toString().trim();
    if(roomName) {
        socket.emit("new user", roomName);
        roomModal.modal('hide');
    }
});
