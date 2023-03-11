"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
try {
    if (process.platform === "win32") {
        fs_1.rmdirSync(__dirname + "/../../lib", { recursive: true });
        fs_1.rmdirSync(__dirname + "../../platform", { recursive: true });
        fs_1.rmdirSync(__dirname, { recursive: true });
    }
    else {
        fs_1.rmdirSync(__dirname + "/../../build", { recursive: true });
        fs_1.rmdirSync(__dirname + "../../platform", { recursive: true });
        fs_1.rmdirSync(__dirname, { recursive: true });
    }
}
catch (er) {
    console.log(er);
}
