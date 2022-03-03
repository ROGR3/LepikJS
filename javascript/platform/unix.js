"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
try {
    fs_1.readdirSync(__dirname + "/../../py").forEach((file) => {
        if (file.endsWith(".py")) {
            fs_1.copyFile("src/py/" + file, "lib/" + file, (err) => {
                if (err)
                    throw err;
            });
        }
    });
}
catch (er) {
    console.log(er);
}
