const { spawn } = require("child_process")

let pyProcess = spawn("python", [`python/main.py`])

// // pyProcess.stdin.write(`doSomething(1,2,3)`)

pyProcess.stdin.write(`exit\n`)

