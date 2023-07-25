"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _UnixLepik_instances, _UnixLepik_executeShellCommand;
const child_process_1 = require("child_process");
const LepikEvents_1 = require("./LepikEvents");
/**
 * UnixLepik - A class that provides methods for Unix machines.
 * Relies on xdotool.
 * @class
 */
class UnixLepik extends LepikEvents_1.LepikEvents {
    constructor() {
        super();
        _UnixLepik_instances.add(this);
    }
    // MOUSE METHODS
    /**
  * Gets the current position of the mouse cursor on the screen.
  * @returns {{ x: number, y: number }} An object containing the X and Y coordinates of the mouse cursor.
  * @example
  * const lepik = require("lepikjs");
  * let {x,y} = lepik.getMousePosition()
  */
    getMousePosition() {
        const command = "xdotool getmouselocation --shell | awk '{sub(/:/,\"=\"); print}'";
        let positions = __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command).trim().split('\n').filter((s) => s.startsWith('X=') || s.startsWith('Y=')).map((s) => parseInt(s.split('=')[1]));
        return { x: +positions[0], y: +positions[1] };
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
        let buttonNumber = 1;
        switch (button) {
            case "left":
                buttonNumber = 1;
                break;
            case "middle":
                buttonNumber = 2;
                break;
            case "right":
                buttonNumber = 3;
                break;
        }
        const command = `xdotool click --repeat ${amount} ${buttonNumber}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
    }
    /**
     * Performs a double-click with the specified mouse button.
     * @param {string | number} [button='left'] - The button to use for the click (left, right, or middle mouse button).
     * @example
     * const lepik = require("lepikjs");
     * lepik.mouseDoubleClick("middle");
     */
    mouseDoubleClick(button = "left") {
        const command = `xdotool click --repeat ${2} ${button}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
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
    mouseScroll(amount = 0) {
        let direction = amount < 0 ? 5 : 4;
        const command = `xdotool click --repeat ${Math.abs(amount)} ${direction}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
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
        const command = absolute ?
            `xdotool mousemove ${fromX} ${fromY} mousedown 1 mousemove ${toX} ${toY} mouseup 1`
            : `xdotool mousedown 1 mousemove_relative ${toX} ${toY} mouseup 1`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
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
        let movement = absolute ? "mousemove" : "mousemove_relative";
        const command = `xdotool ${movement} ${toX} ${toY}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
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
        // Any valid X Keysym string will work. Multiple keys are separated by '+'. Aliases exist for "alt", "ctrl", "shift", "super", and "meta" which all map to Foo_L, such as Alt_L and Control_L, etc.
        const command = `xdotool key ${key.toString()[0]}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
    }
    /**
    * Sends a string of text to the active window by simulating individual key presses for each character.
    * @param {string} text - The text to write.
    * @returns {void}
    * @example
    * const lepik = require("lepikjs");
    * lepik.write("Hello, World!");
    */
    write(text, delay) {
        // Types as if you had typed it. Supports newlines and tabs (ASCII newline and tab).
        const command = `xdotool type ${text} --delay ${delay}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
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
        const command = `xdotool keydown ${key}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
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
        const command = `xdotool keyup ${key}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
    }
    /**
    * Copies the selected text or content.
    * @returns {void}
    * @example
    * const lepik = require("lepikjs");
    * lepik.copy();
    */
    copy() {
        const command = "xdotool key --clearmodifiers ctrl+c";
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
    }
    /**
       * Pastes the copied text or content.
       * @returns {void}
       * @example
       * const lepik = require("lepikjs");
       * lepik.paste();
       */
    paste() {
        const command = "xdotool key --clearmodifiers ctrl+v";
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
    }
    // SCREEN METHODS
    /**
     * Gets the screen size.
     * @returns {{ width: number, height: number }} An object containing the width and height of the screen.
     * @example
     * const lepik = require("lepikjs");
     * let {width, height} = lepik.getScreenSize()
     */
    getScreenSize() {
        const command = "xrandr --current | grep ' connected' | awk '{print $4}'";
        const output = __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command).trim();
        const [resolution] = output.split("+")[0].split("x").map(Number);
        return { width: resolution, height: resolution };
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
        const command = "xdotool getactivewindow";
        const output = __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command).trim();
        return +output;
    }
    /**
        * Sets the specified window as the active window.
        * @param {string} windowHandle - The handle of the window to set as active.
        * @returns {void}
        * @example
        * const lepik = require("lepikjs");
        * lepik.setActiveWindow("window123");
        */
    setActiveWindow(windowId) {
        const command = `xdotool windowactivate ${windowId}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
    }
    /**
   * Minimizes the specified window.
   * @param {string} windowHandle - The handle of the window to minimize.
   * @returns {void}
   * @example
   * const lepik = require("lepikjs");
   * lepik.minimizeWindow("window123");
   */
    minimizeWindow(windowId) {
        const command = `xdotool windowminimize ${windowId}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
    }
    /**
  * Maximizes the specified window.
  * @param {string} windowHandle - The handle of the window to maximize.
  * @returns {void}
  * @example
  * const lepik = require("lepikjs");
  * lepik.maximizeWindow("window123");
  */
    maximizeWindow(windowId) {
        const command = `xdotool windowmaximize ${windowId}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
    }
    /**
     * Closes the specified window.
     * @param {string} windowHandle - The handle of the window to close.
     * @returns {void}
     * @example
     * const lepik = require("lepikjs");
     * lepik.closeWindow("window123");
     */
    closeWindow(windowId) {
        const command = `xdotool windowactivate ${windowId} && xdotool key --clearmodifiers Alt+F4`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
    }
    /**
    * Returns window title of given window.
    * @param {string} windowHandle - The handle of the window to close.
    * @returns {string}
    * @example
    * const lepik = require("lepikjs");
    * let title = lepik.getWindowTitle("window123");
    */
    getWindowTitle(windowId) {
        const command = `xdotool getwindowname ${windowId}`;
        const output = __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command).trim();
        return output;
    }
    getWindowSize(windowId) {
        const command = `xdotool getwindowgeometry --shell ${windowId}`;
        const output = __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command).trim();
        let width = 0;
        let height = 0;
        const lines = output.split("\n");
        for (const line of lines) {
            const [key, value] = line.split("=");
            if (key === "WIDTH") {
                width = parseInt(value);
            }
            else if (key === "HEIGHT") {
                height = parseInt(value);
            }
        }
        return { width, height };
    }
    setWindowSize(windowId, width, height) {
        const command = `xdotool windowsize ${windowId} ${width} ${height}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
    }
    setWindowPosition(windowId, x, y) {
        const command = `xdotool windowmove ${windowId} ${x} ${y}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
    }
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
        console.log("You can remove the `lepik.close()` from your code. Lepik.close() has no effect on OS other than windows");
    }
}
_UnixLepik_instances = new WeakSet(), _UnixLepik_executeShellCommand = function _UnixLepik_executeShellCommand(command) {
    return child_process_1.execSync(command).toString();
};
module.exports = UnixLepik;
