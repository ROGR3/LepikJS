const { execSync } = require("child_process");
const Lepik = require("./javascript/Lepik.js");

const isWin = process.platform === "win32"
const localPath = isWin ? __dirname + "/build/main.exe" : __dirname + "/python/unix/main.py";
const pyVersion = execSync(`python -V`).toString().split(" ")[1].trim().split(".")[0];
const nodeVersion = process.versions.node.trim().split(".")[0];

const NODE_VERSION_MIN = 14;
const PYTHON_VERSION_MIN = 3;

if (!isWin) {
  const packageManagers = ['apt-get', 'dnf', 'yum', 'zypper', 'pacman'];

  // Check if xdotool is installed
  let foundPM = false;
  try {
    execSync('which xdotool');
  } catch (err) {
    // If xdotool is not installed, install it using the appropriate package manager
    for (const pm of packageManagers) {
      try {
        execSync(`${pm} -v > /dev/null 2>&1`);
        foundPM = true;
        switch (pm) {
          case 'apt-get':
            execSync('sudo apt-get update');
            execSync('sudo apt-get install xdotool');
            break;
          case 'dnf':
            execSync('sudo dnf install xdotool');
            break;
          case 'yum':
            execSync('sudo yum install xdotool');
            break;
          case 'zypper':
            execSync('sudo zypper install xdotool');
            break;
          case 'pacman':
            execSync('sudo pacman -S xdotool');
            break;
          default:
            console.log('Error: Could not determine package manager to install xdotool');
            process.exit(1);
        }
        break;
      } catch (err) {
        // Continue to the next package manager
      }
    }
    if (!foundPM) {
      console.log('Error: Could not determine package manager to install xdotool');
      console.log('Try to install xdotool manually and rerun the package');
      process.exit(1);
    }
  }
}

if (pyVersion < PYTHON_VERSION_MIN) {
  console.log(`Python version is too low. Please update your Python to version ${PYTHON_VERSION_MIN}.x or higher.`)
}
if (nodeVersion < NODE_VERSION_MIN) {
  console.log(`NodeJS version is too low. Please update your NodeJS to version ${NODE_VERSION_MIN} or higher.`)
}

let lepik = new Lepik(localPath, isWin, pyVersion >= PYTHON_VERSION_MIN && nodeVersion >= NODE_VERSION_MIN);

module.exports = lepik;
