"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _UnixLepik_instances, _UnixLepik_executeShellCommand;
const child_process_1 = require("child_process");
class UnixLepik {
    constructor() {
        _UnixLepik_instances.add(this);
    }
    //Mouse methods
    /**
     * Gets the current position of the mouse cursor on the screen.
     * @returns {{ x: number, y: number }} A Promise that resolves with an object containing the X and Y coordinates of the mouse cursor.
     */
    getMousePosition() {
        const command = "xdotool getmouselocation --shell | awk '{sub(/:/,\"=\"); print}'";
        let positions = __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command).trim().split('\n').filter((s) => s.startsWith('X=') || s.startsWith('Y=')).map((s) => parseInt(s.split('=')[1]));
        return { x: +positions[0], y: +positions[1] };
    }
    /**
     * Performs a click with the specified mouse button
     * @param {string | number} [key='left'] - The key to use for the click (left, right, or middle mouse button)
     * @param {number} [am=1] - The number of clicks to perform. Default value is 1
     */
    mouseClick(button, amount) {
        const command = `xdotool click --repeat ${amount} ${button}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
    }
    /**
    * Performs a double-click with the specified mouse button
    * @param {string | number} [key='left'] The key to use for the click (left, right, or middle mouse button)
    */
    mouseDoubleClick(button) {
        const command = `xdotool click --repeat ${2} ${button}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
    }
    /**
     * Scrolls the mouse wheel up or down by the given amount.
     * @param {number} [amount=1] - The amount to scroll. A positive number scrolls up, a negative number scrolls down.
     */
    mouseScroll(amount) {
        let direction = amount < 0 ? 5 : 4;
        const command = `xdotool click --repeat ${Math.abs(amount)} ${direction}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
    }
    /**
      * Drag the mouse from the first coordinates to the second coordinates
      * @param {number} [fromX=0] - The X-coordinate to start dragging from
      * @param {number} [fromY=0] - The Y-coordinate to start dragging from
      * @param {number} [toX=0] - The X-coordinate to drag to
      * @param {number} [toY=0] - The Y-coordinate to drag to
      * @param {boolean} [absolute=false] - Whether or not to use an absolute positioning of the mouse
      */
    mouseDrag(fromX, fromY, toX, toY, absolute = true) {
        const command = absolute ?
            `xdotool mousemove ${fromX} ${fromY} mousedown 1 mousemove ${toX} ${toY} mouseup 1`
            : `xdotool mousedown 1 mousemove_relative ${toX} ${toY} mouseup 1`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
    }
    /**
      * Move the mouse to the specified coordinates
      * @param {number} [toX=0] - The X-coordinate to move to
      * @param {number} [toY=0] - The Y-coordinate to move to
      * @param {boolean} [absolute=true] - Whether or not to use an acceleration curve when moving the mouse
      */
    mouseMove(toX, toY, absolute = true) {
        let movement = absolute ? "mousemove" : "mousemove_relative";
        const command = `xdotool ${movement} ${toX} ${toY}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
    }
    //Keyboard methods
    /**
     * Sends a key tap event for the given key.
     * @param {string} key - The key to tap. Must be a single character or a key name from the list returned by the `getSupportedKeys` method.
     * @returns {void}
     */
    keyTap(key) {
        // Any valid X Keysym string will work. Multiple keys are separated by '+'. Aliases exist for "alt", "ctrl", "shift", "super", and "meta" which all map to Foo_L, such as Alt_L and Control_L, etc.
        const command = `xdotool key ${key.toString()[0]}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
    }
    /**
     * Sends a string of text to the active window by simulating individual key presses for each character.
     * @param {string} - The text to write.
     * @param {number} - The delay between each key press in seconds.
     * @returns {void}
     */
    write(text, delay) {
        // Types as if you had typed it. Supports newlines and tabs (ASCII newline and tab).
        const command = `xdotool type ${text} --delay ${delay}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
    }
    /**
    * Sends a key down event for the given key.
    * @param {string} key - The key to press. Must be a single character or a key name from the list returned by the `getSupportedKeys` method.
    * @returns {void}
    */
    keyDown(key) {
        const command = `xdotool keydown ${key}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
    }
    /**
     * Sends a key up event for the given key.
     * @param {string} key - The key to release. Must be a single character or a key name from the list returned by the `getSupportedKeys` method.
     * @returns {void}
     */
    keyUp(key) {
        const command = `xdotool keyup ${key}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
    }
    /**
    * Copies the selected text or content.
    * @returns {void}
    */
    copy() {
        const command = "xdotool key --clearmodifiers ctrl+c";
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
    }
    /**
     * Pastes the copied text or content.
     * @returns {void}
     */
    paste() {
        const command = "xdotool key --clearmodifiers ctrl+v";
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command);
    }
    /**
     * Gets the screen size.
     * @returns {{ width: number, height: number }} An object containing the width and height of the screen.
     */
    getScreenSize() {
        const command = "xrandr --current | grep ' connected' | awk '{print $4}'";
        const output = __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command).trim();
        const [resolution] = output.split("+")[0].split("x").map(Number);
        return { width: resolution, height: resolution };
    }
    /**
     * Gets the ID of the active window.
     * @returns {number} The ID of the active window.
     */
    getActiveWindowId() {
        const command = "xdotool getactivewindow";
        const output = __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeShellCommand).call(this, command).trim();
        return +output;
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
