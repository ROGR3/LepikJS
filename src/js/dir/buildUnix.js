const fs = require('fs');

fs.readdirSync(__dirname + "/../../py").forEach(file => {
  if (file.endsWith(".py")) {
    fs.copyFile("src/py/" + file, "lib/" + file, (err) => {
      if (err) throw err;
    });
  }
})