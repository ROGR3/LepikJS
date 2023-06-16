const lepik = require("../index.js")

async function main() {
  lepik.delay(2000)
}

main()

lepik.on("keyPress", e => {
  console.log(e)
})
lepik.on("mouseClick", e => {
  console.log(e)
})