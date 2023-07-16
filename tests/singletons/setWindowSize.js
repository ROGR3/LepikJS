const lepik = require("../../index.js")

async function main() {
  console.log(`Starting SetWindowSize at ${Date.now()}`)

  // Method implementation
  let handle = await lepik.getActiveWindow()
  lepik.setWindowSize(handle, 1000, 1000)

  lepik.close()
  console.log(`Closing SetWindowSize at ${Date.now()}`)
}

main()