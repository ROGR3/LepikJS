declare class Lepik {
    #private;
    /**
     * @private
     * - pyProcess -> reference to the python script process
     * @readonly
     *  - pyPath -> path to the python script that interacts with the OS
     *  - hasGoodVersion -> flag to determine if the python script version is compatible with this library
     *  - supportedChars -> supported characters that can be used with key presses
     */
    private pyProcess;
    private readonly pyPath;
    private readonly hasGoodVersion;
    private readonly supportedChars;
    constructor(path: string, isWin: boolean, hasGoodVersion: boolean);
    /**
    * Move the mouse to the specified coordinates
    * @param {number} [x=0] - The X-coordinate to move to
    * @param {number} [y=0] - The Y-coordinate to move to
    * @param {boolean} [a=false] - Whether or not to use an acceleration curve when moving the mouse
    * @param {number} [d=0.2] - The duration of the move in seconds
    */
    mouseMove(x?: number, y?: number, a?: boolean, d?: number): void;
    /**
     * Performs a double-click with the specified mouse button
     * @param {string | number} [key='left'] The key to use for the click (left, right, or middle mouse button)
     */
    mouseDoubleClick(key: string | number): void;
    /**
     * Performs a click with the specified mouse button
     * @param {string | number} [key='left'] - The key to use for the click (left, right, or middle mouse button)
     * @param {number} [am=1] - The number of clicks to perform. Default value is 1
     */
    mouseClick(key?: string | number, am?: number): void;
    /**
      * Drag the mouse from the first coordinates to the second coordinates
      * @param {number} [fx=0] - The X-coordinate to start dragging from
      * @param {number} [fy=0] - The Y-coordinate to start dragging from
      * @param {number} [tx=0] - The X-coordinate to drag to
      * @param {number} [ty=0] - The Y-coordinate to drag to
      * @param {boolean} [a=false] - Whether or not to use an acceleration curve when dragging the mouse
      * @param {number} [d=0.2] - The duration of the drag in seconds
      */
    mouseDrag(fx?: number, fy?: number, tx?: number, ty?: number, a?: boolean, d?: number): void;
    /**
     * Scrolls the mouse wheel up or down by the given amount.
     * @param {number} [amount=1] - The amount to scroll. A positive number scrolls up, a negative number scrolls down.
     */
    mouseScroll(am?: number): void;
    /**
     * Gets the current position of the mouse cursor on the screen.
     * @returns {Promise<{ x: number, y: number }>} A Promise that resolves with an object containing the X and Y coordinates of the mouse cursor.
     * @throws {Error} If there is an error reading the mouse position from the Python subprocess.
     */
    getMousePosition(): Promise<{
        x: number;
        y: number;
    }>;
    /**
     * Returns an array of all the keys that can be pressed with the `keyTap`, `keyDown`, and `keyUp` methods.
     * @returns {string[]} - An array of strings representing the supported keys.
     */
    getSupportedKeys(): string[];
    /**
     * Sends a key tap event for the given key.
     * @param {string} key - The key to tap. Must be a single character or a key name from the list returned by the `getSupportedKeys` method.
     * @returns {void}
     */
    keyTap(key: string): void;
    /**
     * Sends a key up event for the given key.
     * @param {string} key - The key to release. Must be a single character or a key name from the list returned by the `getSupportedKeys` method.
     * @returns {void}
     */
    keyUp(key: string): void;
    /**
     * Sends a key down event for the given key.
     * @param {string} key - The key to press. Must be a single character or a key name from the list returned by the `getSupportedKeys` method.
     * @returns {void}
     */
    keyDown(key: string): void;
    /**
     * Sends a string of text to the active window by simulating individual key presses for each character.
     * @param {string} [text="Hello From LepikJS"] - The text to write.
     * @param {number} [delay=0.1] - The delay between each key press in seconds.
     * @returns {void}
     */
    write(msg?: string, d?: number): void;
    /**
     * Copies the currently selected text to the clipboard.
     * @returns {void}
     */
    copy(): void;
    /**
     * Pastes the text currently in the clipboard.
     * @returns {void}
     */
    paste(): void;
    /**
     * Registers a callback function for the given event.
     *
     * @param {string} ev - The name of the event to listen for. Supported events are "keyPress", "keyRelease", "mouseClick", "mouseDoubleClick", "mouseMove", "mouseDown", and "mouseUp".
     * @param {Function} cb - The callback function to be called when the event is triggered.
     */
    on(ev: string, cb: Function): void;
    /**
     * Closes the Python process.
     * If the process is not closed, the code wont exit.
     */
    close(): void;
}
export = Lepik;
