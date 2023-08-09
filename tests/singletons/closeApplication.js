const lepik = require("../../index.js")

async function main() {
  console.log(`Starting closeApplication at ${Date.now()}`)

  // Method implementation
  lepik.closeApplication("chrome")

  lepik.close()
  console.log(`Closing closeApplication at ${Date.now()}`)
}

main()