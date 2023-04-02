import { rmdirSync } from 'fs';

const removeDirectories = (platform: string) => {
  const directoriesToRemove = [
    `${__dirname}/../../${platform}`,
    __dirname,
  ];
  if (process.platform === 'win32') {
    directoriesToRemove.unshift(`${__dirname}/../../lib`);
  } else {
    directoriesToRemove.unshift(`${__dirname}/../../build`);
  }
  for (const dir of directoriesToRemove) {
    try {
      rmdirSync(dir, { recursive: true });
    } catch (err) {
      console.log(err);
    }
  }
};

removeDirectories('platform');
