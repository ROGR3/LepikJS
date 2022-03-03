"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
try {
    if (process.platform === "win32") {
        fs_1.rmdir(__dirname + "/../../../lib", { recursive: true }, (err) => {
            if (err) {
                throw err;
            }
            deleteSelf();
        });
    }
    else {
        fs_1.rmdir(__dirname + "/../../../build", { recursive: true }, (err) => {
            if (err) {
                throw err;
            }
            deleteSelf();
        });
    }
    function deleteSelf() {
        fs_1.rmdir(__dirname, { recursive: true }, (err) => {
            if (err) {
                throw err;
            }
        });
    }
}
catch (er) {
    console.log(er);
}
