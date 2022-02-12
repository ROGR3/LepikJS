const fs = require('fs');
try {
  if (process.platform === "win32") {
    fs.rmdir(__dirname + "/../../../lib", { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
      deleteSelf()
    });
  } else {
    fs.rmdir(__dirname + "/../../../build", { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
      deleteSelf()
    });
  }
  function deleteSelf() {
    fs.rmdir(__dirname, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
    });
  }

} catch (er) {
  console.log(er)
}

