import { spawn } from "child_process";

class Lepik {
  /**
   * @private
   * - pyProcess -> reference to the python script process
   * @readonly
   *  - pyPath -> path to the python script that interacts with the OS
   *  - hasGoodVersion -> flag to determine if the python script version is compatible with this library
   *  - supportedChars -> supported characters that can be used with key presses
   */
  private pyProcess;
  private readonly pyPath: string;
  private readonly hasGoodVersion: boolean;
  private readonly supportedChars: string[] = ['backspace', 'tab', 'clear', 'enter', 'shift', 'ctrl', 'alt', 'pause', 'caps-lock', 'esc', 'spacebar', 'page-up', 'page-down', 'end', 'home', 'left', 'up', 'right', 'down', 'select', 'print-screen', 'insert', 'delete', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'left-windows', 'right-windows', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12', 'f13', 'f14', 'f15', 'f16', 'f17', 'f18', 'f19', 'f20', 'f21', 'f22', 'f23', 'f24', 'num-lock', 'scroll-lock', 'left-shift', 'right-shift', 'left-ctrl', 'right-ctrl', 'left-menu', 'right-menu', 'volume-mute', 'volume-down', 'volume-up', 'next-track', 'previous-track', 'stop-media', ',', '.', 'play', 'zoom', 'clear'];


  constructor(path: string, isWin: boolean, hasGoodVersion: boolean) {
    this.pyPath = path;
    this.hasGoodVersion = hasGoodVersion;

    // spawn a new process for the python script
    if (isWin) {
      // if on windows, just spawn the python executable
      this.pyProcess = spawn(`${this.pyPath}`);
    } else {
      // if on linux or mac, use sudo to execute the python script
      this.pyProcess = spawn("sudo", ["python", `${this.pyPath}`]);
    }

    // cleanup the python process on exit
    process.on('exit', () => {
      this.pyProcess.kill();
    });
  }

  /**
  * Move the mouse to the specified coordinates
  * @param {number} [x=0] - The X-coordinate to move to
  * @param {number} [y=0] - The Y-coordinate to move to
  * @param {boolean} [a=false] - Whether or not to use an acceleration curve when moving the mouse
  * @param {number} [d=0.2] - The duration of the move in seconds
  */
  mouseMove(x: number = 0, y: number = 0, a: boolean = false, d: number = 0.2): void {
    this.#executePyCommand(`mouseMove(${x},${y},${a === true ? "True" : "False"},${d})`)
  }

  /**
   * Performs a double-click with the specified mouse button
   * @param {string | number} [key='left'] The key to use for the click (left, right, or middle mouse button)
   */
  mouseDoubleClick(key: string | number): void {
    this.mouseClick(key, 2)
  }

  /**
   * Performs a click with the specified mouse button
   * @param {string | number} [key='left'] - The key to use for the click (left, right, or middle mouse button)
   * @param {number} [am=1] - The number of clicks to perform. Default value is 1
   */
  mouseClick(key: string | number = "left", am: number = 1): void {
    if (typeof key === "number") {
      if (key == 0) key = "left";
      if (key == 1) key = "right";
      if (key == 2) key = "middle";
      else {
        console.log("Wrong key in mouseClick. Used " + key + ". Expected 0 or 1 or 2.")
        return
      }
    }
    key = key.toString().toLowerCase();
    this.#executePyCommand(`mouseClick('${key}',${Math.abs(am)})`);
    return
  }

  /**
    * Drag the mouse from the first coordinates to the second coordinates
    * @param {number} [fx=0] - The X-coordinate to start dragging from
    * @param {number} [fy=0] - The Y-coordinate to start dragging from
    * @param {number} [tx=0] - The X-coordinate to drag to
    * @param {number} [ty=0] - The Y-coordinate to drag to
    * @param {boolean} [a=false] - Whether or not to use an acceleration curve when dragging the mouse
    * @param {number} [d=0.2] - The duration of the drag in seconds
    */
  mouseDrag(fx: number = 0, fy: number = 0, tx: number = 0, ty: number = 0, a: boolean = false, d: number = 0.2): void {
    this.#executePyCommand(`mouseDrag(${fx},${fy},${tx},${ty},${a ? "True" : "False"},${d})`);
  }

  /**
   * Scrolls the mouse wheel up or down by the given amount.
   * @param {number} [amount=1] - The amount to scroll. A positive number scrolls up, a negative number scrolls down.
   */
  mouseScroll(am: number = 1): void {
    this.#executePyCommand(`mouseScroll(${am})`);
  }

  /**
   * Gets the current position of the mouse cursor on the screen.
   * @returns {Promise<{ x: number, y: number }>} A Promise that resolves with an object containing the X and Y coordinates of the mouse cursor.
   * @throws {Error} If there is an error reading the mouse position from the Python subprocess.
   */
  getMousePosition(): Promise<{ x: number, y: number }> {
    return new Promise((resolve, reject) => {
      this.#executePyCommand("getMousePosition()");

      this.pyProcess.stdout.once("data", (data: string) => {
        const dataArr = JSON.parse(data.toString());
        resolve({ x: dataArr[0], y: dataArr[1] });
      });
    });
  }

  /**
   * Returns an array of all the keys that can be pressed with the `keyTap`, `keyDown`, and `keyUp` methods.
   * @returns {string[]} - An array of strings representing the supported keys.
   */
  getSupportedKeys(): string[] {
    return this.supportedChars
  }

  /**
   * Sends a key tap event for the given key.
   * @param {string} key - The key to tap. Must be a single character or a key name from the list returned by the `getSupportedKeys` method.
   * @returns {void}
   */
  keyTap(key: string): void {
    if (this.supportedChars.indexOf(key) === -1 && !key.includes("+")) console.log("Key " + key + "  not supported")
    this.#executePyCommand(`keyTap('${key}')`);
  }

  /**
   * Sends a key up event for the given key.
   * @param {string} key - The key to release. Must be a single character or a key name from the list returned by the `getSupportedKeys` method.
   * @returns {void}
   */
  keyUp(key: string): void {
    if (this.supportedChars.indexOf(key) === -1 && !key.includes("+")) console.log("Key " + key + "  not supported")
    this.#executePyCommand(`keyUp('${key}')`);
  }

  /**
   * Sends a key down event for the given key.
   * @param {string} key - The key to press. Must be a single character or a key name from the list returned by the `getSupportedKeys` method.
   * @returns {void}
   */
  keyDown(key: string): void {
    if (this.supportedChars.indexOf(key) === -1 && !key.includes("+")) console.log("Key " + key + "  not supported")
    this.#executePyCommand(`keyDown('${key}')`);
  }

  /**
   * Sends a string of text to the active window by simulating individual key presses for each character.
   * @param {string} [text="Hello From LepikJS"] - The text to write.
   * @param {number} [delay=0.1] - The delay between each key press in seconds.
   * @returns {void}
   */
  write(msg: string = "Hello From LepikJS", d: number = 0.1): void {
    let arSending = msg.toString().split(" ");
    for (let i = 0; i < arSending.length; i++) {
      arSending[i] = '\\"' + arSending[i] + '\\"';
    }
    this.#executePyCommand(`write([${arSending}],${d})`);
  }

  /**
   * Copies the currently selected text to the clipboard.
   * @returns {void}
   */
  copy(): void {
    this.#executePyCommand(`copy()`);
  }

  /**
   * Pastes the text currently in the clipboard.
   * @returns {void}
   */
  paste(): void {
    this.#executePyCommand(`paste()`);
  }

  /**
  * Async delay method. This method needs the await keyword
  * @param {number} - Number of miliseconds to block the thread.
  * @returns {Promise<void>}
  */
  delaySync(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }


  /**
  * Delay method.
  * @param {number} - Number of miliseconds to block the thread.
  * @returns {Promise<void>}
  */
  delay(ms: number): void {
    const start = Date.now();
    while (Date.now() - start < ms) {
    }
  }


  /**
   * Registers a callback function for the given event.
   *
   * @param {string} ev - The name of the event to listen for. Supported events are "keyPress", "keyRelease", "mouseClick", "mouseDoubleClick", "mouseMove", "mouseDown", and "mouseUp".
   * @param {Function} cb - The callback function to be called when the event is triggered.
   */
  on(ev: string, cb: Function): void {
    // @ts-ignore
    const lepikEvents = require("lepikevents");

    switch (ev) {
      case "keyPress":
        lepikEvents.events.on("keyPress", (data: string) => {
          cb(data)
        })
        break;
      case "keyRelease":
        lepikEvents.events.on("keyRelease", (data: string) => {
          cb(data)
        })
        break;
      case "mouseClick":
        lepikEvents.events.on("mouseClick", (data: number[]) => {
          cb({ x: data[0], y: data[1], button: data[2] })
        })
        break;
      case "mouseDoubleClick":
        lepikEvents.events.on("mouseDoubleClick", (data: number[]) => {
          cb({ x: data[0], y: data[1], button: data[2] })
        })
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
        console.error("Unknown event: " + ev)
        break;
    }
  }

  /**
   * Closes the Python process. 
   * If the process is not closed, the code wont exit.
   */
  close(): void {
    this.#executePyCommand("exit")
  }

  /**
   * Writes the current command to the Python process.
   * @private
   */
  #executePyCommand(command: string): void {
    if (!this.hasGoodVersion) return
    this.pyProcess.stdin.write(`${command}\n`);
  }
}

export = Lepik;
