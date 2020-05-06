var player;

let videoState = {
  roomname: "",
  videoId: "",
  state: -1,
  time: 0
};

const loadButton = document.querySelector(".url-load");
const loadInput = document.getElementById("urlMain");

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    playerVars: { 'autoplay': 0, 'showinfo': 0, 'playsinline': 1},
    events: {
      'onStateChange': onPlayerStateChange
    },
    videoId: ""
  });
}

function onPlayerStateChange(e) {
    videoState.state = e.data;
}

const loadVideo = () => {
  const url = document.querySelector('.url-main');
  if(url.value) {
    const vid = url.value.substr(url.value.length - 11);
    videoState.videoId = vid;
    videoState.roomname = sessionStorage.getItem('roomname');
    socket.emit("loadVideo", videoState);
    player.loadVideoById(vid,0);
    url.innerHTML = ''
  }
}

loadButton.addEventListener('click', loadVideo);
loadInput.addEventListener('keypress', (e) => {
  if(e.keyCode === 13) {
    e.preventDefault();
    loadVideo();
  }
});

document.querySelector(".sync").addEventListener('click', () => {
  videoState.time = player.getCurrentTime();
  videoState.roomname = sessionStorage.getItem('roomname');
  socket.emit("stateSync", videoState);
});

socket.on("loadVideoId", (state) => {
  player.loadVideoById(state.videoId, 0);
  videoState.videoId = state.videoId;
});

socket.on("updateState", (state) => {
  player.seekTo(parseFloat(state.time));
  if(state.state === 1)
    player.playVideo();
  else if(state.state === 2)
    player.pauseVideo();
  else if(state.state === 0)
    player.endVideo();
});
