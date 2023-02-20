const lepik = require("lepikjs")
// move mouse relative to current position by 10px
lepik.mouseMove(100, 100)
//Absolute and duration are optional. Default false and 0.2
lepik.mouseClick("left")
//Key is optional. Default is "left"
lepik.mouseDoubleClick("right")
//Key is optional. Default is "left"
lepik.mouseDrag(10, 10, 100, 10)
//Absolute and duration are optional. Default false and 0.2
lepik.mouseScroll(10)
//Positive amount scrolls up, negative down. Default is 1
lepik.getMousePosition()
//Returns object { x: 719, y: 461 }


// Keyboard events
lepik.keyTap("b")
//Char need to be single letter
lepik.keyTap("left-shift+b")
//Char need to be single letter
lepik.write("Hello from LepikJS")
//Duration is optional. Default is 0.1
