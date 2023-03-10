const execSync = require("child_process").execSync

console.time("test")
execSync(`/build/main.exe "mouseClick('left', 10)"`)
console.timeEnd("test")
