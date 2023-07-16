const lepik = require("../../index.js")

async function main() {
  console.log(`Starting mouseDoubleClick at ${Date.now()}`)


  // Method implementation
  lepik.mouseDoubleClick()

  lepik.close()
  console.log(`Closing mouseDoubleClick at ${Date.now()}`)
}

main()