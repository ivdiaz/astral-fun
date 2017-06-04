//setMenuLightStatus();

function setMenuLightStatus() {
  var lightValue = 'desconectadas';
  if (isBridgeConnected()) {
    lightValue = 'conectadas';
  }
  document.getElementById('light-status-text').setAttribute('value', lightValue);
}

// Scene switch
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


// Light Controls
function turnLightsOff() {
  if (isBridgeConnected()) {
    turnLights(false, 254);
  } else {
    // alert user
  }
}

function turnLightsOn() {
  if (isBridgeConnected()) {
    turnLights(true, 254);
  } else {
    // alert user
  }
}

function smartBrightness() {
  if (isBridgeConnected()) {
    turnLights(true, 10);
  } else {
    // alert user
  }
}


// Media controls
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

function isBridgeConnected() {

  var hue = jsHue(); // lights library
  hue.discover().then(bridges => {
    if (bridges.length === 0) {
      console.log('No bridges found. :(');
    } else {
      bridges.forEach(b => console.log('Bridge found at IP address %s.', b.internalipaddress));
    }
  }).catch(e => {
    console.log('Error finding bridges', e);
    return false;
  });
  return true;
}

function turnLights(status, brightness) { // Status: ON = true | status: OFF = false

  var username = '128eff92117aeb3f336abf60223eb71f';
  var ip = '192.168.1.33';
  var livingroomLight = 2;
  var bedroomLight = 3;
  var user = jsHue().bridge(ip).user(username);
  var xy = getXY(255, 255, 255);


  // Modify livingroom light on
  user.setLightState(livingroomLight, {
    on: status,
    bri: brightness
  }).then(data => {
    // Alert user with message
  });
  // Modify bedroom light on
  user.setLightState(bedroomLight, {
    on: status,
    bri: brightness
  }).then(data => {
    // Alert user with message
  });
}

// The function below does the grunt work of creating an xy pair that produces
// colours equivalent to RGB colours.

function getXY(red, green, blue) {

  if (red > 0.04045) {
    red = Math.pow((red + 0.055) / (1.0 + 0.055), 2.4);
  } else red = (red / 12.92);

  if (green > 0.04045) {
    green = Math.pow((green + 0.055) / (1.0 + 0.055), 2.4);
  } else green = (green / 12.92);

  if (blue > 0.04045) {
    blue = Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4);
  } else blue = (blue / 12.92);

  var X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
  var Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
  var Z = red * 0.000088 + green * 0.072310 + blue * 0.986039;
  var x = X / (X + Y + Z);
  var y = Y / (X + Y + Z);
  return new Array(x, y);

}

function alertUser(msg, durationInSecs) {
  var message = document.getElementById('ui-message');
  message.setAttribute('value', msg);
  showMessageUI();
  setTimeout(function () {
    hideMessageUI();
  }, durationInSecs * 1000);

}

function showMessageUI() {
  var cursor = document.getElementById('cursor');
  var background = document.getElementById('ui-message-bg');
  var message = document.getElementById('ui-message');
  // Hide cursor
  cursor.setAttribute('visible', false);
  // Remove interaction
  cursor.setAttribute('raycaster', '');
  // Show message ui
  background.setAttribute('visible', true);
  message.setAttribute('visible', true);
}

function hideMessageUI() {
  var cursor = document.getElementById('cursor');
  var background = document.getElementById('ui-message-bg');
  var message = document.getElementById('ui-message');
  // Show cursor
  cursor.setAttribute('visible', true);
  // Restore interaction
  cursor.setAttribute('raycaster', 'objects: .link, .interactive');
  // Hide message ui
  background.setAttribute('visible', false);
  message.setAttribute('visible', false);
}
