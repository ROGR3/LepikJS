import { readdirSync, copyFile } from 'fs';


try {
  readdirSync(__dirname + "/../../py").forEach((file: string) => {
    if (file.endsWith(".py")) {
      copyFile("src/py/" + file, "lib/" + file, (err: any) => {
        if (err) throw err;
      });
    }
  })
} catch (er) {
  console.log(er)
}
