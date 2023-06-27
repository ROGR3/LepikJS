const lepik = require("../../index.js")

async function main() {
  console.log(`Staring delay at ${Date.now()}`)

  // Method implementation
  console.log("Pausing for 2 seconds")
  await lepik.delay(2000)

  lepik.close()
  console.log(`Closing delay at ${Date.now()}`)
}

main()