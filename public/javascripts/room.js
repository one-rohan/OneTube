const socket = io.connect();

const roomModal =  $('#roomModal');
const roomJoin = $($('.room-join'), '#roomModal');

window.addEventListener('load', () => {
    roomModal.modal('show');
});

roomJoin.on('click', function() {
    let roomName = $('input.roomname').val().toString().trim();
    if(roomName) {
        socket.emit("new user", roomName);
        roomModal.modal('hide');
    }
});
