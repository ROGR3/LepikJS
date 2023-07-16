const lepik = require("../../index.js")

async function main() {
  console.log(`Starting mouseMove at ${Date.now()}`)

  // Method implementation
  console.log("Moving the mouse to 500;500")
  lepik.mouseDrag(500, 500)

  lepik.close()
  console.log(`Closing mouseMove at ${Date.now()}`)
}

main()