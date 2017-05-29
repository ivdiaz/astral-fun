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
  console.log('screen before', screen);

//  screen.setAttribute('src', mediaSrc);
  screen.setAttribute('src', '#' + mediaId);
  console.log('screen after', screen);
  if (blackScreen.getAttribute('visible') == true) {
    blackScreen.setAttribute('visible', false);
  }
  screen.setAttribute('visible', true);
}

function goToPrevious() {


}

function stepBack() {

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
  case mediaList.gameOfThrones.src:
    currentMedia = document.getElementById(mediaList.gameOfThrones.id.substr(1));
    break;
  case mediaList.pirates.src:
    currentMedia = document.getElementById(mediaList.pirates.id.substr(1));
    break;
  case mediaList.starWars.src:
    currentMedia = document.getElementById(mediaList.starWars.id.substr(1));
    break;
  }
  return currentMedia;
}
