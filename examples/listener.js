const lepik = require("lepikjs")
// listen on mouse click, then log the position and it's type
lepik.on("mouseClick", (data) => {
  console.log(data) // { x: 753, y: 241, button: 1 }
})
lepik.on("keyRelease", (data) => {
  console.log(data) // Returns key released
})
