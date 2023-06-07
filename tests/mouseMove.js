const lepik = require("../index.js")

async function main() {
  lepik.getActiveWindowId().then(console.log)
  lepik.close()
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
main()
