const lepik = require("../../index.js")

async function main() {
  console.log(`Staring keyUp at ${Date.now()}`)

  // Method implementation
  console.log("Releasing shift")
  lepik.keyUp("shift")

  lepik.close()
  console.log(`Closing keyUp at ${Date.now()}`)
}

main()