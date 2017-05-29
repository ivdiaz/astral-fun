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

AFRAME.registerComponent('play-pause-switcher', {
  schema: {},
  init: function () {
    var self = this;
    var data = self.data;
    var elScene = self.el;
    //    on click
    // To pause
    if (self.pause == false) {
      self.setAttribute('src', '#icon-pause');
      self.

    }else {

    }

  }
});

AFRAME.registerComponent('mouse-highlight', {
  schema: {},
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
