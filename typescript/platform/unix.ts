import { readdirSync, copyFile } from 'fs';


try {
  readdirSync(__dirname + "/../../python").forEach((file: string) => {
    if (file.endsWith(".py")) {
      copyFile("src/python/" + file, "platform/" + file, (err: any) => {
        if (err) throw err;
      });
    }
  })
} catch (er) {
  console.log(er)
}
