import { spawn } from "child_process";

class Lepik {
  private pyCommand: string = "";
  private pyProcess;
  private readonly pyPath: string;
  private readonly hasGoodVersion: boolean;
  private readonly supportedChars: string[] = ['backspace', 'tab', 'clear', 'enter', 'shift', 'ctrl', 'alt', 'pause', 'caps-lock', 'esc', 'spacebar', 'page-up', 'page-down', 'end', 'home', 'left', 'up', 'right', 'down', 'select', 'print-screen', 'insert', 'delete', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'left-windows', 'right-windows', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12', 'f13', 'f14', 'f15', 'f16', 'f17', 'f18', 'f19', 'f20', 'f21', 'f22', 'f23', 'f24', 'num-lock', 'scroll-lock', 'left-shift', 'right-shift', 'left-ctrl', 'right-ctrl', 'left-menu', 'right-menu', 'volume-mute', 'volume-down', 'volume-up', 'next-track', 'previous-track', 'stop-media', ',', '.', 'play', 'zoom', 'clear'];
  constructor(_path: string, _isWin: boolean, _hasGoodVersion: boolean) {
    this.pyPath = _path;
    this.hasGoodVersion = _hasGoodVersion;

    if (_isWin) {
      this.pyProcess = spawn(`${this.pyPath}`);
    } else {
      this.pyProcess = spawn("sudo", ["python", `${this.pyPath}`]);
    }
    process.on('exit', () => {
      this.pyProcess.kill();
    });
  }
  mouseMove(x: number = 0, y: number = 0, a: boolean = false, d: number = 0.2): void {
    this.#changeCurrentCommand(`mouseMove(${x},${y},${a === true ? "True" : "False"},${d})`);
    this.#writeCommandToPy()
  }
  mouseDoubleClick(key: string | number): void {
    this.mouseClick(key, 2)
  }
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
    this.#changeCurrentCommand(`mouseClick('${key}',${Math.abs(am)})`);
    return this.#writeCommandToPy()
  }
  mouseDrag(fx: number = 0, fy: number = 0, tx: number = 10, ty: number = 10, a: boolean = false, d: number = 0.2): void {
    this.#changeCurrentCommand(`mouseDrag(${fx},${fy},${tx},${ty},${a ? "True" : "False"},${d})`);
    this.#writeCommandToPy()
  }
  mouseScroll(am: number = 1): void {
    this.#changeCurrentCommand(`mouseScroll(${am})`);
    this.#writeCommandToPy()
  }
  getMousePosition(): Promise<{ x: number, y: number }> {
    return new Promise((resolve, reject) => {
      this.#changeCurrentCommand("getMousePosition()");
      this.#writeCommandToPy()
      this.pyProcess.stdout.once("data", (data: string) => {
        const dataArr = JSON.parse(data.toString());
        resolve({ x: dataArr[0], y: dataArr[1] });
      });
    });
  }
  getSupportedKeys(): string[] {
    return this.supportedChars
  }
  keyTap(key: string): void {
    if (this.supportedChars.indexOf(key) === -1 && !key.includes("+")) console.log("Key " + key + "  not supported")
    this.#changeCurrentCommand(`keyTap('${key}')`);
    this.#writeCommandToPy()
  }
  keyUp(key: string): void {
    if (this.supportedChars.indexOf(key) === -1 && !key.includes("+")) console.log("Key " + key + "  not supported")
    this.#changeCurrentCommand(`keyUp('${key}')`);
    this.#writeCommandToPy()
  }
  keyDown(key: string): void {
    if (this.supportedChars.indexOf(key) === -1 && !key.includes("+")) console.log("Key " + key + "  not supported")
    this.#changeCurrentCommand(`keyDown('${key}')`);
    this.#writeCommandToPy()
  }
  write(msg: string = "Hello From LepikJS", d: number = 0.1): void {
    let arSending = msg.toString().split(" ");
    for (let i = 0; i < arSending.length; i++) {
      arSending[i] = '\\"' + arSending[i] + '\\"';
    }
    this.#changeCurrentCommand(`write([${arSending}],${d})`);
    this.#writeCommandToPy()
  }
  copy(): void {
    this.#changeCurrentCommand(`copy()`);
    this.#writeCommandToPy()
  }
  paste(): void {
    this.#changeCurrentCommand(`paste()`);
    this.#writeCommandToPy()
  }
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
  close(): void {
    this.#changeCurrentCommand("exit")
    this.#writeCommandToPy()
  }
  #writeCommandToPy(): void {
    if (this.hasGoodVersion) return
    this.pyProcess.stdin.write(`${this.pyCommand}\n`);
    this.pyCommand = "";
  }

  #changeCurrentCommand(cmd: string): void {
    this.pyCommand = cmd;
  }

}

export = Lepik;
