var player;
const socket = io.connect("ws://localhost:3000/");

let videoState = {
  videoId: "",
  state: -1,
  time: 0
};

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

document.querySelector(".url-load").addEventListener('click', (e) => {
  const url = document.querySelector('.url-main').value;
  const vid = url.substr(url.indexOf("=")+1);
  videoState.videoId = vid;
  socket.emit("loadVideo", videoState);
  player.loadVideoById(vid,0); 
});

document.querySelector(".sync").addEventListener('click', () => {
  videoState.time = player.getCurrentTime();
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
