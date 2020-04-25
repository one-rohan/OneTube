var player;

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
  player.loadVideoById("U77d9912lrw",0);  
  e.target.playVideo();
}

function onPlayerStateChange(e) {
    console.log(e.data);
}