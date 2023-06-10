const lepik = require("../index.js")

async function main() {
  lepik.paste()
  lepik.close()
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
main()
