const lepik = require("../../index.js")

async function main() {
  console.log(`Staring copy at ${Date.now()}`)

  // Method implementation
  console.log("Copying the selected text")
  lepik.copy()

  lepik.close()
  console.log(`Closing copy at ${Date.now()}`)
}

main()