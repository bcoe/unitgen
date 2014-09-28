// Pipes a chain of unit-generators to
// the sound-card using the speaker binding.
var _ = require('lodash'),
  UnitBuffer = require('./unit-buffer'),
  Speaker = require('speaker'),
  Vector = require('./vector');

function SpeakerBinding(opts) {
  _.extend(this, {
  // allow for overrides at some point.
  }, opts);

  this.speaker = new Speaker({
    channels: 2,          // 2 channels
    bitDepth: 32,         // 32-bit samples
    sampleRate: 44100,     // 44,100 Hz sample rate
    signed: true,
    float: true
  });
}

SpeakerBinding.prototype.play = function(unit) {
  var buffer = new UnitBuffer({}, unit);
  buffer.pipe(this.speaker);
}

SpeakerBinding.prototype.allocateVector = function(channels, frames) {
  return new Vector();
}

module.exports = SpeakerBinding;
