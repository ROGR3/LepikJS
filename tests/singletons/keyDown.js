const lepik = require("../../index.js")

async function main() {
  console.log(`Starting keyDown at ${Date.now()}`)

  // Method implementation
  console.log("Pressing shift down")
  lepik.keyDown("shift")

  lepik.close()
  console.log(`Closing keyDown at ${Date.now()}`)
}

main()