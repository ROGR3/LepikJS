"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const removeDirectories = (platform) => {
    const directoriesToRemove = [
        `${__dirname}/../../${platform}`,
        __dirname,
    ];
    if (process.platform === 'win32') {
        directoriesToRemove.unshift(`${__dirname}/../../lib`);
    }
    else {
        directoriesToRemove.unshift(`${__dirname}/../../build`);
    }
    for (const dir of directoriesToRemove) {
        try {
            fs_1.rmdirSync(dir, { recursive: true });
        }
        catch (err) {
            console.log(err);
        }
    }
};
removeDirectories('platform');
