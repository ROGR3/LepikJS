const lepik = require("../../index.js")

async function main() {
  console.log(`Staring mouseScroll at ${Date.now()}`)

  // Method implementation
  console.log("Scrolling down")
  lepik.mouseScroll(5)
  console.log("Scrolling back up")
  lepik.mouseScroll(-5)

  lepik.close()
  console.log(`Closing mouseScroll at ${Date.now()}`)
}

main()