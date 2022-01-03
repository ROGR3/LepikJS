const lepik = require("lepikjs")
// listen on mouse click, then log the position and it's type
lepik.on("mouseClick", (data) => {
  console.log(data)
})