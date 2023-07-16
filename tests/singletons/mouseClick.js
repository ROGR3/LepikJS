const lepik = require("../../index.js")

async function main() {
  console.log(`Starting mouseClick at ${Date.now()}`)

  // Method implementation
  console.log("Click the mouse")
  lepik.mouseClick()

  lepik.close()
  console.log(`Closing mouseClick at ${Date.now()}`)
}

main()