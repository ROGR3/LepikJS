const { spawn } = require('child_process');
const fs = require("fs")

function runTest(filePath) {
  return new Promise((resolve, reject) => {
    const testProcess = spawn('node', [filePath], { stdio: 'pipe' });

    testProcess.stdout.on('data', (data) => {
      process.stdout.write(data); // Stream stdout to parent process
    });

    testProcess.stderr.on('data', (data) => {
      process.stderr.write(data); // Stream stderr to parent process
    });

    testProcess.on('close', (code) => {
      if (code === 0) {
        resolve(); // Test passed
      } else {
        reject(new Error(`Test failed with exit code: ${code}`));
      }
    });

    testProcess.on('error', (err) => {
      reject(err);
    });
  });
}

async function runTests(fileNames) {
  try {
    for (const fileName of fileNames) {
      const filePath = `tests/singletons/${fileName}.js`
      await runTest(filePath);
    }
    console.log('All tests passed!');
  } catch (err) {
    console.error('Test failed:', err);
  }
}

const testFiles = fs.readdirSync("tests/singletons").map(e => e.replace(".js", ""))

runTests(testFiles);
