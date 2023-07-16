const lepik = require("../../index.js")

async function main() {
  console.log(`Starting keyTap at ${Date.now()}`)

  // Method implementation
  console.log("Pressing B")
  lepik.keyTap("B")

  lepik.close()
  console.log(`Closing keyTap at ${Date.now()}`)
}

main()