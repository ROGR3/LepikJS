# LepikJS
LepikJS is a global keyboard and mouse event emitter. It allows you to listen to and emit events related to keyboard and mouse actions as well as managing windows and screens. You can use it for automation, testing, or any other application that requires control over dekstop and user input.

You can visit LepikJS's [website](https://lepikjs.netlify.app/) for more information.

LepikJS is available on NPM [LepikJS](https://www.npmjs.com/package/lepikjs).
LepikJS uses [LepikEvents](https://www.npmjs.com/package/lepikevents). Don't forget to try that out!

> ㅤ
> #### New Info for v3.1.0+
>
> LepikJS now supports a lot of screen events. 
>```javascript
>  lepik.setActiveWindow(windowHandle) // Focus a window
>  lepik.minimizeWindow(windowHandle) // minimize a window
>  lepik.maximizeWindow(windowHandle) // maximize a window
>  lepik.closeWindow(windowHandle) // close a window
>  lepik.getWindowTitle(windowHandle) // Return title of the window
>  lepik.getWindowSize(windowHandle) // Return width and height of given window
>  lepik.setWindowSize(windowHandle, width, height) // Set the width and height of given window.
>  lepik.setWindowPosition(windowHandle, x, y) // Set the positon of given window.
>  lepik.focusNextWindow() // Focuses next window (Alt-Tab functionality)
>  lepik.focusWindowByTitle(windowTitle) // Focuses window by the window title
>  lepik.closeApplication(windowTitle) // Closes window by the window title
>  lepik.openApplication(windowTitle) // Opens window by the window title
>```
>ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤLepikJSv3.1.0

## Installing
You can install LepikJS using npm:
```bash
npm install lepikjs
```

> LepikJS automaticly downloads xdotool on \*nix (non-windows) machines.
> If the first run fails, install it manually to make it work
> `(sudo apt/apt-get/dnf/... install xdotool)`


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
You can see all methods inside: 
1. [Unix](./docs/UnixLepik.md) docs
2. [Windows](./docs/WindowsLepik.md) docs
3. [Website](https://lepikjs.netlify.app/)

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
await lepik.getMousePosition() // Async function on windows!
//Returns object { x: 719, y: 461 }


// Keyboard events
lepik.keyTap(char) // Press the key once
lepik.keyUp(char) // Hold the key pressed
lepik.keyDown(char) // Releases the key
// Alphabet char needs to be single letter
// Char can be special key too (shift, windows, clear,...)
// In case of multi-word words they are split with "-". (left-shift, right-shift,left-windows,...)
// If you want to join multiple keys use "+" ("left-shift+b", "left-shift+x")
lepik.write(string, duration)
//Duration is optional. Default is 0.1
lepik.copy() // Copies currently selected object
lepik.paste() // Pastes currently coppied object



// Screen events
await lepik.getScreenSize() // Async function on windows!
//Returns object { width: 719, height: 461 }
let windowHandle = await lepik.getActiveWindow() // Async function on windows!
//Returns window handle integer of the currently active window
lepik.setActiveWindow(windowHandle) // Focus a window
lepik.minimizeWindow(windowHandle) // minimize a window
lepik.maximizeWindow(windowHandle) // maximize a window
lepik.closeWindow(windowHandle) // close a window
lepik.getWindowTitle(windowHandle) // Return title of the window
lepik.getWindowSize(windowHandle) // Return width and height of given window
lepik.setWindowSize(windowHandle, width, height) // Set the width and height of given window. On windows, the window cannot be maximized.
lepik.setWindowPosition(windowHandle, x, y) // Set the position of given window.
lepik.focusNextWindow() // Focuses next window (Alt-Tab functionality)
lepik.focusWindowByTitle(windowTitle) // Focuses window by the window title
lepik.closeApplication(windowTitle) // Closes window by the window title
lepik.openApplication(windowTitle) // Opens window by the window title


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
lepik.on("keyUp",(data)=>{
  console.log(data) // Returns key released
})
lepik.on("keyDown",(data)=>{
  console.log(data) // Returns key holt
})

// Controls
// Uses while loop to block the whole thread
// Number of miliseconds to delay the code execution
lepik.delay(ms) 
// Uses promises to wait until promise is resolved
// When reached this line, the process can exit.
lepik.close() 
```
You can find more information about each method in the [source code](https://github.com/Borecjeborec1/LepikJS/tree/main/src).
1. [Windows](https://github.com/Borecjeborec1/LepikJS/blob/main/src/WindowsLepik.ts) code
2. [Unix/Linux](https://github.com/Borecjeborec1/LepikJS/blob/main/src/UnixLepik.ts) code


#### User performance
From v2.0.0+ you do not have to care about user perfomance!
All code execution is 'almost' instant and you have nothing to worry about! 

## Requirements
From v3.0.0+ LepikJS uses native powershell scripting which should not require any aditional setup on windows.

On Unix machines LepikJS uses xdotool, which will get automaticly installed with the first application run. *Note: 1st run must be run with sudo permissions and all other runs should be run with it too to ensure right functionality.*

For older versions of LepikJS python was needed on non-windows machines. Now it's not the case :D


## License
LepikJS is freely distributable under the terms of the [MIT license](http://opensource.org/licenses/MIT). 
See [LICENSE.md](./LICENSE.md) file.