const { execSync } = require("child_process");
const Lepik = require("./javascript/Lepik.js");


const isWin = process.platform === "win32"
const localPath = isWin ? __dirname + "/build/main.exe" : __dirname + "/lib/main.py";
const pyVersion = execSync(`python -V`).toString().split(" ")[1].trim().split(".")[0];
const nodeVersion = process.versions.node.trim().split(".")[0];

const NODE_VERSION_MIN = 14;
const PYTHON_VERSION_MIN = 3;


if (pyVersion < PYTHON_VERSION_MIN) {
  console.log(`Python version is too low. Please update your Python to version ${PYTHON_VERSION_MIN}.x or higher.`)
}
if (nodeVersion < NODE_VERSION_MIN) {
  console.log(`NodeJS version is too low. Please update your NodeJS to version ${NODE_VERSION_MIN} or higher.`)
}

let lepik = new Lepik(localPath, isWin, pyVersion >= PYTHON_VERSION_MIN && nodeVersion >= NODE_VERSION_MIN);


module.exports = lepik;
