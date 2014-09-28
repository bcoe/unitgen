// Stream implementation, hooks into a
// graph of unit-generators, and creates
// a stream that can be piped to the speaker
// API.
var Readable = require('stream').Readable,
  util = require('util'),
  Vector = require('./vector'),
  vector = new Vector();

util.inherits(UnitBuffer, Readable);

function UnitBuffer(opt, unit) {
  this.unit = unit; // the unit generator.
  Readable.call(this, opt);
}

UnitBuffer.prototype._read = function() {
  this.unit.tick(vector, 1);
  this.push(vector.buffer);
};

module.exports = UnitBuffer;
