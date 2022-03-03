"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Lepik_instances, _Lepik_rfc, _Lepik_changeCurrent;
const child_process_1 = require("child_process");
class Lepik {
    constructor(obj) {
        _Lepik_instances.add(this);
        this.pyCommand = "";
        this.pyPath = obj._path;
        this.isWin = obj._isWin;
        this.safeMode = true;
        this.hasGoodVersion = obj._hasGoodVersion;
    }
    mouseMove(x = 0, y = 0, a = false, d = 0.2) {
        if (typeof x !== "number")
            return console.log("x parameter must be a number");
        if (typeof y !== "number")
            return console.log("y parameter must be a number");
        if (typeof a !== "boolean")
            return console.log("absolute parameter must be a boolean");
        if (typeof d !== "number")
            return console.log("delay parameter must be a number");
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_changeCurrent).call(this, `mouseMove(${x},${y},${a ? "True" : "False"},${d})`);
        if (this.safeMode)
            __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_rfc).call(this);
    }
    mouseDoubleClick(key) {
        this.mouseClick(key, 2);
    }
    mouseClick(key = "left", am = 1) {
        if (typeof key === "number") {
            if (key == 0)
                key = "left";
            if (key == 1)
                key = "right";
            if (key == 2)
                key = "middle";
        }
        if (typeof key !== "string")
            return console.log("key parameter must be a string or a number");
        key = key.toLowerCase();
        am = Math.abs(am);
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_changeCurrent).call(this, `mouseClick('${key}',${am})`);
        if (this.safeMode)
            return __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_rfc).call(this);
    }
    mouseDrag(fx = 0, fy = 0, tx = 10, ty = 10, a = false, d = 0.2) {
        if (typeof fx !== "number")
            return console.log("fromX parameter must be a number");
        if (typeof fy !== "number")
            return console.log("fromY parameter must be a number");
        if (typeof tx !== "number")
            return console.log("toX parameter must be a number");
        if (typeof ty !== "number")
            return console.log("toY parameter must be a number");
        if (typeof a !== "boolean")
            return console.log("absolute parameter must be a boolean");
        if (typeof d !== "number")
            return console.log("delay parameter must be a number");
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_changeCurrent).call(this, `mouseDrag(${fx},${fy},${tx},${ty},${a ? "True" : "False"},${d})`);
        if (this.safeMode)
            __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_rfc).call(this);
    }
    mouseScroll(am = 1) {
        if (typeof am !== "number") {
            console.log("am parameter should be a number, using default value 1");
            am = 1;
        }
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_changeCurrent).call(this, `mouseScroll(${am})`);
        if (this.safeMode)
            __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_rfc).call(this);
    }
    getMousePosition() {
        let posBrack = __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_rfc).call(this, `getMousePosition()`);
        let arr = JSON.parse(posBrack);
        let pos = { x: arr[0], y: arr[1] };
        return pos;
    }
    // isPressed(key) {
    //     let isPressed = this.#rfc(`isPressed('${key}')`).replace("\n", "");
    //     return isPressed;
    // }
    keyTap(key = "a") {
        if (typeof key !== "string")
            return console.log("Key parameter must be a string, use lepik.write() to write numbers");
        if (key.length > 1)
            return console.log("Key parameter must be a single character");
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_changeCurrent).call(this, `keyTap('${key}')`);
        if (this.safeMode)
            __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_rfc).call(this);
    }
    write(msg = "Hello From LepikJS", d = 0.1) {
        if (typeof d !== "number")
            d = 0.1;
        msg = msg.toString();
        let arSending = msg.split(" ");
        for (let i = 0; i < arSending.length; i++) {
            arSending[i] = '\\"' + arSending[i] + '\\"';
        }
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_changeCurrent).call(this, `write([${arSending}],${d})`);
        if (this.safeMode)
            __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_rfc).call(this);
    }
    on(ev, cb) {
        // @ts-ignore
        const lepikEvents = require("lepikevents");
        switch (ev) {
            case "keyPress":
                lepikEvents.events.on("keyPress", (data) => {
                    cb(data);
                });
                break;
            case "keyRelease":
                lepikEvents.events.on("keyRelease", (data) => {
                    cb(data);
                });
                break;
            case "mouseClick":
                lepikEvents.events.on("mouseClick", (data) => {
                    cb({ x: data[0], y: data[1], button: data[2] });
                });
                break;
            default:
                console.log("Unknown event: " + ev);
                break;
        }
    }
    start() {
        this.safeMode = false;
    }
    end() {
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_rfc).call(this);
        this.safeMode = true;
    }
    log(msg = "Hello from LepikJS!") {
        let arSending = msg.split(" ");
        for (let i = 0; i < arSending.length; i++) {
            arSending[i] = '\\"' + arSending[i] + '\\"';
        }
        let logpy = __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_rfc).call(this, `log([${arSending}])`);
        console.log(logpy.replace("\n", ""));
    }
}
_Lepik_instances = new WeakSet(), _Lepik_rfc = function _Lepik_rfc(args = this.pyCommand) {
    if (this.hasGoodVersion)
        return;
    let res = this.isWin ? child_process_1.execSync(`"${this.pyPath}" ${args}`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 }) : child_process_1.execSync(`sudo python ${this.pyPath} "${args}"`, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
    return res;
}, _Lepik_changeCurrent = function _Lepik_changeCurrent(cmd) {
    this.pyCommand = this.safeMode ? cmd : this.pyCommand += " " + cmd;
};
module.exports = Lepik;
