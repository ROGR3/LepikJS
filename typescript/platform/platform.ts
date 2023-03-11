import { rmdirSync } from 'fs';


try {
  if (process.platform === "win32") {
    rmdirSync(__dirname + "/../../lib", { recursive: true });
    rmdirSync(__dirname + "../../platform", { recursive: true })
    rmdirSync(__dirname, { recursive: true })
  } else {
    rmdirSync(__dirname + "/../../build", { recursive: true });
    rmdirSync(__dirname + "../../platform", { recursive: true })
    rmdirSync(__dirname, { recursive: true })
  }
} catch (er) {
  console.log(er)
}

