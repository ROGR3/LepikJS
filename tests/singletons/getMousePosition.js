const lepik = require("../../index.js")

async function main() {
  console.log(`Staring getMousePosition at ${Date.now()}`)

  // Method implementation
  lepik.getMousePosition().then(e => console.log(`Should print mousePosition: x: ${e.x} y: ${e.y}`))


  lepik.close()
  console.log(`Closing getMousePosition at ${Date.now()}`)
}

main()