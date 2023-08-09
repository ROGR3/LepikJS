const lepik = require("../../index.js")

async function main() {
  console.log(`Starting openApplication at ${Date.now()}`)

  lepik.openApplication("chrome")

  lepik.close()
  console.log(`Closing openApplication at ${Date.now()}`)
}

main()