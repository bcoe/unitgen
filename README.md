# unitgen

_unitgen_ is a Node.js powered [unit-generator](http://en.wikipedia.org/wiki/Unit_generator)
API, built using streams and the [speaker](https://github.com/TooTallNate/node-speaker) bindings.

_unitgen_ was built for a demo being given at [Dance.js](http://dancejs.io).

## In a nutshell

Unit generators are best thought of as a graph of transformations applied to an audio-stream.

This can be used to:

* apply effects (changing tempo, changing pitch, applying distortion).
* mix together and pan-between multiple tracks.
* pan between left and right stereo.

## How does it work?

* __unitgen__'s speaker binding invokes a callback which samples from a stream
44100 times a second.
* the stream takes a snapshot of the current state of all the unit-generators, and outputs
a frame of audio.
* a frame of audio consists of bytes indicating the speaker position for left and right audio.

## Installing

```
npm install unitgen -g
```

# Examples

So that you can get an idea of _unitgen_ in action, we've provided a few sample unit-generator-graphs.
For each example, use `a` and `s` to pan back and forth.

* **stereo.js:** uses a `function` unit-generator to play a sine-wave which can be panned between the left and right speaker.

```bash
unitgen note
```

* **canceling.js:** uses a `combiner`, and two `function` unit-generators to play two inverse sine-waves. Pan back and forth to hear them cancel out.

```bash
unitgen two-notes
```

* **mixer.js:** uses a `combiner`, and two `sound-file` unit-generators to pan between two songs.

```bash
unitgen two-songs --track1=./foo.wav --track2=./foo2.wav
```

# The future

__unitgen__ is a rough proof of concept. Over time we'd love to see this grow into a
full-featured API for building (as a practical example) mixers in JavaScript.

patches welcome!
