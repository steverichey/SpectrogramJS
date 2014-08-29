# [SpectrogramJS](http://steverichey.github.io/SpectrogramJS/)

A JavaScript tool for obfuscating images in the [spectrogram](http://en.wikipedia.org/wiki/Spectrogram) data of audio files. Designed to be simple, free, and fast.

## Usage

Go [here](http://steverichey.github.io/SpectrogramJS/).
Drag and drop an image onto the page.
Wait while your image is processed.
Once ready, download your audio file.
To verify your data was properly hidden, feel free to view the audio data with [Audacity](http://audacity.sourceforge.net/) or some similar audio editing software.
You can "blend" this data with other sounds by including the generated audio as one track in your sound file, and other audio in other tracks. The blended output will retain some of the obscured data.

## About

SpectrogramJS was written in [Haxe](http://haxe.org/) and built to JavaScript. I chose this method because Haxe is strictly typed, and I'm very familiar with its syntax.

SpectrogramJS was created when I realized there were no "plug and play" solutions for obfuscating images in spectrogram data.

## Other

* Be warned that compression will change the appearance of the spectrogram.

## License

Shared under an MIT license. See `license.md` for details.