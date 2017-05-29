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
    var currentMedia = getCurrentMediaElement();
    currentMedia.load();
    currentMedia.pause();
    screen.setAttribute('src', mediaSrc);
    var nextMedia = document.getElementById(mediaId);
    nextMedia.load();
    if (blackScreen.getAttribute('visible') == true) {
      blackScreen.setAttribute('visible', false);
    }
    screen.setAttribute('visible', true);
    playPause();


  }

  function playPause() {
    var playPauseIconObj = document.getElementById('play-pause-icon');
    if (getCurrentMediaElement().paused == true) {
      var blackScreen = document.getElementById('black-screen');
      var screen = document.getElementById('screen');
      if (blackScreen.getAttribute('visible') == true) {
        blackScreen.setAttribute('visible', false);
      }
      screen.setAttribute('visible', true);
      getCurrentMediaElement().play();
      playPauseIconObj.setAttribute('src', '#pause-icon');
    } else {
      playPauseIconObj.setAttribute('src', '#play-icon');
    }
  }

  function goToPrevious() {


  }

  function stepBack() {

  }

  function stepForward() {

  }

  function goToNext() {

  }

  function pause(){
    var currentMedia = getCurrentMediaElement();
    currentMedia.pause();
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


  //  function switchPlayPauseIcons() {
  //    var playObj = document.getElementById('play');
  //    var pauseObj = document.getElementById('pause');
  //    if (playObj.getAttribute('visible') === true) {
  //      playObj.setAttribute('visible', 'false');
  //      playObj.setAttribute('data-position', '0 0.07 0.0');
  //      pauseObj.setAttribute('visible', 'true');
  //      pauseObj.setAttribute('data-position', '0 0.07 0.1');
  //    } else {
  //      playObj.setAttribute('visible', 'true');
  //      playObj.setAttribute('data-position', '0 0.07 0.1');
  //      pauseObj.setAttribute('visible', 'false');
  //      pauseObj.setAttribute('data-position', '0 0.07 0');
  //    }
  //  }
