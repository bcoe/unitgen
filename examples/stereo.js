var units = require('../lib').units,
  bindings = require('../lib').bindings,
  fs = require('fs'),
  ui = require('../lib').ui,
  binding = new bindings.SpeakerBinding(),
  left = 1.0,

  // http://www.phy.mtu.edu/~suits/notefreqs.html
  u1 = new units.Function({
    left: function(i) {
      return Math.sin(130.813 * (2 * Math.PI) * i / 44100) * left
    },
    right: function(i) {
      //return 0;
      return Math.sin(130.813 * (2 * Math.PI) * i / 44100) * (1.0 - left)
    }
  });

// pan back and forth between left/right stereo.
new ui.Bar({
  onUpdate: function(percent) {
    left = 1.0 - percent;
  }
});

binding.play(u1);
