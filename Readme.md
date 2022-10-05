# Visit LepikJS's [website](https://lepikjs.netlify.app/).

# LepikJS
A python based, Global Keyboard and Mouse event emmiter.

[![NPM](https://nodei.co/npm-dl/lepikjs.png)](https://www.npmjs.com/package/lepikjs)

LepikJS uses [LepikEvents](https://www.npmjs.com/package/lepikevents). Definitely try that out!

## Installing

    npm install lepikjs

> ㅤ
> ## New Feature v1.4.0+
>
> **LepikJS now includes a method for capturing mouse move event!**
>
> > [lepik.on("mouseMove", cb)](#all-methods)
> 
> **JS object is passed to callback function. It contain these values:** *x, y, time*
> ㅤ
>  ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤLepikJSv1.4.0


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
//Char need to be single letter
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

```

## Requirements

LepikJS uses [Python keyboard](https://github.com/boppreh/keyboard) and [Python mouse](https://github.com/boppreh/mouse) which runs on Python. 

If your are on Windows, then you **don't** need to have it installed, cause thanks to [Pyinstaller](https://github.com/pyinstaller/pyinstaller), the code is compiled into executable.



## License
LepikJS is freely distributable under the terms of the [MIT license](http://opensource.org/licenses/MIT). 
See [LICENSE.md](./LICENSE.md) file.