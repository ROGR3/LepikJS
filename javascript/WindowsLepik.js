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
        process.on('exit', () => {
            this.ps.kill();
        });
    }
    //Mouse methods
    /**
     * Gets the current position of the mouse cursor on the screen.
     * @returns {{ x: number, y: number }} A Promise that resolves with an object containing the X and Y coordinates of the mouse cursor.
     */
    getMousePosition() {
        return new Promise((resolve, reject) => {
            __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, "GetMousePosition");
            this.ps.stdout.once("data", (data) => {
                const dataArr = JSON.parse(data.toString());
                resolve({ x: dataArr[0], y: dataArr[1] });
            });
        });
    }
    /**
    * Performs a click with the specified mouse button
    * @param {string | number} [button='left'] - The button to use for the click (left, right, or middle mouse button)
    * @param {number} [am=1] - The number of clicks to perform. Default value is 1
    */
    mouseClick(button = "left", amount = 1) {
        if (!button) {
            console.log(`Button needs to be type of MouseButtons: left, right, middle`);
            return;
        }
        // button needs to be "left", "right", or "middle"
        for (let i = 0; i < amount; ++i) {
            const command = `MouseClick ${button}`;
            __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, command);
        }
    }
    /**
   * Performs a double-click with the specified mouse button
   * @param {string | number} [button='left'] The button to use for the click (left, right, or middle mouse button)
   */
    mouseDoubleClick(button = "left") {
        this.mouseClick(button, 2);
    }
    /**
     * Scrolls the mouse wheel up or down by the given amount.
     * @param {number} - The amount to scroll. A positive number scrolls up, a negative number scrolls down.
     */
    mouseScroll(amount) {
        let direction = amount > 0 ? "up" : "down";
        const command = `MouseScroll ${direction} ${Math.abs(amount)}`;
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, command);
    }
    /**
     * Drag the mouse from the first coordinates to the second coordinates
     * @param {number} - The X-coordinate to start dragging from
     * @param {number} - The Y-coordinate to start dragging from
     * @param {number} - The X-coordinate to drag to
     * @param {number} - The Y-coordinate to drag to
     * @param {boolean} [absolute=false] - Whether or not to use an absolute positioning of the mouse
     */
    mouseDrag(fromX, fromY, toX, toY, absolute = true) {
        const command = `MouseDrag ${fromX} ${fromY} ${toX} ${toY}`;
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, command);
    }
    /**
        * Move the mouse to the specified coordinates
        * @param {number} - The X-coordinate to move to
        * @param {number} - The Y-coordinate to move to
        * @param {boolean} [absolute=false] - Whether or not to use an absolute positioning of the mouse
        */
    mouseMove(toX, toY, absolute = true) {
        const command = `MouseMove ${toX} ${toY}`;
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, command);
    }
    //Keyboard methods
    /**
     * Sends a key tap event for the given key.
     * @param {string} key - The key to tap. Must be a single character or a key name from the list returned by the `getSupportedKeys` method.
     * @returns {void}
     */
    keyTap(key) {
        const command = `KeyTap ${key}`;
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, command);
    }
    /**
     * Sends a string of text to the active window by simulating individual key presses for each character.
     * @param {string}  - The text to write.
     * @returns {void}
     */
    write(text) {
        const command = `KeyTap ${text}`;
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, command);
    }
    /**
    * Sends a key down event for the given key.
    * @param {string} key - The key to press. Must be a single character or combination of keys.
    * @returns {void}
    */
    keyDown(key) {
        const command = `KeyDown ${key}`;
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, command);
    }
    /**
     * Sends a key up event for the given key.
     * @param {string} key - The key to press. Must be a single character or combination of keys.
     * @returns {void}
     */
    keyUp(key) {
        const command = `KeyUp ${key}`;
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, command);
    }
    copy() {
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, "CopyToClipboard");
    }
    paste() {
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, "PasteFromClipboard");
    }
    getScreenSize() {
        return new Promise((resolve, reject) => {
            __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, "GetScreenSize");
            this.ps.stdout.once("data", (data) => {
                console.log(data.toString());
                const dataArr = JSON.parse(data.toString());
                console.log(dataArr.Width);
                resolve({ width: dataArr.Width, height: dataArr.Height });
            });
        });
    }
    getActiveWindowId() {
        return new Promise((resolve, reject) => {
            __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, "GetActiveWindowId");
            this.ps.stdout.once("data", (data) => {
                resolve(+data.toString().trim());
            });
        });
    }
    delay(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }
    close() {
        this.ps.stdin.write("exit\n");
    }
}
_WindowsLepik_instances = new WeakSet(), _WindowsLepik_executePowerShell = function _WindowsLepik_executePowerShell(command) {
    this.ps.stdin.write(command + "\n");
};
module.exports = WindowsLepik;
