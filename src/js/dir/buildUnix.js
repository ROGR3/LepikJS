const fs = require('fs');
try {
  fs.readdirSync(__dirname + "/../../py").forEach(file => {
    if (file.endsWith(".py")) {
      fs.copyFile("src/py/" + file, "lib/" + file, (err) => {
        if (err) throw err;
      });
    }
  })
} catch (er) {
  console.log(er)
}
