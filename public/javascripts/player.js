var player;
const socket = io.connect("//localhost:3000/");

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    playerVars: { 'autoplay': 1, 'showinfo': 0, 'playsinline': 1},
    events: {
      'onStateChange': onPlayerStateChange
    },
    videoId: ""
  });
}

// function onPlayerReady(e) {
   
//   e.target.playVideo();
// }

function onPlayerStateChange(e) {
    socket.emit("stateChanged", {data: e.data});
}

socket.on("updateState", (state) => {
  console.log(state);
  if(state.data === 2)
      player.pauseVideo();
});

document.querySelector(".url-load").addEventListener('click', (e) => {
  e.preventDefault();
  const url = document.querySelector('.url-main').value;
  const vid = url.substr(url.indexOf("=")+1);
  console.log(vid);
  player.loadVideoById(vid,0); 
});
