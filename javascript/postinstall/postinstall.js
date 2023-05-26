"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
if (process.platform === 'win32') {
    removeDir(`${__dirname}/../../python/`);
}
else {
    removeDir(`${__dirname}/../../build/`);
}
function removeDir(dir) {
    try {
        (0, fs_1.rmdirSync)(dir, { recursive: true });
    }
    catch (err) {
        console.log(err);
    }
}
