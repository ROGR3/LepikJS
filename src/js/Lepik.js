const { execSync } = require("child_process");
class Lepik {
    #pyCommand = "";
    constructor({ _path, isWin }) {
        this._pyPath = _path;
        this._isWin = isWin;
    }
    mouseMove(x = 0, y = 0, a = false, d = 0.2) {
        this.#changeCurrent(`mouseMove(${x},${y},${a ? "True" : "False"},${d})`);
        this.#rfc();
    }
    mouseDoubleClick(key) {
        this.mouseClick(key, 2)
    }
    mouseClick(key = "left", am = 1) {
        key = key.toLowerCase();
        am = Math.abs(am)
        this.#changeCurrent(`mouseClick('${key}',${am})`);
        return this.#rfc();
    }
    mouseDrag(fx = 0, fy = 0, tx = 10, ty = 10, a = false, d = 0.2) {
        this.#changeCurrent(`mouseDrag(${fx},${fy},${tx},${ty},${a ? "True" : "False"},${d})`);
        this.#rfc();
    }
    mouseScroll(am = 1) {
        this.#changeCurrent(`mouseScroll(${am})`);
        this.#rfc();
    }
    getMousePosition() {
        let posBrack = this.#rfc(`getMousePosition()`);
        let arr = JSON.parse(posBrack);
        let pos = { x: arr[0], y: arr[1] };
        return pos
    }
    // isPressed(key) {
    //     let isPressed = this.#rfc(`isPressed('${key}')`).replace("\n", "");
    //     return isPressed;
    // }
    log(msg = "Hello from LepikJS!") {
        let arSending = msg.split(" ");
        for (let i = 0; i < arSending.length; i++) {
            arSending[i] = '\\"' + arSending[i] + '\\"';
        }
        let logpy = this.#rfc(`log([${arSending}])`);
        console.log(logpy.replace("\n", ""));
    }

    keyTap(key = "a") {
        this.#changeCurrent(`keyTap('${key}')`);
        this.#rfc();
    }
    write(msg = "Hello From LepikJS", d = 0.1) {
        let arSending = msg.split(" ");
        for (let i = 0; i < arSending.length; i++) {
            arSending[i] = '\\"' + arSending[i] + '\\"';
        }
        console.log(`write([${arSending}],${d})`)
        this.#changeCurrent(`write([${arSending}],${d})`);
        this.#rfc()
    }

    on(ev, cb) {
        const lepikEvents = require("lepikevents");
        switch (ev) {
            case "keyPress":
                lepikEvents.events.on("keyPress", data => {
                    cb(data)
                })
                break;
            case "mouseClick":
                lepikEvents.events.on("mouseClick", data => {
                    cb({ x: data[0], y: data[1], button: data[2] })
                })
                break;
        }
    }

    #rfc(args = this.#pyCommand) {
        let res = this._isWin ? execSync(`"${this._pyPath}" ${args}`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 }) : execSync(`sudo python ${this._pyPath} "${args}"`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
        return res
    }
    #rfcDebug(args = this.#pyCommand) {
        console.log("Debug mode is ON")
        let res = execSync(`python ${require("../../set.json").debugPath} ${args}`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
        return res
    }
    #changeCurrent(cmd) {
        this.#pyCommand = cmd;
    }
}


exports.default = Lepik;
