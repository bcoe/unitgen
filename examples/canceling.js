var units = require('../lib').units,
  bindings = require('../lib').bindings,
  fs = require('fs'),
  ui = require('../lib').ui,
  binding = new bindings.SpeakerBinding(),

  // http://www.phy.mtu.edu/~suits/notefreqs.html
  u1 = new units.Function({
    left: function(i) {
      return Math.sin(130.813 * (2 * Math.PI) * i / 44100)
    },
    right: function(i) {
      return Math.sin(130.813 * (2 * Math.PI) * i / 44100)
    }
  }),
  u2 = new units.Function({
    left: function(i) {
      return Math.sin(130.813 * (2 * Math.PI) * i / 44100) * -1
    },
    right: function(i) {
      return Math.sin(130.813 * (2 * Math.PI) * i / 44100) * -1
    }
  }),
  u3 = new units.Combiner({
    inputs: [u1, u2],
    weights: [1.0, 0.0],
    binding: binding
  });

// pan left/rigth between inverse-sine-waves.
new ui.Bar({
  onUpdate: function(percent) {
    u3.weights = [1.0 - percent, percent];
  }
});

binding.play(u3);
