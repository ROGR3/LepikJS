const Lepik = require("./src/js/Lepik.js").default;
const localPath = __dirname + "/lib/py/main.exe"

let lepik = new Lepik({ _path: localPath });

module.exports = lepik;