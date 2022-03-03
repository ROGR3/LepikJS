import { rmdir } from 'fs';


try {
  if (process.platform === "win32") {
    rmdir(__dirname + "/../../../lib", { recursive: true }, (err: any) => {
      if (err) {
        throw err;
      }
      deleteSelf()
    });
  } else {
    rmdir(__dirname + "/../../../build", { recursive: true }, (err: any) => {
      if (err) {
        throw err;
      }
      deleteSelf()
    });
  }
  function deleteSelf() {
    rmdir(__dirname, { recursive: true }, (err: any) => {
      if (err) {
        throw err;
      }
    });
  }
} catch (er) {
  console.log(er)
}

