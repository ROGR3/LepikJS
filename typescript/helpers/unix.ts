import { readdirSync, copyFile } from 'fs';


try {
  readdirSync(__dirname + "/../../python").forEach((file: string) => {
    console.log("Moving python/" + file + "to lib/" + file)
    if (file.endsWith(".py")) {
      copyFile("python/" + file, "lib/" + file, (err: any) => {
        if (err) throw err;
      });
    }
  })
} catch (er) {
  console.log(er)
}
