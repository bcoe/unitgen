// Load a wave file from disk, and output
// it as a unit-generator.
var _ = require('lodash'),
  wav = require('wav'),
  streamBuffers = require("stream-buffers"),
  fs = require('fs');

function SoundFile(opts) {
  _.extend(this, {
    file: null, // path to file.
    offset: 0,
    buffer: null
  }, opts);
}

SoundFile.prototype.loadSound = function(cb) {
  var _this = this,
    file = fs.createReadStream(this.file),
    reader = new wav.Reader(),
    bufferStream = new streamBuffers.WritableStreamBuffer({
      initialSize: (10 * 1024 * 1024),        // start as 5MB
      incrementAmount: (2 * 1024 * 1024)    // grow by 1MB
    });

  reader.on('format', function(format) {
    reader.pipe(bufferStream);
  });

  reader.on('end', function(data) {
    _this.buffer = bufferStream.getContents();
    cb();
  });

  file.pipe(reader);
};

SoundFile.prototype.tick = function(vector, frames) {
  for (var i = 0; i < frames; i++) {
    var c1 = this.buffer.readInt16LE(this.offset);
    this.offset += 2;
    var c2 = this.buffer.readInt16LE(this.offset);
    this.offset += 2;

    vector.write(0, i, c1 / 32768)
    vector.write(1, i, c1 / 32768)
  }
};

module.exports = SoundFile;
