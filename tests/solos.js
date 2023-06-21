const lepik = require("../index.js")

lepik.on("mouseClick", async e => {
  let window = await lepik.closeWindow(460060)
  console.log(window)
})