const lepik = require("../../index.js")

async function main() {
  console.log(`Starting maximizeWindow at ${Date.now()}`)

  // Method implementation
  console.log("Getting id of current window")
  let winHandle = await lepik.getActiveWindow()
  console.log("Should maximize the active window")
  lepik.maximizeWindow(winHandle)

  lepik.close()
  console.log(`Closing maximizeWindow at ${Date.now()}`)
}

main()