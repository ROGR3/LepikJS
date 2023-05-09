const lepik = require("lepikjs")
// listen on mouse click, then log the position and it's type
lepik.on("mouseMove", (data) => {
  console.log(data) // { x: 753, y: 241, timestamp:123456789 }
})
lepik.on("mouseClick", (data) => {
  console.log(data) // { x: 753, y: 241, button: 1 }
})
lepik.on("mouseDown", (data) => {
  console.log(data) // { x: 753, y: 241, button: 1 }
})
lepik.on("mouseUp", (data) => {
  console.log(data) // { x: 753, y: 241, button: 1 }
})
lepik.on("keyPress", (data) => {
  console.log(data) // Returns key pressed
})
lepik.on("keyRelease", (data) => {
  console.log(data) // Returns key release
})