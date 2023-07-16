const lepik = require("../../index.js")

async function main() {
  console.log(`Starting getScreenSize at ${Date.now()}`)

  // Method implementation
  lepik.getScreenSize().then(e => console.log(`Should print screenSize: width: ${e.width} height: ${e.height}`))


  lepik.close()
  console.log(`Closing getScreenSize at ${Date.now()}`)
}

main()