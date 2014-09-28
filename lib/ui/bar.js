// left-right pan, hit 'a' and 's' to pan back and forth.
var _ = require('lodash'),
  ProgressBar = require("progress"),
  stdin = process.stdin;

function Bar(opts) {
  var _this = this;

  _.extend(this, {
    total: 20
  }, opts);

  this.bar = new ProgressBar(':bar', { total: this.total }),

  // without this, we would only get streams once enter is pressed
  stdin.setRawMode( true );

  // resume stdin in the parent process (node app won't quit all by itself
  // unless an error or process.exit() happens)
  stdin.resume();

  // i don't want binary, do you?
  stdin.setEncoding( 'utf8' );

  // on any data into stdin
  stdin.on( 'data', function( key ){
    // ctrl-c ( end of text )
    if ( key === '\u0003' ) {
      process.exit();
    } else

    if (key === 'a') {
      if (_this.bar.curr > 0) _this.bar.tick(-1);
      _this.onUpdate(_this.progress());
    } else

    if (key === 's') {
      if (_this.bar.curr < _this.total) _this.bar.tick(1);
      _this.onUpdate(_this.progress());
    }
  });

  // draw the initial bar.
  setTimeout(function() {
    _this.bar.tick(0);
  }, 200);
};

// calculate % progress based on bar position.
Bar.prototype.progress = function() {
  return this.bar.curr / this.total;
};

module.exports = Bar;
