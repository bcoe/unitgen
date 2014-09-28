#!/usr/bin/env node

var yargs = require('yargs')
    .options('t', {
      alias: 'track1',
      default: './test.wav',
      description: 'first wave file to pass into cross-fade example.'
    })
    .options('r', {
      alias: 'track2',
      default: './test2.wav',
      description: 'second wave file to pass into cross-fade example.'
    }),
  commands = {
    'stereo': {
      description: 'stereo:\t\tplays a tone that can be panned between left and right stereo.\n',
      command: function(args) {
        require('../examples/stereo');
      }
    },
    'canceling': {
      description: 'canceling:\tplay two notes that cancel each other when panned to center.\n',
      command: function(args) {
        require('../examples/canceling');
      }
    },
    'mixer': {
      description: 'mixer:\tmix between two audio-files.',
      command: function(args) {
        require('../examples/mixer')(args);
      }
    }
  },
  usageString = "nugen, a node-based audio-mixer!\n\n";

// generate usage string.
Object.keys(commands).forEach(function(command) {
  usageString += commands[command].description;
});

yargs.usage(usageString);

// display help if command is not recognized.
if (yargs.argv.help || !commands[yargs.argv._[0]]) {
  console.log(yargs.help());
} else {
  // update config singleton and run command.
  var argv = yargs.normalize().argv;

  console.log("type 'a' and 's' to pan left and right.")
  commands[yargs.argv._[0]].command(argv);
}

process.on('uncaughtException', function(err) {
  console.log(err.message);
  process.exit(0);
});
