// MODE SWITCH
function switchToTheaterMode() {
  document.getElementById('room-bg').setAttribute('src', '#theater');
  document.getElementById('room-bg').setAttribute('rotation', '0 83 0');
  document.getElementById('scene-container').setAttribute('template', 'src', '#theater-mode');
}

function switchToRoomMode() {
  document.getElementById('room-bg').setAttribute('src', '#room');
  document.getElementById('room-bg').setAttribute('rotation', '0 180 0');
  document.getElementById('scene-container').setAttribute('template', 'src', '#room-mode');
}


// LIGHT CONTROLS
function turnLightsOff() {
//  checkConnectionToBridge();

}

function turnLightsOn() {

}

function smartBrightness() {

}


// MEDIA CONTROLS
function contentLoad(mediaId, mediaSrc) {
  var blackScreen = document.getElementById('black-screen');
  var screen = document.getElementById('screen');
  var oldMediaId = screen.getAttribute('src');
  var playOnLoad = false;
  if (oldMediaId) {
    var oldMedia = document.getElementById(oldMediaId.substr(1));
    if (oldMedia.paused == false) {
      playOnLoad = true;
    }
    oldMedia.load();
    oldMedia.pause();
  }
  screen.setAttribute('src', '#' + mediaId);
  screen.components.material.material.map.image = document.getElementById(mediaId); // Workaround to fix material update on new contentLoad
  //    screen.components.material.material.map.image.setAttribute('src', '#' + mediaId);
  if (playOnLoad) {
    screen.components.material.material.map.image.play();
  }
  if (blackScreen.getAttribute('visible') == true) {
    blackScreen.setAttribute('visible', false);
  }
  screen.setAttribute('visible', true);
}

function goToPrevious() {
  var mediaList = [
    {
      id: 'game-of-thrones',
      src: 'media/got.mp4'
    }, {
      id: 'pirates',
      src: 'media/pirates.mp4'
    }, {
      id: 'star-wars',
      src: 'media/star-wars.mp4'
    }
  ];
  var currentMedia = getCurrentMediaElement();
  var threshold = 5;
  if (currentMedia) {
    var currentTime = currentMedia.currentTime;
    if (currentTime > threshold) { // restart movie
      currentMedia.currentTime = 0;
    } else { // if its restarted, move back
      var mediaData = mediaList.find(x => x.id === currentMedia.id);
      var currentIndex = mediaList.indexOf(mediaData);
      var nextMedia = mediaList[2]; //last position on array by default
      if (currentIndex != 0) {
        nextMedia = mediaList[currentIndex - 1];
      }
      contentLoad(nextMedia.id, nextMedia.src);
    }
  }
}

function stepBack() {
  var step = 5;
  var currentMedia = getCurrentMediaElement();
  if (currentMedia) {
    var currentTime = currentMedia.currentTime;
    currentMedia.pause();
    if (currentTime >= step) {
      currentMedia.currentTime -= step; // Move 5 seconds back in time
    } else {
      currentMedia.currentTime = 0;
    }
    currentMedia.play();
  }
}

function stepForward() {
  var step = 5;
  var currentMedia = getCurrentMediaElement();
  if (currentMedia) {
    var currentTime = currentMedia.currentTime;
    currentMedia.pause();
    if (currentTime <= currentMedia.duration) {
      currentMedia.currentTime += step; // Move 5 seconds forward in time
    } else {
      currentMedia.currentTime = currentMedia.duration - 1;
    }
    currentMedia.play();
  }
}

function goToNext() {
  var mediaList = [
    {
      id: 'game-of-thrones',
      src: 'media/got.mp4'
    }, {
      id: 'pirates',
      src: 'media/pirates.mp4'
    }, {
      id: 'star-wars',
      src: 'media/star-wars.mp4'
    }
  ];
  var currentMedia = getCurrentMediaElement();
  if (currentMedia) {
    var mediaData = mediaList.find(x => x.id === currentMedia.id);
    var currentIndex = mediaList.indexOf(mediaData);
    var nextMedia = mediaList[0]; //last position on array by default
    if (currentIndex != 2) {
      nextMedia = mediaList[currentIndex + 1];
    }
    contentLoad(nextMedia.id, nextMedia.src);
  }
}

// UTILS
function getCurrentMediaElement() {
  var screen = document.getElementById('screen');
  var screenSrc = screen.getAttribute('src');
  var mediaList = {
    gameOfThrones: {
      id: '#game-of-thrones',
      src: 'media/got.mp4'
    },
    pirates: {
      id: '#pirates',
      src: 'media/pirates.mp4'
    },
    starWars: {
      id: '#star-wars',
      src: 'media/star-wars.mp4'
    }
  };
  var currentMedia = '';
  switch (screenSrc) {
  case mediaList.gameOfThrones.id:
    currentMedia = document.getElementById(mediaList.gameOfThrones.id.substr(1));
    break;
  case mediaList.pirates.id:
    currentMedia = document.getElementById(mediaList.pirates.id.substr(1));
    break;
  case mediaList.starWars.id:
    currentMedia = document.getElementById(mediaList.starWars.id.substr(1));
    break;
  }
  return currentMedia;
}

function checkConnectionToBridge() {
  var url = 'https://www.novelti.io';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.setRequestHeader('Content-type', 'text/html');
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET,POST, PUT, DELETE, OPTIONS');
  xhr.setRequestHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  xhr.send();

  xhr.onreadystatechange = processRequest;

  function processRequest(e) {
    console.log(e);
  }
}
