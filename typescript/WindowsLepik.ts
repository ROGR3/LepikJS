import { spawn } from "child_process"

type MouseButtons = "left" | "right" | "middle"
class WindowsLepik {
  ps;
  constructor(psPath: string) {
    this.ps = spawn('powershell.exe', ['-ExecutionPolicy', 'Bypass', '-File', psPath], {
      stdio: ['pipe', 'pipe', 'inherit']
    });

    this.ps.stdout.on("data", (data: string) => {
      console.log("Data:" + data.toString())
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
  getMousePosition(): Promise<{ x: number, y: number }> {
    return new Promise((resolve, reject) => {
      this.#executePowerShell("GetMousePosition");

      this.ps.stdout.once("data", (data: string) => {
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
  mouseClick(button: MouseButtons = "left", amount: number = 1): void {
    if (!(button as MouseButtons)) {
      console.log(`Button needs to be type of MouseButtons: left, right, middle`)
      return
    }
    // button needs to be "left", "right", or "middle"
    for (let i = 0; i < amount; ++i) {
      const command = `MouseClick ${button}`
      this.#executePowerShell(command)
    }
  }

  /**
 * Performs a double-click with the specified mouse button
 * @param {string | number} [button='left'] The button to use for the click (left, right, or middle mouse button)
 */
  mouseDoubleClick(button: MouseButtons = "left"): void {
    this.mouseClick(button, 2)
  }

  /**
   * Scrolls the mouse wheel up or down by the given amount.
   * @param {number} - The amount to scroll. A positive number scrolls up, a negative number scrolls down.
   */
  mouseScroll(amount: number): void {
    let direction = amount > 0 ? "up" : "down"
    const command = `MouseScroll ${direction} ${Math.abs(amount)}`
    this.#executePowerShell(command)
  }

  /**
   * Drag the mouse from the first coordinates to the second coordinates
   * @param {number} - The X-coordinate to start dragging from
   * @param {number} - The Y-coordinate to start dragging from
   * @param {number} - The X-coordinate to drag to
   * @param {number} - The Y-coordinate to drag to
   * @param {boolean} [absolute=false] - Whether or not to use an absolute positioning of the mouse
   */
  mouseDrag(fromX: number, fromY: number, toX: number, toY: number, absolute: boolean = true) {
    const command = `MouseDrag ${fromX} ${fromY} ${toX} ${toY}`
    this.#executePowerShell(command)
  }
  /**
      * Move the mouse to the specified coordinates
      * @param {number} - The X-coordinate to move to
      * @param {number} - The Y-coordinate to move to
      * @param {boolean} [absolute=false] - Whether or not to use an absolute positioning of the mouse
      */
  mouseMove(toX: number, toY: number, absolute: boolean = true) {
    const command = `MouseMove ${toX} ${toY}`
    this.#executePowerShell(command)
  }

  on(ev: string, cb: Function) {
    // @ts-ignore 
    const lepikEvents = require("lepikevents");
    switch (ev) {
      case "keyPress":
        lepikEvents.events.on("keyPress", (data: string) => {
          cb(data);
        });
        break;
      case "keyUp":
        lepikEvents.events.on("keyUp", (data: string) => {
          cb(data);
        });
        break;
      case "keyDown":
        lepikEvents.events.on("keyDown", (data: string) => {
          cb(data);
        });
        break;
      case "mouseClick":
        lepikEvents.events.on("mouseClick", (data: number[]) => {
          cb({ x: data[0], y: data[1], button: data[2] });
        });
        break;
      case "mouseDoubleClick":
        lepikEvents.events.on("mouseDoubleClick", (data: number[]) => {
          cb({ x: data[0], y: data[1], button: data[2] });
        });
        break;
      case "mouseMove":
        lepikEvents.events.on("mouseMove", (data: number[]) => {
          cb({ x: data[0], y: data[1], time: data[2] });
        });
        break;
      case "mouseDown":
        lepikEvents.events.on("mouseDown", (data: number[]) => {
          cb({ x: data[0], y: data[1] });
        });
        break;
      case "mouseUp":
        lepikEvents.events.on("mouseUp", (data: number[]) => {
          cb({ x: data[0], y: data[1] });
        });
        break;
      default:
        console.error("Unknown event: " + ev);
        break;
    }
  }
  //Keyboard methods

  /**
   * Sends a key tap event for the given key.
   * @param {string} key - The key to tap. Must be a single character or a key name from the list returned by the `getSupportedKeys` method.
   * @returns {void}
   */
  keyTap(key: string) {
    const command = `KeyTap ${key}`
    this.#executePowerShell(command)
  }

  /**
   * Sends a string of text to the active window by simulating individual key presses for each character.
   * @param {string}  - The text to write.
   * @returns {void}
   */
  write(text: string) {
    const command = `KeyTap ${text}`
    this.#executePowerShell(command)
  }

  /**
  * Sends a key down event for the given key.
  * @param {string} key - The key to press. Must be a single character or combination of keys.
  * @returns {void}
  */
  keyDown(key: string) {
    const command = `KeyDown ${key}`
    this.#executePowerShell(command)
  }

  /**
   * Sends a key up event for the given key.
   * @param {string} key - The key to press. Must be a single character or combination of keys.
   * @returns {void}
   */
  keyUp(key: string) {
    const command = `KeyUp ${key}`
    this.#executePowerShell(command)
  }

  /**
  * Copies the selected text or content.
  * @returns {void}
  */
  copy(): void {
    this.#executePowerShell("CopyToClipboard");
  }

  /**
 * Pastes the copied text or content.
 * @returns {void}
 */
  paste(): void {
    this.#executePowerShell("PasteFromClipboard");
  }


  /**
   * Gets the screen size.
   * @returns {{ width: number, height: number }} An object containing the width and height of the screen.
   */
  getScreenSize(): Promise<{ width: number, height: number }> {
    return new Promise((resolve, reject) => {
      this.#executePowerShell("GetScreenSize");

      this.ps.stdout.once("data", (data: string) => {
        console.log(data.toString())
        const dataArr = JSON.parse(data.toString());
        console.log(dataArr.Width)
        resolve({ width: dataArr.Width, height: dataArr.Height });
      });
    });
  }

  /**
  * Gets the ID of the active window.
  * @returns {number} The ID of the active window.
  */
  getActiveWindow(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.#executePowerShell("GetActiveWindow");

      this.ps.stdout.once("data", (data: string) => {
        resolve(+data.toString().trim());
      });
    });
  }

  setActiveWindow(windowId: string): void {
    this.#executePowerShell(`SetActiveWindow ${windowId}`);
  }

  minimizeWindow(windowId: string): void {
    this.#executePowerShell(`MinimizeWindow ${windowId}`);
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

  #executePowerShell(command: string) {
    this.ps.stdin.write(command + "\n");
  }

  close() {
    this.ps.stdin.write("exit\n");
  }
}


export = WindowsLepik 