const lepik = require("../index.js")

async function main() {
  lepik.delay(2000)
  lepik.setActiveWindow(2426196)
  lepik.close()
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
main()
