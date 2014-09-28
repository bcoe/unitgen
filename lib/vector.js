// R/L channel vector implementation.
// eventually a binding will do this.
var _ = require('lodash');

function Vector(opts) {
  _.extend(this, {
    buffer: new Buffer(8),
    stream: null // stream to push to when a write occurs.
  });
};

Vector.prototype.write = function(channel, offset, value) {
  offset = (channel * 4) + offset;
  this.buffer.writeFloatLE(value, offset);
};

Vector.prototype.getChannelCount = function() {
  return 2;
};

module.exports = Vector;
