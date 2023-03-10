# LEPIKJS is temporary down v1.5.8+
### To use it please install version <= 1.5.7








# Visit LepikJS's [website](https://lepikjs.netlify.app/).

# LepikJS
A python based, Global Keyboard and Mouse event emmiter.

[![NPM](https://nodei.co/npm-dl/lepikjs.png)](https://www.npmjs.com/package/lepikjs)

LepikJS uses [LepikEvents](https://www.npmjs.com/package/lepikevents). Definitely try that out!

## Installing

    npm install lepikjs



## Coding

```javascript
// Require lepikEvents
const lepik = require('lepikjs');

// On every mouse click, move the cursor 100 pixels down
lepik.on("mouseClick", (data) => {
  console.log(data) // { x: 786, y: 171, button: 1 }
  lepik.mouseMove(0, 100)
})

```

## All Methods

```javascript
const lepik = require('lepikjs');

// Mouse events
lepik.mouseMove(x, y, absolute, duration)
//Absolute and duration are optional. Default false and 0.2
lepik.mouseClick(key)
//Key is optional. Default is "left"
lepik.mouseDoubleClick(key)
//Key is optional. Default is "left"
lepik.mouseDrag(fromX,fromY,toX,toY,absolute,duration)
//Absolute and duration are optional. Default false and 0.2
lepik.mouseScroll(amount)
//Positive amount scrolls up, negative down. Default is 1
lepik.getMousePosition()
//Returns object { x: 719, y: 461 }


// Keyboard events
lepik.keyTap(char)
// Alphabet char needs to be single letter
// Char can be special key too (shift, windows, clear,...)
// In case of multi-word words they are split with "-". (left-shift, right-shift,left-windows,...)
// In case you want to join multiple keys use "+" ("left-shift+b", "left-shift+x")
lepik.write(string, duration)
//Duration is optional. Default is 0.1

// Screen events
// Coming soon

// Global Listeners
lepik.on("mouseMove",(data)=>{
  console.log(data) // x: 753, y: 241, time: 1231231232
})
lepik.on("mouseClick",(data)=>{
  console.log(data) // { x: 753, y: 241, button: 1 }
})
lepik.on("mouseDoubleClick",(data)=>{
  console.log(data) // { x: 753, y: 241, button: 1 }
})
lepik.on("keyPress",(data)=>{
  console.log(data) // Returns key pressed
})
lepik.on("keyRelease",(data)=>{
  console.log(data) // Returns key released
})

// Controls
lepik.start() 
//  Code inside these methods will get executed as single proccess. Meaning faster results
lepik.end() 

// Test
lepik.log()
// Returns string "Hello from LepikJS!" (passing string as argument is allowed)

// Supported keys:
let supportedKeys = ['backspace', 'tab', 'clear', 'enter', 'shift', 'ctrl', 'alt', 'pause', 'caps-lock', 'esc', 'spacebar', 'page-up', 'page-down', 'end', 'home', 'left', 'up', 'right', 'down', 'select', 'print-screen', 'insert', 'delete', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'left-windows', 'right-windows', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12', 'f13', 'f14', 'f15', 'f16', 'f17', 'f18', 'f19', 'f20', 'f21', 'f22', 'f23', 'f24', 'num-lock', 'scroll-lock', 'left-shift', 'right-shift', 'left-ctrl', 'right-ctrl', 'left-menu', 'right-menu', 'volume-mute', 'volume-down', 'volume-up', 'next-track', 'previous-track', 'stop-media', ',', '.', 'play', 'zoom', 'clear']
// Built in LepikJS method to recieve all supported keys
let supportedKeys = lepik.getSupportedKeys()

```

## Requirements

LepikJS uses [Python keyboard](https://github.com/boppreh/keyboard) and [Python mouse](https://github.com/boppreh/mouse) which runs on Python. 

If your are on Windows, then you **don't** need to have it installed, cause thanks to [Pyinstaller](https://github.com/pyinstaller/pyinstaller), the code is compiled into executable.


## License
LepikJS is freely distributable under the terms of the [MIT license](http://opensource.org/licenses/MIT). 
See [LICENSE.md](./LICENSE.md) file.