import { rmdirSync } from 'fs';

if (process.platform === 'win32') {
  removeDir(`${__dirname}/../../lib`);
} else {
  removeDir(`${__dirname}/../../build`);
}

function removeDir(dir: string) {
  try {
    rmdirSync(dir, { recursive: true });
  } catch (err) {
    console.log(err);
  }
}

