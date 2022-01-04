const Lepik = require("./src/js/Lepik.js").default;
const isWin = process.platform === "win32"
const localPath = isWin ? __dirname + "/build/main.exe" : __dirname + "/lib/main.py";
let lepik = new Lepik({ _path: localPath, isWin });

module.exports = lepik;