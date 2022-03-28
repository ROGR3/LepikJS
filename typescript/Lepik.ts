import { execSync } from "child_process";


class Lepik {
  private pyCommand: string = "";
  private readonly pyPath: string;
  private readonly isWin: boolean;
  private safeMode: boolean;
  private readonly hasGoodVersion: boolean;
  constructor(obj: { _path: string, _isWin: boolean, _hasGoodVersion: boolean }) {
    this.pyPath = obj._path;
    this.isWin = obj._isWin;
    this.safeMode = true;
    this.hasGoodVersion = obj._hasGoodVersion;
  }
  mouseMove(x = 0, y = 0, a = false, d = 0.2): void {
    if (typeof x !== "number") return console.error("x parameter must be a number")
    if (typeof y !== "number") return console.error("y parameter must be a number")
    if (typeof a !== "boolean") return console.error("absolute parameter must be a boolean")
    if (typeof d !== "number") return console.error("delay parameter must be a number")
    this.#changeCurrent(`mouseMove(${x},${y},${a ? "True" : "False"},${d})`);
    if (this.safeMode) this.#rfc()
  }
  mouseDoubleClick(key: string | number): void {
    this.mouseClick(key, 2)
  }
  mouseClick(key: string | number = "left", am = 1): void {
    if (typeof key === "number") {
      if (key == 0) key = "left";
      if (key == 1) key = "right";
      if (key == 2) key = "middle";
    }
    if (typeof key !== "string") return console.error("key parameter must be a string or a number")
    key = key.toLowerCase();
    am = Math.abs(am)
    this.#changeCurrent(`mouseClick('${key}',${am})`);
    if (this.safeMode) return this.#rfc()
  }
  mouseDrag(fx = 0, fy = 0, tx = 10, ty = 10, a = false, d = 0.2): void {
    if (typeof fx !== "number") return console.error("fromX parameter must be a number")
    if (typeof fy !== "number") return console.error("fromY parameter must be a number")
    if (typeof tx !== "number") return console.error("toX parameter must be a number")
    if (typeof ty !== "number") return console.error("toY parameter must be a number")
    if (typeof a !== "boolean") return console.error("absolute parameter must be a boolean")
    if (typeof d !== "number") return console.error("delay parameter must be a number")
    this.#changeCurrent(`mouseDrag(${fx},${fy},${tx},${ty},${a ? "True" : "False"},${d})`);
    if (this.safeMode) this.#rfc()
  }
  mouseScroll(am = 1): void {
    if (typeof am !== "number") {
      console.error("am parameter should be a number, using default value 1")
      am = 1
    }
    this.#changeCurrent(`mouseScroll(${am})`);
    if (this.safeMode) this.#rfc()
  }
  getMousePosition(): { x: number, y: number } {
    let posBrack = this.#rfc(`getMousePosition()`);
    let arr = JSON.parse(posBrack);
    let pos = { x: arr[0], y: arr[1] };
    return pos
  }
  // isPressed(key) {
  //     let isPressed = this.#rfc(`isPressed('${key}')`).replace("\n", "");
  //     return isPressed;
  // }


  keyTap(key = "a"): void {
    if (typeof key !== "string") return console.error("Key parameter must be a string, use lepik.write() to write numbers")
    if (key.length > 1) return console.error("Key parameter must be a single character")
    this.#changeCurrent(`keyTap('${key}')`);
    if (this.safeMode) this.#rfc()
  }
  write(msg = "Hello From LepikJS", d = 0.1): void {
    if (typeof d !== "number") d = 0.1
    msg = msg.toString();

    let arSending = msg.split(" ");
    for (let i = 0; i < arSending.length; i++) {
      arSending[i] = '\\"' + arSending[i] + '\\"';
    }
    this.#changeCurrent(`write([${arSending}],${d})`);
    if (this.safeMode) this.#rfc()
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
        lepikEvents.events.on("mouseClick", (data: any) => {
          cb({ x: data[0], y: data[1], button: data[2] })
        })
        break;
      default:
        console.error("Unknown event: " + ev)
        break;
    }
  }

  #rfc(args = this.pyCommand) {
    if (this.hasGoodVersion) return
    let res = this.isWin ? execSync(`"${this.pyPath}" ${args}`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 }) : execSync(`sudo python ${this.pyPath} "${args}"`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
    return res
  }

  #changeCurrent(cmd: string): void {
    this.pyCommand = this.safeMode ? cmd : this.pyCommand += " " + cmd;
  }

  start(): void {
    this.safeMode = false;
  }
  end(): void {
    this.#rfc()
    this.safeMode = true
  }

  error(msg = "Hello from LepikJS!"): void {
    let arSending = msg.split(" ");
    for (let i = 0; i < arSending.length; i++) {
      arSending[i] = '\\"' + arSending[i] + '\\"';
    }
    let errorpy = this.#rfc(`error([${arSending}])`);
    console.error(errorpy.replace("\n", ""));
  }

}


export = Lepik;
