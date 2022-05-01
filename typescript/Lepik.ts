import { execSync } from "child_process";


class Lepik {
  private pyCommand: string = "";
  private readonly pyPath: string;
  private readonly isWin: boolean;
  private safeMode: boolean;
  private readonly hasGoodVersion: boolean;
  private lastClick: Date;
  constructor(obj: { _path: string, _isWin: boolean, _hasGoodVersion: boolean }) {
    this.pyPath = obj._path;
    this.isWin = obj._isWin;
    this.safeMode = true;
    this.hasGoodVersion = obj._hasGoodVersion;
    this.lastClick = new Date();
  }
  mouseMove(x: number = 0, y: number = 0, a: boolean = false, d: number = 0.2): void {
    this.#changeCurrent(`mouseMove(${x},${y},${a ? "True" : "False"},${d})`);
    if (this.safeMode) this.#rfc()
  }
  mouseDoubleClick(key: string | number): void {
    this.mouseClick(key, 2)
  }
  mouseClick(key: string | number = "left", am: number = 1): void {
    if (typeof key === "number") {
      if (key == 0) key = "left";
      if (key == 1) key = "right";
      if (key == 2) key = "middle";
    }
    key = key.toString().toLowerCase();
    am = Math.abs(am)
    this.#changeCurrent(`mouseClick('${key}',${am})`);
    if (this.safeMode) return this.#rfc()
  }
  mouseDrag(fx: number = 0, fy: number = 0, tx: number = 10, ty: number = 10, a: boolean = false, d: number = 0.2): void {
    this.#changeCurrent(`mouseDrag(${fx},${fy},${tx},${ty},${a ? "True" : "False"},${d})`);
    if (this.safeMode) this.#rfc()
  }
  mouseScroll(am: number = 1): void {
    this.#changeCurrent(`mouseScroll(${am})`);
    if (this.safeMode) this.#rfc()
  }
  getMousePosition(): { x: number, y: number } {
    let posBrack = this.#rfc(`getMousePosition()`);
    let arr = JSON.parse(posBrack);
    let pos = { x: arr[0], y: arr[1] };
    return pos
  }
  keyTap(key: string = "a"): void {
    if (key.length > 1) return console.error("Key parameter must be a single character")
    this.#changeCurrent(`keyTap('${key}')`);
    if (this.safeMode) this.#rfc()
  }
  write(msg: string = "Hello From LepikJS", d: number = 0.1): void {
    let arSending = msg.toString().split(" ");
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
      case "mouseDoubleClick":
        lepikEvents.events.on("mouseDoubleClick", (data: any) => {
          cb({ x: data[0], y: data[1], button: data[2] })
        })
        break;
      default:
        console.error("Unknown event: " + ev)
        break;
    }
  }

  #rfc(args: string = this.pyCommand) {
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
}


export = Lepik;
