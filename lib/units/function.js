// Generate an arbitrary wave-form
// from a left-right function.
var _ = require('lodash'),
  wav = require('wav'),
  streamBuffers = require("stream-buffers"),
  fs = require('fs');

function Function(opts) {
  _.extend(this, {
    file: null, // path to file.
    offset: 0,
    buffer: null,
    left: null,
    right: null,
    counter: 0
  }, opts);
}

Function.prototype.tick = function(vector, frames) {
  for (var i = 0; i < frames; i++) {
    this.counter ++;
    vector.write(0, i, this.left(this.counter))
    vector.write(1, i, this.right(this.counter))
  }
};

module.exports = Function;
