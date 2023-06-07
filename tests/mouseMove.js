const lepik = require("../index.js")

async function main() {
  lepik.getScreenSize().then(e => console.log(`Should print screenSize: width:${e.width} height:${e.height}`))
  lepik.close()
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
main()
