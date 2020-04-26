var player;
const socket = io.connect("//localhost:3000/");

let videoState = {
  videoId: "5dmQ3QWpy1Q",
  state: -1
};

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    playerVars: { 'autoplay': 0, 'showinfo': 0, 'playsinline': 1},
    events: {
      'onStateChange': onPlayerStateChange
    },
    videoId: "5dmQ3QWpy1Q"
  });
}

function onPlayerStateChange(e) {
    // socket.emit("stateChanged", {data: e.data});
    videoState.state = e.data;
}

document.querySelector(".url-load").addEventListener('click', (e) => {
  e.preventDefault();
  const url = document.querySelector('.url-main').value;
  const vid = url.substr(url.indexOf("=")+1);
  videoState.videoId = vid;
  player.loadVideoById(vid,0); 
});

document.querySelector(".sync").addEventListener('click', () => {
  socket.emit("stateSync", videoState);
});

socket.on("updateState", (state) => {
  console.log(state);
  player.loadVideoById(state.videoId, 0);
  if(state.state === 1)
    player.playVideo();
  else if(state.state === 2)
    player.pauseVideo();
});
