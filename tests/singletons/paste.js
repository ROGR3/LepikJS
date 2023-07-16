const lepik = require("../../index.js")

async function main() {
  console.log(`Starting paste at ${Date.now()}`)

  // Method implementation
  console.log("Pasting the copied text")
  lepik.paste()

  lepik.close()
  console.log(`Closing paste at ${Date.now()}`)
}

main()