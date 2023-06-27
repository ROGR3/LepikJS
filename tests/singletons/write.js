const lepik = require("../../index.js")

async function main() {
  console.log(`Staring write at ${Date.now()}`)

  // Method implementation
  // Method implementation
  console.log("Writing Hello World!")
  lepik.write("Hello World!")

  lepik.close()
  console.log(`Closing write at ${Date.now()}`)
}

main()