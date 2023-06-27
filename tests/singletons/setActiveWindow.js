const lepik = require("../../index.js")

async function main() {
  console.log(`Staring setActiveWindow at ${Date.now()}`)

  // Method implementation
  console.log("Getting id of current window")
  let winHandle = await lepik.getActiveWindow()
  console.log("Minimizing active window")
  lepik.minimizeWindow(winHandle)
  console.log("Activating the window back")
  lepik.setActiveWindow(winHandle)

  lepik.close()
  console.log(`Closing setActiveWindow at ${Date.now()}`)
}

main()