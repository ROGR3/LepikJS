const lepik = require("../../index.js")

async function main() {
  console.log(`Starting focusNextWindow at ${Date.now()}`)

  // Method implementation
  console.log("Should focus next window")
  lepik.focusNextWindow()

  lepik.close()
  console.log(`Closing focusNextWindow at ${Date.now()}`)
}

main()