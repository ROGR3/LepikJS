const lepik = require("../index.js")

lepik.on("mouseClick", async e => {
  let window = await lepik.getMousePostion()
  console.log(window)
})