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
        this.supportedChars = ['backspace', 'tab', 'clear', 'enter', 'shift', 'ctrl', 'alt', 'pause', 'caps-lock', 'esc', 'spacebar', 'page-up', 'page-down', 'end', 'home', 'left', 'up', 'right', 'down', 'select', 'print-screen', 'insert', 'delete', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'left-windows', 'right-windows', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12', 'f13', 'f14', 'f15', 'f16', 'f17', 'f18', 'f19', 'f20', 'f21', 'f22', 'f23', 'f24', 'num-lock', 'scroll-lock', 'left-shift', 'right-shift', 'left-ctrl', 'right-ctrl', 'left-menu', 'right-menu', 'volume-mute', 'volume-down', 'volume-up', 'next-track', 'previous-track', 'stop-media', ',', '.', 'play', 'zoom', 'clear'];
        this.pyPath = obj._path;
        this.isWin = obj._isWin;
        this.safeMode = true;
        this.hasGoodVersion = obj._hasGoodVersion;
    }
    mouseMove(x = 0, y = 0, a = false, d = 0.2) {
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
        key = key.toString().toLowerCase();
        am = Math.abs(am);
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_changeCurrent).call(this, `mouseClick('${key}',${am})`);
        if (this.safeMode)
            return __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_rfc).call(this);
    }
    mouseDrag(fx = 0, fy = 0, tx = 10, ty = 10, a = false, d = 0.2) {
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_changeCurrent).call(this, `mouseDrag(${fx},${fy},${tx},${ty},${a ? "True" : "False"},${d})`);
        if (this.safeMode)
            __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_rfc).call(this);
    }
    mouseScroll(am = 1) {
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
    getSupportedKeys() {
        return this.supportedChars;
    }
    keyTap(key) {
        if (this.supportedChars.indexOf(key) === -1 && !key.includes("+"))
            console.log("Key " + key + "  not supported");
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_changeCurrent).call(this, `keyTap('${key}')`);
        if (this.safeMode)
            __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_rfc).call(this);
    }
    write(msg = "Hello From LepikJS", d = 0.1) {
        let arSending = msg.toString().split(" ");
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
            case "mouseDoubleClick":
                lepikEvents.events.on("mouseDoubleClick", (data) => {
                    cb({ x: data[0], y: data[1], button: data[2] });
                });
                break;
            case "mouseMove":
                lepikEvents.events.on("mouseMove", (data) => {
                    cb({ x: data[0], y: data[1], time: data[2] });
                });
                break;
            default:
                console.error("Unknown event: " + ev);
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
