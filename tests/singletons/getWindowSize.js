const lepik = require("../../index.js")

async function main() {
  console.log(`Starting getWindowSize at ${Date.now()}`)

  // Method implementation
  let handle = await lepik.getActiveWindow()
  lepik.getWindowSize(handle).then(e => console.log(`Current window size: ${JSON.stringify(e)}`))

  lepik.close()
  console.log(`Closing getWindowSize at ${Date.now()}`)
}

main()