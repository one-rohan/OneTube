var player;
const socket = io.connect("//localhost:3000/");

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    playerVars: { 'autoplay': 1, 'controls': 0, 'showinfo': 0, 'playsinline': 1, 'disablekb': 1},
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(e) {
  player.loadVideoById("",0);  
  e.target.playVideo();
}

function onPlayerStateChange(e) {
    console.log(e.data);
}

socket.on("new", (data) => {
  window.alert(data.hello);
});