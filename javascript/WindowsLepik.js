"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _WindowsLepik_instances, _WindowsLepik_executePowerShell;
const child_process_1 = require("child_process");
const LepikEvents_1 = require("./LepikEvents");
/**
 * WindowsLepik - A class that provides methods for windows machines.
 * @class
 */
class WindowsLepik extends LepikEvents_1.LepikEvents {
    constructor(psPath) {
        super();
        _WindowsLepik_instances.add(this);
        this.ps = child_process_1.spawn('powershell.exe', ['-ExecutionPolicy', 'Bypass', '-File', psPath], {
            stdio: ['pipe', 'pipe', 'inherit']
        });
        this.ps.stdout.on("data", (e) => {
            console.log(e.toString());
        });
        process.on('exit', () => {
            this.ps.kill();
        });
    }
    //MOUSE METHODS
    /**
    * Gets the current position of the mouse cursor on the screen.
    * @returns {Promise<{ x: number, y: number }>} A Promise that resolves with an object containing the X and Y coordinates of the mouse cursor.
    * @example
    * const lepik = require("lepikjs");
    * lepik.getMousePosition().then(position => {
    *   console.log(`Mouse position: X = ${position.x}, Y = ${position.y}`);
    * });
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
    * Performs a click with the specified mouse button.
    * @param {string | number} [button='left'] - The button to use for the click (left, right, or middle mouse button).
    * @param {number} [amount=1] - The number of clicks to perform. Default value is 1.
    * @example
    * const lepik = require("lepikjs");
    * lepik.mouseClick("right", 2);
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
     * Performs a double-click with the specified mouse button.
     * @param {string | number} [button='left'] - The button to use for the click (left, right, or middle mouse button).
     * @example
     * const lepik = require("lepikjs");
     * lepik.mouseDoubleClick("middle");
     */
    mouseDoubleClick(button = "left") {
        this.mouseClick(button, 2);
    }
    /**
    * Scrolls the mouse wheel up or down by the given amount.
    * @param {number} [amount=0] - The amount to scroll. A positive number scrolls up, a negative number scrolls down.
    * @example
    * const lepik = require("lepikjs");
    * lepik.mouseScroll(3);
    */
    mouseScroll(amount = 0) {
        let direction = amount > 0 ? "up" : "down";
        const command = `MouseScroll ${direction} ${Math.abs(amount)}`;
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, command);
    }
    /**
     * Drag the mouse from the first coordinates to the second coordinates.
     * @param {number} fromX - The X-coordinate to start dragging from.
     * @param {number} fromY - The Y-coordinate to start dragging from.
     * @param {number} toX - The X-coordinate to drag to.
     * @param {number} toY - The Y-coordinate to drag to.
     * @param {boolean} [absolute=false] - Whether or not to use an absolute positioning of the mouse.
     * @example
     * const lepik = require("lepikjs");
     * lepik.mouseDrag(100, 100, 200, 200);
     */
    mouseDrag(fromX, fromY, toX, toY, absolute = true) {
        const command = `MouseDrag ${fromX} ${fromY} ${toX} ${toY}`;
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, command);
    }
    /**
    * Move the mouse to the specified coordinates.
    * @param {number} toX - The X-coordinate to move to.
    * @param {number} toY - The Y-coordinate to move to.
    * @param {boolean} [absolute=false] - Whether or not to use an absolute positioning of the mouse.
    * @example
    * const lepik = require("lepikjs");
    * lepik.mouseMove(500, 500);
    */
    mouseMove(toX, toY, absolute = true) {
        const command = `MouseMove ${toX} ${toY}`;
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, command);
    }
    // KEYBOARD METHODS
    /**
      * Sends a key tap event for the given key.
      * @param {string} key - The key to tap. Must be a single character or a key name from the list returned by the `getSupportedKeys` method.
      * @returns {void}
      * @example
      * const lepik = require("lepikjs");
      * lepik.keyTap("a");
      */
    keyTap(key) {
        const command = `KeyTap ${key}`;
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, command);
    }
    /**
    * Sends a string of text to the active window by simulating individual key presses for each character.
    * @param {string} text - The text to write.
    * @returns {void}
    * @example
    * const lepik = require("lepikjs");
    * lepik.write("Hello, World!");
    */
    write(text) {
        const command = `KeyTap ${text}`;
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, command);
    }
    /**
   * Sends a key down event for the given key.
   * @param {string} key - The key to press. Must be a single character or combination of keys.
   * @returns {void}
   * @example
   * const lepik = require("lepikjs");
   * lepik.keyDown("Shift");
   */
    keyDown(key) {
        const command = `KeyDown ${key}`;
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, command);
    }
    /**
   * Sends a key up event for the given key.
   * @param {string} key - The key to press. Must be a single character or combination of keys.
   * @returns {void}
   * @example
   * const lepik = require("lepikjs");
   * lepik.keyUp("Shift");
   */
    keyUp(key) {
        const command = `KeyUp ${key}`;
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, command);
    }
    /**
    * Copies the selected text or content.
    * @returns {void}
    * @example
    * const lepik = require("lepikjs");
    * lepik.copy();
    */
    copy() {
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, "CopyToClipboard");
    }
    /**
     * Pastes the copied text or content.
     * @returns {void}
     * @example
     * const lepik = require("lepikjs");
     * lepik.paste();
     */
    paste() {
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, "PasteFromClipboard");
    }
    // SCREEN METHODS
    /**
      * Gets the screen size.
      * @returns {Promise<{ width: number, height: number }>} A Promise that resolves with an object containing the width and height of the screen.
      * @example
      * const lepik = require("lepikjs");
      * lepik.getScreenSize().then((size) => {
      *   console.log(`Screen size: Width = ${size.width}, Height = ${size.height}`);
      * });
      */
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
    /**
     * Gets the ID of the active window.
     * @returns {Promise<number>} A Promise that resolves with the ID of the active window.
     * @example
     * const lepik = require("lepikjs");
     * lepik.getActiveWindow().then((windowId) => {
     *   console.log(`Active window ID: ${windowId}`);
     * });
     */
    getActiveWindow() {
        return new Promise((resolve, reject) => {
            __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, "GetActiveWindow");
            this.ps.stdout.once("data", (data) => {
                resolve(+data.toString().trim());
            });
        });
    }
    /**
      * Sets the specified window as the active window.
      * @param {string} windowHandle - The handle of the window to set as active.
      * @returns {void}
      * @example
      * const lepik = require("lepikjs");
      * lepik.setActiveWindow("window123");
      */
    setActiveWindow(windowHandle) {
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, `SetActiveWindow ${windowHandle}`);
    }
    /**
   * Minimizes the specified window.
   * @param {string} windowHandle - The handle of the window to minimize.
   * @returns {void}
   * @example
   * const lepik = require("lepikjs");
   * lepik.minimizeWindow("window123");
   */
    minimizeWindow(windowHandle) {
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, `MinimizeWindow ${windowHandle}`);
    }
    /**
   * Maximizes the specified window.
   * @param {string} windowHandle - The handle of the window to maximize.
   * @returns {void}
   * @example
   * const lepik = require("lepikjs");
   * lepik.maximizeWindow("window123");
   */
    maximizeWindow(windowHandle) {
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, `MaximizeWindow ${windowHandle}`);
    }
    /**
     * Closes the specified window.
     * @param {string} windowHandle - The handle of the window to close.
     * @returns {void}
     * @example
     * const lepik = require("lepikjs");
     * lepik.closeWindow("window123");
     */
    closeWindow(windowHandle) {
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, `CloseWindow ${windowHandle}`);
    }
    /**
      * Returns window title of given window handle.
      * @param {string} windowHandle - The handle of the window to close.
      * @returns {string}
      * @example
      * const lepik = require("lepikjs");
      * let title = await lepik.getWindowTitle("window123");
      */
    getWindowTitle(windowHandle) {
        return new Promise((resolve, reject) => {
            __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, `GetWindowTitle ${windowHandle}`);
            this.ps.stdout.once("data", (data) => {
                resolve(data.toString().trim());
            });
        });
    }
    getWindowSize(windowHandle) {
        return new Promise((resolve, reject) => {
            __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, `GetWindowSize ${windowHandle}`);
            this.ps.stdout.once("data", (data) => {
                const { Width, Height } = JSON.parse(data.toString().trim());
                resolve({ width: Width, height: Height });
            });
        });
    }
    setWindowSize(windowHandle, width, height) {
        __classPrivateFieldGet(this, _WindowsLepik_instances, "m", _WindowsLepik_executePowerShell).call(this, `SetWindowSize ${windowHandle} ${width} ${height}`);
    }
    // CONTROL METHODS
    /**
     * Delays the execution for the specified number of milliseconds.
     * @param {number} ms - The number of milliseconds to delay.
     * @returns {Promise<void>} A Promise that resolves after the delay.
     */
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
