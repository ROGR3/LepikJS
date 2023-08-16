import { execSync } from "child_process"
import { LepikEvents } from "./LepikEvents"

type MouseButtons = "left" | "right" | "middle"

/**
 * UnixLepik - A class that provides methods for Unix machines. 
 * Relies on xdotool.
 * @class
 */
class UnixLepik extends LepikEvents {
  constructor() {
    super()
  }

  // MOUSE METHODS
  /**
* Gets the current position of the mouse cursor on the screen.
* @returns {{ x: number, y: number }} An object containing the X and Y coordinates of the mouse cursor.
* @example
* const lepik = require("lepikjs");
* let {x,y} = lepik.getMousePosition()
*/
  getMousePosition(): { x: number, y: number } {
    const command = "xdotool getmouselocation --shell | awk '{sub(/:/,\"=\"); print}'"

    let positions = this.#executeShellCommand(command).trim().split('\n').filter((s: string) => s.startsWith('X=') || s.startsWith('Y=')).map((s: string) => parseInt(s.split('=')[1]))
    return { x: +positions[0], y: +positions[1] }

  }

  /**
 * Performs a click with the specified mouse button.
 * @param {string | number} [button='left'] - The button to use for the click (left, right, or middle mouse button).
 * @param {number} [amount=1] - The number of clicks to perform. Default value is 1.
 * @example
 * const lepik = require("lepikjs");
 * lepik.mouseClick("right", 2);
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
   * Performs a double-click with the specified mouse button.
   * @param {string | number} [button='left'] - The button to use for the click (left, right, or middle mouse button).
   * @example
   * const lepik = require("lepikjs");
   * lepik.mouseDoubleClick("middle");
   */
  mouseDoubleClick(button: MouseButtons = "left"): void {
    const command = `xdotool click --repeat ${2} ${button}`
    this.#executeShellCommand(command)
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
  mouseScroll(amount: number = 0): void {
    let direction = amount < 0 ? 5 : 4
    const command = `xdotool click --repeat ${Math.abs(amount)} ${direction}`
    this.#executeShellCommand(command)
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
  mouseDrag(fromX: number, fromY: number, toX: number, toY: number, absolute: boolean = true) {
    const command = absolute ?
      `xdotool mousemove ${fromX} ${fromY} mousedown 1 mousemove ${toX} ${toY} mouseup 1`
      : `xdotool mousedown 1 mousemove_relative ${toX} ${toY} mouseup 1`

    this.#executeShellCommand(command)
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
     * @example
     * const lepik = require("lepikjs");
     * lepik.keyTap("a");
     */
  keyTap(key: string | number) {
    // Any valid X Keysym string will work. Multiple keys are separated by '+'. Aliases exist for "alt", "ctrl", "shift", "super", and "meta" which all map to Foo_L, such as Alt_L and Control_L, etc.
    const command = `xdotool key ${key.toString()[0]}`
    this.#executeShellCommand(command)
  }




  /**
  * Sends a string of text to the active window by simulating individual key presses for each character.
  * @param {string} text - The text to write.
  * @returns {void}
  * @example
  * const lepik = require("lepikjs");
  * lepik.write("Hello, World!");
  */
  write(text: string | number, delay: number) {
    // Types as if you had typed it. Supports newlines and tabs (ASCII newline and tab).
    const command = `xdotool type ${text} --delay ${delay}`
    this.#executeShellCommand(command)
  }

  /**
  * Sends a key down event for the given key.
  * @param {string} key - The key to press. Must be a single character or combination of keys.
  * @returns {void}
  * @example
  * const lepik = require("lepikjs");
  * lepik.keyDown("Shift");
  */
  keyDown(key: string) {
    const command = `xdotool keydown ${key}`
    this.#executeShellCommand(command)
  }

  /**
  * Sends a key up event for the given key.
  * @param {string} key - The key to press. Must be a single character or combination of keys.
  * @returns {void}
  * @example
  * const lepik = require("lepikjs");
  * lepik.keyUp("Shift");
  */
  keyUp(key: string) {
    const command = `xdotool keyup ${key}`
    this.#executeShellCommand(command)
  }

  /**
  * Copies the selected text or content.
  * @returns {void}
  * @example
  * const lepik = require("lepikjs");
  * lepik.copy();
  */
  copy(): void {
    const command = "xdotool key --clearmodifiers ctrl+c";
    this.#executeShellCommand(command);
  }

  /**
     * Pastes the copied text or content.
     * @returns {void}
     * @example
     * const lepik = require("lepikjs");
     * lepik.paste();
     */
  paste(): void {
    const command = "xdotool key --clearmodifiers ctrl+v";
    this.#executeShellCommand(command);
  }

  // SCREEN METHODS
  /**
   * Gets the screen size.
   * @returns {{ width: number, height: number }} An object containing the width and height of the screen.
   * @example
   * const lepik = require("lepikjs");
   * let {width, height} = lepik.getScreenSize()
   */
  getScreenSize(): { width: number, height: number } {
    const command = "xrandr --current | grep ' connected' | awk '{print $4}'";

    const output = this.#executeShellCommand(command).trim();
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
  getActiveWindow(): number {
    const command = "xdotool getactivewindow";
    const output = this.#executeShellCommand(command).trim();
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
  setActiveWindow(windowId: string): void {
    const command = `xdotool windowactivate ${windowId}`;
    this.#executeShellCommand(command);
  }

  /**
 * Minimizes the specified window.
 * @param {string} windowHandle - The handle of the window to minimize.
 * @returns {void}
 * @example
 * const lepik = require("lepikjs");
 * lepik.minimizeWindow("window123");
 */
  minimizeWindow(windowId: string): void {
    const command = `xdotool windowminimize ${windowId}`;
    this.#executeShellCommand(command);
  }

  /**
* Maximizes the specified window.
* @param {string} windowHandle - The handle of the window to maximize.
* @returns {void}
* @example
* const lepik = require("lepikjs");
* lepik.maximizeWindow("window123");
*/
  maximizeWindow(windowId: string): void {
    const command = `xdotool windowmaximize ${windowId}`;
    this.#executeShellCommand(command);
  }

  /**
   * Closes the specified window.
   * @param {string} windowHandle - The handle of the window to close.
   * @returns {void}
   * @example
   * const lepik = require("lepikjs");
   * lepik.closeWindow("window123");
   */
  closeWindow(windowId: string): void {
    const command = `xdotool windowactivate ${windowId} && xdotool key --clearmodifiers Alt+F4`;
    this.#executeShellCommand(command);
  }

  /**
  * Returns window title of given window.
  * @param {string} windowHandle - The handle of the window to close.
  * @returns {string}
  * @example
  * const lepik = require("lepikjs");
  * let title = lepik.getWindowTitle("window123");
  */
  getWindowTitle(windowId: string): string {
    const command = `xdotool getwindowname ${windowId}`;
    const output = this.#executeShellCommand(command).trim();
    return output;
  }

   /**
   * Retrieves the size of the specified window.
   * @param {string} windowId - The ID of the window.
   * @returns {{ width: number, height: number }} The window size object.
   * @example
   * const lepik = require("lepikjs");
   * const size = lepik.getWindowSize("window123");
   * console.log(size.width, size.height);
   */
  getWindowSize(windowId: string): { width: number, height: number } {
    const command = `xdotool getwindowgeometry --shell ${windowId}`;
    const output = this.#executeShellCommand(command).trim();

    let width = 0;
    let height = 0;
    const lines = output.split("\n");
    for (const line of lines) {
      const [key, value] = line.split("=");
      if (key === "WIDTH") {
        width = parseInt(value);
      } else if (key === "HEIGHT") {
        height = parseInt(value);
      }
    }

    return { width, height };
  }

   /**
   * Sets the size of the specified window.
   * @param {string} windowId - The ID of the window.
   * @param {number} width - The new width of the window.
   * @param {number} height - The new height of the window.
   * @example
   * const lepik = require("lepikjs");
   * lepik.setWindowSize("window123", 800, 600);
   */
  setWindowSize(windowId: string, width: number, height: number): void {
    const command = `xdotool windowsize ${windowId} ${width} ${height}`;
    this.#executeShellCommand(command);
  }

   /**
   * Sets the position of the specified window.
   * @param {string} windowId - The ID of the window.
   * @param {number} x - The new x-coordinate of the window.
   * @param {number} y - The new y-coordinate of the window.
   * @example
   * const lepik = require("lepikjs");
   * lepik.setWindowPosition("window123", 100, 100);
   */
  setWindowPosition(windowId: string, x: number, y: number): void {
    const command = `xdotool windowmove ${windowId} ${x} ${y}`;
    this.#executeShellCommand(command);
  }

   /**
   * Focuses on the next window in the window stack.
   * @example
   * const lepik = require("lepikjs");
   * lepik.focusNextWindow();
   */
  focusNextWindow(): void {
    const command = `xdotool key --clearmodifiers Alt+Tab`;
    this.#executeShellCommand(command);
  }

   /**
   * Opens an application using the specified command.
   * @param {string} command - The command to execute the application.
   * @example
   * const lepik = require("lepikjs");
   * lepik.openApplication("firefox");
   */
  openApplication(command: string): void {
    this.#executeShellCommand(`xdotool exec ${command}`);
  }

  
  /**
   * Closes an application by its class name.
   * @param {string} className - The class name of the application.
   * @example
   * const lepik = require("lepikjs");
   * lepik.closeApplication("Firefox");
   */
  closeApplication(className: string): void {
    this.#executeShellCommand(`xdotool search --class "${className}" windowkill`);
  }

    /**
   * Focuses on a window with the specified title.
   * @param {string} title - The title of the window to focus on.
   * @example
   * const lepik = require("lepikjs");
   * lepik.focusWindowByTitle("My Document");
   */
  focusWindowByTitle(title: string): void {
    const command = `xdotool search --name "${title}" windowactivate`;
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
