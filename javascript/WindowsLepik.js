"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _WindowsLepik_instances, _WindowsLepik_executePowerShell;
const child_process_1 = require("child_process");
class WindowsLepik {
    constructor(psPath) {
        _WindowsLepik_instances.add(this);
        this.ps = child_process_1.spawn('powershell.exe', ['-ExecutionPolicy', 'Bypass', '-File', psPath], {
            stdio: ['pipe', 'pipe', 'inherit']
        });
        this.ps.stdout.on("data", (data) => {
            if (data.toString().trim().length)
                console.log("data: " + data.toString().trim());
        });
        this.ps.on('close', () => {
            console.log(`PowerShell process exited`);
        });
        process.on('exit', () => {
            this.ps.kill();
        });
    }
    //Mouse methods
    getMousePosition() {
        return new Promise((resolve, reject) => {
            __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, "GetMousePosition");
            this.ps.stdout.once("data", (data) => {
                const dataArr = JSON.parse(data.toString());
                resolve({ x: dataArr[0], y: dataArr[1] });
            });
        });
    }
    mouseClick(button, amount) {
        // button needs to be "left", "right", or "middle"
        const command = `MouseClick ${button}`;
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, command);
    }
    mouseScroll(amount) {
        const command = `MouseScroll ${amount}`;
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, command);
    }
    mouseDrag(fromX, fromY, toX, toY, absolute = true) {
        const command = `MouseDrag ${fromX} ${fromY} ${toX} ${toY}`;
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, command);
    }
    mouseMove(toX, toY, absolute = true) {
        const command = `MouseMove ${toX} ${toY}`;
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, command);
    }
    //Keyboard methods
    keyTap(key) {
        const command = `KeyTap ${key}`;
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, command);
    }
    close() {
        this.ps.stdin.write("exit\n");
    }
}
_WindowsLepik_instances = new WeakSet(), _WindowsLepik_executePowerShell = function _WindowsLepik_executePowerShell(command) {
    this.ps.stdin.write(command + "\n");
};
module.exports = WindowsLepik;
