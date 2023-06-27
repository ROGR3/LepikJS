const lepik = require("../../index.js")

async function main() {
  console.log(`Staring mouseDrag at ${Date.now()}`)

  // Method implementation
  console.log("Draggin the mouse from 100;100 to 500;500")
  lepik.mouseDrag(100, 100, 500, 500)

  lepik.close()
  console.log(`Closing mouseDrag at ${Date.now()}`)
}

main()