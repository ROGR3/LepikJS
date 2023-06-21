const lepik = require("../index.js")

lepik.on("mouseClick", async e => {
  let window = await lepik.setActiveWindow(66762)
  console.log(window)
})