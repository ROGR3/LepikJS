const lepik = require("../../index.js")

async function main() {
  console.log(`Starting setWindowPosition at ${Date.now()}`)

  // Method implementation
  let handle = await lepik.getActiveWindow()
  lepik.setWindowPosition(handle, 100, 100)

  lepik.close()
  console.log(`Closing setWindowPosition at ${Date.now()}`)
}

main()