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

function turnLightsOff(){

}

function turnLightsOn(){

}

function smartBrightness(){

}
