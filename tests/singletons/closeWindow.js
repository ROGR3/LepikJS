const lepik = require("../../index.js")

async function main() {
  console.log(`Starting closeWindow at ${Date.now()}`)

  // Method implementation
  console.log(`Getting id of current window`)
  let winHandle = await lepik.getActiveWindow()
  console.log(`Should close the active window ${winHandle}`)
  lepik.closeWindow(winHandle)

  lepik.close()
  console.log(`Closing closeWindow at ${Date.now()}`)
}

main()