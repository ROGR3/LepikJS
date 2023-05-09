import { execSync } from "child_process"

class UnixLepik {
  constructor() {
  }

  //Mouse methods

  /**
   * Gets the current position of the mouse cursor on the screen.
   * @returns {{ x: number, y: number }} A Promise that resolves with an object containing the X and Y coordinates of the mouse cursor.
   */
  getMousePosition(): { x: number, y: number } {
    const command = "xdotool getmouselocation --shell | awk '{sub(/:/,\"=\"); print}'"

    let positions = this.#executeXDoTool(command).trim().split('\n').filter((s: string) => s.startsWith('X=') || s.startsWith('Y=')).map((s: string) => parseInt(s.split('=')[1]))
    return { x: +positions[0], y: +positions[1] }

  }

  /**
   * Performs a click with the specified mouse button
   * @param {string | number} [key='left'] - The key to use for the click (left, right, or middle mouse button)
   * @param {number} [am=1] - The number of clicks to perform. Default value is 1
   */
  mouseClick(button: string, amount: number): void {
    const command = `xdotool click --repeat ${amount} ${button}`
    this.#executeXDoTool(command)
  }

  /**
  * Performs a double-click with the specified mouse button
  * @param {string | number} [key='left'] The key to use for the click (left, right, or middle mouse button)
  */
  mouseDoubleClick(button: string): void {
    const command = `xdotool click --repeat ${2} ${button}`
    this.#executeXDoTool(command)
  }

  /**
   * Scrolls the mouse wheel up or down by the given amount.
   * @param {number} [amount=1] - The amount to scroll. A positive number scrolls up, a negative number scrolls down.
   */
  mouseScroll(amount: number): void {
    let direction = amount < 0 ? 5 : 4
    const command = `xdotool click --repeat ${Math.abs(amount)} ${direction}`
    this.#executeXDoTool(command)
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

    this.#executeXDoTool(command)
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
    this.#executeXDoTool(command)
  }

  //Keyboard methods

  /**
   * Sends a key tap event for the given key.
   * @param {string} key - The key to tap. Must be a single character or a key name from the list returned by the `getSupportedKeys` method.
   * @returns {void}
   */
  keyTap(key: string | number) {
    // Any valid X Keysym string will work. Multiple keys are separated by '+'. Aliases exist for "alt", "ctrl", "shift", "super", and "meta" which all map to Foo_L, such as Alt_L and Control_L, etc.
    const command = `xdotool key ${key.toString()[0]}`
    this.#executeXDoTool(command)
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
    this.#executeXDoTool(command)
  }

  /**
  * Sends a key down event for the given key.
  * @param {string} key - The key to press. Must be a single character or a key name from the list returned by the `getSupportedKeys` method.
  * @returns {void}
  */
  keyDown(key: string) {
    const command = `xdotool keydown ${key}`
    this.#executeXDoTool(command)
  }

  /**
   * Sends a key up event for the given key.
   * @param {string} key - The key to release. Must be a single character or a key name from the list returned by the `getSupportedKeys` method.
   * @returns {void}
   */
  keyUp(key: string) {
    const command = `xdotool keyup ${key}`
    this.#executeXDoTool(command)
  }

  #executeXDoTool(command: string) {
    return execSync(command).toString();
  }
  close() {
    console.log("You can remove the `lepik.close()` from your code. Lepik.close() has no effect on OS other than windows")
  }

}

export = UnixLepik
