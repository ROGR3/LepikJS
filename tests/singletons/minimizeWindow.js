const lepik = require("../../index.js")

async function main() {
  console.log(`Starting minimizeWindow at ${Date.now()}`)

  // Method implementation
  console.log("Getting id of current window")
  let winHandle = await lepik.getActiveWindow()
  console.log("Should minimize the active window")
  lepik.minimizeWindow(winHandle)

  lepik.close()
  console.log(`Closing minimizeWindow at ${Date.now()}`)
}

main()