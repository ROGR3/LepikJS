import { execSync } from "child_process"
import { LepikEvents } from "./LepikEvents"

type MouseButtons = "left" | "right" | "middle"

class UnixLepik extends LepikEvents {
  constructor() {
    super()
  }

  // MOUSE METHODS
  /**
   * Gets the current position of the mouse cursor on the screen.
   * @returns {{ x: number, y: number }} A Promise that resolves with an object containing the X and Y coordinates of the mouse cursor.
   */
  getMousePosition(): { x: number, y: number } {
    const command = "xdotool getmouselocation --shell | awk '{sub(/:/,\"=\"); print}'"

    let positions = this.#executeShellCommand(command).trim().split('\n').filter((s: string) => s.startsWith('X=') || s.startsWith('Y=')).map((s: string) => parseInt(s.split('=')[1]))
    return { x: +positions[0], y: +positions[1] }

  }

  /**
   * Performs a click with the specified mouse button
   * @param {string | number} [key='left'] - The key to use for the click (left, right, or middle mouse button)
   * @param {number} [am=1] - The number of clicks to perform. Default value is 1
   */
  mouseClick(button: MouseButtons = "left", amount: number = 1): void {
    let buttonNumber: number = 1
    switch (button) {
      case "left":
        buttonNumber = 1
        break
      case "middle":
        buttonNumber = 2
        break
      case "right":
        buttonNumber = 3
        break
    }
    const command = `xdotool click --repeat ${amount} ${buttonNumber}`
    this.#executeShellCommand(command)
  }

  /**
  * Performs a double-click with the specified mouse button
  * @param {string | number} [key='left'] The key to use for the click (left, right, or middle mouse button)
  */
  mouseDoubleClick(button: MouseButtons = "left"): void {
    const command = `xdotool click --repeat ${2} ${button}`
    this.#executeShellCommand(command)
  }

  /**
   * Scrolls the mouse wheel up or down by the given amount.
   * @param {number} [amount=1] - The amount to scroll. A positive number scrolls up, a negative number scrolls down.
   */
  mouseScroll(amount: number = 0): void {
    let direction = amount < 0 ? 5 : 4
    const command = `xdotool click --repeat ${Math.abs(amount)} ${direction}`
    this.#executeShellCommand(command)
  }

  /**
    * Drag the mouse from the first coordinates to the second coordinates
    * @param {number} [fromX=0] - The X-coordinate to start dragging from
    * @param {number} [fromY=0] - The Y-coordinate to start dragging from
    * @param {number} [toX=0] - The X-coordinate to drag to
    * @param {number} [toY=0] - The Y-coordinate to drag to
    * @param {boolean} [absolute=false] - Whether or not to use an absolute positioning of the mouse
    */
  mouseDrag(fromX: number, fromY: number, toX: number, toY: number, absolute: boolean = true) {
    const command = absolute ?
      `xdotool mousemove ${fromX} ${fromY} mousedown 1 mousemove ${toX} ${toY} mouseup 1`
      : `xdotool mousedown 1 mousemove_relative ${toX} ${toY} mouseup 1`

    this.#executeShellCommand(command)
  }

  /**
    * Move the mouse to the specified coordinates
    * @param {number} [toX=0] - The X-coordinate to move to
    * @param {number} [toY=0] - The Y-coordinate to move to
    * @param {boolean} [absolute=true] - Whether or not to use an acceleration curve when moving the mouse
    */
  mouseMove(toX: number, toY: number, absolute: boolean = true) {
    let movement = absolute ? "mousemove" : "mousemove_relative"
    const command = `xdotool ${movement} ${toX} ${toY}`
    this.#executeShellCommand(command)
  }



  // KEYBOARD METHODS

  /**
   * Sends a key tap event for the given key.
   * @param {string} key - The key to tap. Must be a single character or a key name from the list returned by the `getSupportedKeys` method.
   * @returns {void}
   */
  keyTap(key: string | number) {
    // Any valid X Keysym string will work. Multiple keys are separated by '+'. Aliases exist for "alt", "ctrl", "shift", "super", and "meta" which all map to Foo_L, such as Alt_L and Control_L, etc.
    const command = `xdotool key ${key.toString()[0]}`
    this.#executeShellCommand(command)
  }

  /**
   * Sends a string of text to the active window by simulating individual key presses for each character.
   * @param {string} - The text to write.
   * @param {number} - The delay between each key press in seconds.
   * @returns {void}
   */
  write(text: string | number, delay: number) {
    // Types as if you had typed it. Supports newlines and tabs (ASCII newline and tab).
    const command = `xdotool type ${text} --delay ${delay}`
    this.#executeShellCommand(command)
  }

  /**
  * Sends a key down event for the given key.
  * @param {string} key - The key to press. Must be a single character or a key name from the list returned by the `getSupportedKeys` method.
  * @returns {void}
  */
  keyDown(key: string) {
    const command = `xdotool keydown ${key}`
    this.#executeShellCommand(command)
  }

  /**
   * Sends a key up event for the given key.
   * @param {string} key - The key to release. Must be a single character or a key name from the list returned by the `getSupportedKeys` method.
   * @returns {void}
   */
  keyUp(key: string) {
    const command = `xdotool keyup ${key}`
    this.#executeShellCommand(command)
  }

  /**
  * Copies the selected text or content.
  * @returns {void}
  */
  copy(): void {
    const command = "xdotool key --clearmodifiers ctrl+c";
    this.#executeShellCommand(command);
  }

  /**
   * Pastes the copied text or content.
   * @returns {void}
   */
  paste(): void {
    const command = "xdotool key --clearmodifiers ctrl+v";
    this.#executeShellCommand(command);
  }

  // SCREEN METHODS
  /**
   * Gets the screen size.
   * @returns {{ width: number, height: number }} An object containing the width and height of the screen.
   */
  getScreenSize(): { width: number, height: number } {
    const command = "xrandr --current | grep ' connected' | awk '{print $4}'";

    const output = this.#executeShellCommand(command).trim();
    const [resolution] = output.split("+")[0].split("x").map(Number);

    return { width: resolution, height: resolution };
  }

  /**
   * Gets the ID of the active window.
   * @returns {number} The ID of the active window.
   */
  getActiveWindow(): number {
    const command = "xdotool getactivewindow";
    const output = this.#executeShellCommand(command).trim();
    return +output;
  }

  setActiveWindow(windowId: string): void {
    const command = `xdotool windowactivate ${windowId}`;
    this.#executeShellCommand(command);
  }

  minimizeWindow(windowId: string): void {
    const command = `xdotool windowminimize ${windowId}`;
    this.#executeShellCommand(command);
  }


  /**
   * Delays the execution for the specified number of milliseconds.
   * @param {number} ms - The number of milliseconds to delay.
   * @returns {Promise<void>} A Promise that resolves after the delay.
   */
  delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }


  close() {
    console.log("You can remove the `lepik.close()` from your code. Lepik.close() has no effect on OS other than windows")
  }


  #executeShellCommand(command: string) {
    return execSync(command).toString();
  }

}

export = UnixLepik
