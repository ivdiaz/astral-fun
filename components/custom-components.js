/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in
 */
AFRAME.registerComponent('set-image', {
  schema: {
    on: {
      type: 'string'
    },
    target: {
      type: 'selector'
    },
    src: {
      type: 'string'
    },
    dur: {
      type: 'number',
      default: 100
    }
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    this.setupFadeAnimation();

    el.addEventListener(data.on, function () {
      data.target.setAttribute('material', 'color:#f00');
      // Fade out image
      data.target.emit('set-image-fade');
      // Wait for fade to complete
      setTimeout(function () {
        // Set image
        // Hack for modifying visibility
        if (data.src.startsWith('visible')) {
          var visibleValue = data.src.split(':')[1];
          data.target.setAttribute('visible', visibleValue);
        } else {
          data.target.setAttribute('material', 'src', data.src);
        }
      }, data.dur);
    });
  },

  /**
   * Setup fade-in + fade-out
   */
  setupFadeAnimation: function () {
    var data = this.data;
    var targetEl = this.data.target;

    // Only set up once.
    if (targetEl.dataset.setImageFadeSetup) {
      return;
    }
    targetEl.dataset.setImageFadeSetup = true;

    // Create animation.
    targetEl.setAttribute('animation__fade', {
      property: 'material.color',
      startEvents: 'set-image-fade',
      dir: 'alternate',
      dur: data.dur,
      from: '#FFF',
      to: '#000'
    });
  }
});

AFRAME.registerComponent('play-control', {
  init: function () {
    this.el.setAttribute('visible', true);
    this.el.setAttribute('position', '0 0.07 0.1');
    this.el.addEventListener('click', function () {
      var playSwitcher = document.getElementById('play-switcher');
      var pauseSwitcher = document.getElementById('pause-switcher');
      var screen = document.getElementById('screen');
      var videoElem = document.getElementById(screen.getAttribute('src').substr(1));
      videoElem.play();
      var blackScreen = document.getElementById('black-screen');
      if (blackScreen.getAttribute('visible') == true) {
        blackScreen.setAttribute('visible', false);
      }
      screen.setAttribute('visible', true);
      playSwitcher.setAttribute('position', '0 0.07 0.0'); // To let pause button in front
      playSwitcher.setAttribute('visible', false); // Hide the play button
      pauseSwitcher.setAttribute('position', '0 0.07 0.1'); // Show pause button in front of camera
      pauseSwitcher.setAttribute('visible', true); // Show pause button
    });
  }
});

AFRAME.registerComponent('pause-control', {
  init: function () {
    this.el.setAttribute('visible', false);
    this.el.setAttribute('position', '0 0.07 0.0');
    this.el.addEventListener('click', function () {
      var pauseSwitcher = document.getElementById('pause-switcher');
      var playSwitcher = document.getElementById('play-switcher');
      var screen = document.getElementById('screen');
      var videoElem = document.getElementById(screen.getAttribute('src').substr(1));
      videoElem.pause();
      pauseSwitcher.setAttribute('position', '0 0.07 0.0'); // To let play button in front of camera
      pauseSwitcher.setAttribute('visible', false); // Hide the pause button
      playSwitcher.setAttribute('position', '0 0.07 0.1'); // Show play button
      playSwitcher.setAttribute('visible', true); // Show play button
    });
  }
});

//AFRAME.registerComponent('play-pause-switcher', {
//  init: function () {
//    var data = this.data;
//    var elScene = this.el;
//    var playSwitcher = elScene.querySelector('play-pause');
//    var videoElement = getCurrentMediaElement();
//    var playSwitcher = document.getElementById('play-pause');
//    playSwitcher.addEventListener('click', function () {
//      // To pause
//      if (this.pause == false) {
//        this.setAttribute('src', '#pause-icon');
//        videoElement.pause();
//        // To play
//      } else {
//        this.setAttribute('src', '#play-icon');
//        videoElement.play();
//      }
//    });
//  }
//});

AFRAME.registerComponent('mouse-highlight', {
  init: function () {
    var data = this.data;
    this.el.addEventListener('mouseenter', function () {
      this.setAttribute('scale', '1.5 1.5 1.5');
    });
    this.el.addEventListener('mouseleave', function () {
      this.setAttribute('scale', '1 1 1');
    });
  }
});
