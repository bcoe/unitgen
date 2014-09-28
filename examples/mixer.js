module.exports = function(args) {
  // takes two waves as an argument.
  var async = require('async'),
    units = require('../lib').units,
    bindings = require('../lib').bindings,
    ui = require('../lib').ui,
    binding = new bindings.SpeakerBinding(),
    u1 = new units.Sound({
      file: args['track1']
    }),
    u2 = new units.Sound({
      file: args['track2']
    });

  async.parallel([
    function(done) {
      u1.loadSound(done);
    },
    function(done) {
      u2.loadSound(done);
    }
  ], function() {
    // don't start playing music until
    // we've loaded both waves.
    var u3 = new units.Combiner({
      inputs: [u1, u2],
      weights: [1.0, 0.0],
      binding: binding
    });

    // pan left and right between two songs.
    new ui.Bar({
      onUpdate: function(percent) {
        u3.weights = [1.0 - percent, percent];
      }
    });

    binding.play(u3);
  });
}
