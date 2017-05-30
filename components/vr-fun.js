"use strict";


// MODE SWITCH
function switchToTheaterMode() {
  document.getElementById('room-bg').setAttribute('src', '#theater');
  document.getElementById('room-bg').setAttribute('rotation', '0 90 0');
  document.getElementById('scene-container').setAttribute('template', 'src', '#theater-mode');
}

function switchToRoomMode() {
  document.getElementById('room-bg').setAttribute('src', '#room');
  document.getElementById('room-bg').setAttribute('rotation', '0 180 0');
  document.getElementById('scene-container').setAttribute('template', 'src', '#room-mode');
}


// LIGHT CONTROLS
function turnLightsOff() {

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
  if (oldMediaId) {
    var oldMedia = document.getElementById(oldMediaId.substr(1));
    oldMedia.load();
    oldMedia.pause();
  }
  screen.setAttribute('src', '#' + mediaId);
  screen.components.material.material.map.image = document.getElementById(mediaId); // Workaround to fix material update on new contentLoad
  //  screen.components.material.material.map.image.setAttribute('src', '#' + mediaId);
  //  screen.components.material.material.map.image.play();
  if (blackScreen.getAttribute('visible') == true) {
    blackScreen.setAttribute('visible', false);
  }
  screen.setAttribute('visible', true);
}

function goToPrevious() {


}

function stepBack() {
  var currentMedia = getCurrentMediaElement();
  if (currentMedia) {
    var currentTime = currentMedia.currentTime;
    currentMedia.pause();
    if (currentTime >= 5) {
      currentMedia.currentTime -= 5; // Move 5 seconds back in time
    } else {
      currentMedia.currentTime = 0;
    }
    currentMedia.play();
  }
}

function stepForward() {

}

function goToNext() {

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
