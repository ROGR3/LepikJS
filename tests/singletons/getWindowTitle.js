const lepik = require("../../index.js")

async function main() {
  console.log(`Starting getWindowTitle at ${Date.now()}`)

  // Method implementation
  console.log(`Getting id of current window`)
  let winHandle = await lepik.getActiveWindow()
  console.log(`Win handle:  ${winHandle}`)
  let windowName = await lepik.getWindowTitle(winHandle)
  console.log(`Window name: ${windowName}`)

  lepik.close()
  console.log(`Closing getWindowTitle at ${Date.now()}`)
}

main()