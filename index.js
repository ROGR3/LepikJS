const { execSync } = require("child_process")

const UnixLepik = require("./javascript/UnixLepik.js");
const WindowsLepik = require("./javascript/WindowsLepik.js");

let isWin = process.platform === "win32"
let psPath = __dirname + "/powershell/LepikShell.ps1"

if (!isWin) {
  handleUnixPackageManager()
}


function handleUnixPackageManager() {
  if (!isWin) {
    const packageManagers = ['apt-get', 'dnf', 'yum', 'zypper', 'pacman'];

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
}


let lepik = isWin ? new WindowsLepik(psPath) : new UnixLepik();

module.exports = lepik;
