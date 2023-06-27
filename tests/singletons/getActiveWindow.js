const lepik = require("../../index.js")

async function main() {
  console.log(`Staring getActiveWindow at ${Date.now()}`)

  // Method implementation
  lepik.getActiveWindow().then(e => console.log(`Current window id: ${e}`))

  lepik.close()
  console.log(`Closing getActiveWindow at ${Date.now()}`)
}

main()