# LepikJS
LepikJS is a Python-based global keyboard and mouse event emitter. It allows you to listen to and emit events related to keyboard and mouse actions. You can use it for automation, testing, or any other application that requires control over user input.

You can visit LepikJS's [website](https://lepikjs.netlify.app/) for more information.

LepikJS uses [LepikEvents](https://www.npmjs.com/package/lepikevents). Definitely try that out!

> ㅤ
> ## New Info for v2.0.0+
>
> **LepikJS execution speed is now brutally reduced!**
>
> For that reason, the application will run forever, even if there are no listeners.
>
> ```javascript
>  lepik.close() // Put this on the end of the file, so the process can exit
> ```
> Also, the getMousePosition is now asynchronous.
> ```javascript
>  let {x, y} = await lepik.getMousePosition()
> ```
>  ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤLepikJSv2.0.0

## Installing
You can install LepikJS using npm:
```bash
npm install lepikjs
```

## Usage

To use LepikJS, you need to require it in your code:

```javascript
const lepik = require('lepikjs');
```

Then, you can start listening to events and emit new events:

```javascript
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
lepik.on("mouseUp",(data)=>{
  console.log(data) // { x: 753, y: 241}
})
lepik.on("mouseDown",(data)=>{
  console.log(data) // { x: 753, y: 241}
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
let supportedKeys = lepik.getSupportedKeys()
```
You can find more information about each method in the source code.

#### User performance
From v2.0.0+ you do not have to care about user perfomance!
All code execution is almost instant and you have nothin to worry about! 

## Requirements

LepikJS uses [Python keyboard](https://github.com/boppreh/keyboard) and [Python mouse](https://github.com/boppreh/mouse) which runs on Python. 

If your are on Windows, then you **don't** need to have it installed, cause thanks to [Pyinstaller](https://github.com/pyinstaller/pyinstaller), the code is compiled into executable.


## License
LepikJS is freely distributable under the terms of the [MIT license](http://opensource.org/licenses/MIT). 
See [LICENSE.md](./LICENSE.md) file.