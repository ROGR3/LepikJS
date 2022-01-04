const Lepik = require("./src/js/Lepik.js").default;
const localPath = __dirname + "/build/main.exe"
const isWin = process.platform === "win32"
let lepik = new Lepik({ _path: localPath, isWin });

module.exports = lepik;