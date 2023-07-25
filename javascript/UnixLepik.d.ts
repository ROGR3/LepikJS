import { LepikEvents } from "./LepikEvents";
declare type MouseButtons = "left" | "right" | "middle";
/**
 * UnixLepik - A class that provides methods for Unix machines.
 * Relies on xdotool.
 * @class
 */
declare class UnixLepik extends LepikEvents {
    #private;
    constructor();
    /**
  * Gets the current position of the mouse cursor on the screen.
  * @returns {{ x: number, y: number }} An object containing the X and Y coordinates of the mouse cursor.
  * @example
  * const lepik = require("lepikjs");
  * let {x,y} = lepik.getMousePosition()
  */
    getMousePosition(): {
        x: number;
        y: number;
    };
    /**
   * Performs a click with the specified mouse button.
   * @param {string | number} [button='left'] - The button to use for the click (left, right, or middle mouse button).
   * @param {number} [amount=1] - The number of clicks to perform. Default value is 1.
   * @example
   * const lepik = require("lepikjs");
   * lepik.mouseClick("right", 2);
   */
    mouseClick(button?: MouseButtons, amount?: number): void;
    /**
     * Performs a double-click with the specified mouse button.
     * @param {string | number} [button='left'] - The button to use for the click (left, right, or middle mouse button).
     * @example
     * const lepik = require("lepikjs");
     * lepik.mouseDoubleClick("middle");
     */
    mouseDoubleClick(button?: MouseButtons): void;
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
    mouseScroll(amount?: number): void;
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
    mouseDrag(fromX: number, fromY: number, toX: number, toY: number, absolute?: boolean): void;
    /**
    * Move the mouse to the specified coordinates.
    * @param {number} toX - The X-coordinate to move to.
    * @param {number} toY - The Y-coordinate to move to.
    * @param {boolean} [absolute=false] - Whether or not to use an absolute positioning of the mouse.
    * @example
    * const lepik = require("lepikjs");
    * lepik.mouseMove(500, 500);
    */
    mouseMove(toX: number, toY: number, absolute?: boolean): void;
    /**
       * Sends a key tap event for the given key.
       * @param {string} key - The key to tap. Must be a single character or a key name from the list returned by the `getSupportedKeys` method.
       * @returns {void}
       * @example
       * const lepik = require("lepikjs");
       * lepik.keyTap("a");
       */
    keyTap(key: string | number): void;
    /**
    * Sends a string of text to the active window by simulating individual key presses for each character.
    * @param {string} text - The text to write.
    * @returns {void}
    * @example
    * const lepik = require("lepikjs");
    * lepik.write("Hello, World!");
    */
    write(text: string | number, delay: number): void;
    /**
    * Sends a key down event for the given key.
    * @param {string} key - The key to press. Must be a single character or combination of keys.
    * @returns {void}
    * @example
    * const lepik = require("lepikjs");
    * lepik.keyDown("Shift");
    */
    keyDown(key: string): void;
    /**
    * Sends a key up event for the given key.
    * @param {string} key - The key to press. Must be a single character or combination of keys.
    * @returns {void}
    * @example
    * const lepik = require("lepikjs");
    * lepik.keyUp("Shift");
    */
    keyUp(key: string): void;
    /**
    * Copies the selected text or content.
    * @returns {void}
    * @example
    * const lepik = require("lepikjs");
    * lepik.copy();
    */
    copy(): void;
    /**
       * Pastes the copied text or content.
       * @returns {void}
       * @example
       * const lepik = require("lepikjs");
       * lepik.paste();
       */
    paste(): void;
    /**
     * Gets the screen size.
     * @returns {{ width: number, height: number }} An object containing the width and height of the screen.
     * @example
     * const lepik = require("lepikjs");
     * let {width, height} = lepik.getScreenSize()
     */
    getScreenSize(): {
        width: number;
        height: number;
    };
    /**
     * Gets the ID of the active window.
     * @returns {Promise<number>} A Promise that resolves with the ID of the active window.
     * @example
     * const lepik = require("lepikjs");
     * lepik.getActiveWindow().then((windowId) => {
     *   console.log(`Active window ID: ${windowId}`);
     * });
     */
    getActiveWindow(): number;
    /**
        * Sets the specified window as the active window.
        * @param {string} windowHandle - The handle of the window to set as active.
        * @returns {void}
        * @example
        * const lepik = require("lepikjs");
        * lepik.setActiveWindow("window123");
        */
    setActiveWindow(windowId: string): void;
    /**
   * Minimizes the specified window.
   * @param {string} windowHandle - The handle of the window to minimize.
   * @returns {void}
   * @example
   * const lepik = require("lepikjs");
   * lepik.minimizeWindow("window123");
   */
    minimizeWindow(windowId: string): void;
    /**
  * Maximizes the specified window.
  * @param {string} windowHandle - The handle of the window to maximize.
  * @returns {void}
  * @example
  * const lepik = require("lepikjs");
  * lepik.maximizeWindow("window123");
  */
    maximizeWindow(windowId: string): void;
    /**
     * Closes the specified window.
     * @param {string} windowHandle - The handle of the window to close.
     * @returns {void}
     * @example
     * const lepik = require("lepikjs");
     * lepik.closeWindow("window123");
     */
    closeWindow(windowId: string): void;
    /**
    * Returns window title of given window.
    * @param {string} windowHandle - The handle of the window to close.
    * @returns {string}
    * @example
    * const lepik = require("lepikjs");
    * let title = lepik.getWindowTitle("window123");
    */
    getWindowTitle(windowId: string): string;
    getWindowSize(windowId: string): {
        width: number;
        height: number;
    };
    setWindowSize(windowId: string, width: number, height: number): void;
    setWindowPosition(windowId: string, x: number, y: number): void;
    /**
     * Delays the execution for the specified number of milliseconds.
     * @param {number} ms - The number of milliseconds to delay.
     * @returns {Promise<void>} A Promise that resolves after the delay.
     */
    delay(ms: number): Promise<void>;
    close(): void;
}
export = UnixLepik;
