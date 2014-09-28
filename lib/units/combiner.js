// Combines two other unit-generators.
var _ = require('lodash');

function Combiner(opts) {
  _.extend(this, {
    inputs: [], // generators providing audio.
    weights: [],
    binding: null, // binding to audio native or gyp.
  }, opts);

  this.v1 = this.binding.allocateVector(),
  this.v2 = this.binding.allocateVector();
}

Combiner.prototype.tick = function(vector, frames) {
  this.inputs[0].tick(this.v1, 1);
  this.inputs[1].tick(this.v2, 1);

  var v1c1 = this.v1.buffer.readFloatLE(0);
  var v1c2 = this.v1.buffer.readFloatLE(4);

  var v2c1 = this.v2.buffer.readFloatLE(0); // this.v2.read(0)
  var v2c2 = this.v2.buffer.readFloatLE(4); // this.v2.read(1)

  vector.write(0, 0, (v1c1 * this.weights[0]) + (v2c1 * this.weights[1]) );
  vector.write(1, 0, (v1c2 * this.weights[0]) + (v2c2 * this.weights[1]) );
};

module.exports = Combiner;
