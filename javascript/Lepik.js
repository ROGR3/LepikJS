"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Lepik_instances, _Lepik_writeCommandToPy, _Lepik_changeCurrentCommand;
const child_process_1 = require("child_process");
class Lepik {
    constructor(_path, _isWin, _hasGoodVersion) {
        _Lepik_instances.add(this);
        this.pyCommand = "";
        this.supportedChars = ['backspace', 'tab', 'clear', 'enter', 'shift', 'ctrl', 'alt', 'pause', 'caps-lock', 'esc', 'spacebar', 'page-up', 'page-down', 'end', 'home', 'left', 'up', 'right', 'down', 'select', 'print-screen', 'insert', 'delete', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'left-windows', 'right-windows', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '*', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9', 'f10', 'f11', 'f12', 'f13', 'f14', 'f15', 'f16', 'f17', 'f18', 'f19', 'f20', 'f21', 'f22', 'f23', 'f24', 'num-lock', 'scroll-lock', 'left-shift', 'right-shift', 'left-ctrl', 'right-ctrl', 'left-menu', 'right-menu', 'volume-mute', 'volume-down', 'volume-up', 'next-track', 'previous-track', 'stop-media', ',', '.', 'play', 'zoom', 'clear'];
        this.pyPath = _path;
        this.hasGoodVersion = _hasGoodVersion;
        this.pyProcess = _isWin ? child_process_1.spawn(this.pyPath) : child_process_1.spawn(`sudo python`, [`${this.pyPath}`]);
        process.on('exit', () => {
            console.log("ended");
            this.pyProcess.kill();
        });
        this.pyProcess.on("exit", (code) => {
            console.log(`LepikJS Python process exited with code ${code}`);
            console.log(`Existing LepikJS too.`);
            process.exit();
        });
    }
    mouseMove(x = 0, y = 0, a = false, d = 0.2) {
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_changeCurrentCommand).call(this, `mouseMove(${x},${y},${a === true ? "True" : "False"},${d})`);
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_writeCommandToPy).call(this);
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
            else {
                console.log("Wrong key in mouseClick. Used " + key + ". Expected 0 or 1 or 2.");
                return;
            }
        }
        key = key.toString().toLowerCase();
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_changeCurrentCommand).call(this, `mouseClick('${key}',${Math.abs(am)})`);
        return __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_writeCommandToPy).call(this);
    }
    mouseDrag(fx = 0, fy = 0, tx = 10, ty = 10, a = false, d = 0.2) {
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_changeCurrentCommand).call(this, `mouseDrag(${fx},${fy},${tx},${ty},${a ? "True" : "False"},${d})`);
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_writeCommandToPy).call(this);
    }
    mouseScroll(am = 1) {
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_changeCurrentCommand).call(this, `mouseScroll(${am})`);
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_writeCommandToPy).call(this);
    }
    getMousePosition() {
        return new Promise((resolve, reject) => {
            __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_changeCurrentCommand).call(this, "getMousePosition()");
            __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_writeCommandToPy).call(this);
            this.pyProcess.stdout.once("data", (data) => {
                const dataArr = JSON.parse(data.toString());
                resolve({ x: dataArr[0], y: dataArr[1] });
            });
        });
    }
    getSupportedKeys() {
        return this.supportedChars;
    }
    keyTap(key) {
        if (this.supportedChars.indexOf(key) === -1 && !key.includes("+"))
            console.log("Key " + key + "  not supported");
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_changeCurrentCommand).call(this, `keyTap('${key}')`);
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_writeCommandToPy).call(this);
    }
    write(msg = "Hello From LepikJS", d = 0.1) {
        let arSending = msg.toString().split(" ");
        for (let i = 0; i < arSending.length; i++) {
            arSending[i] = '\\"' + arSending[i] + '\\"';
        }
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_changeCurrentCommand).call(this, `write([${arSending}],${d})`);
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_writeCommandToPy).call(this);
    }
    copy() {
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_changeCurrentCommand).call(this, `copy()`);
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_writeCommandToPy).call(this);
    }
    paste() {
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_changeCurrentCommand).call(this, `paste()`);
        __classPrivateFieldGet(this, _Lepik_instances, "m", _Lepik_writeCommandToPy).call(this);
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
            case "mouseDown":
                lepikEvents.events.on("mouseDown", (data) => {
                    cb({ x: data[0], y: data[1] });
                });
                break;
            case "mouseUp":
                lepikEvents.events.on("mouseUp", (data) => {
                    cb({ x: data[0], y: data[1] });
                });
                break;
            default:
                console.error("Unknown event: " + ev);
                break;
        }
    }
}
_Lepik_instances = new WeakSet(), _Lepik_writeCommandToPy = function _Lepik_writeCommandToPy() {
    if (this.hasGoodVersion)
        return;
    this.pyProcess.stdin.write(`${this.pyCommand}\n`);
    this.pyCommand = "";
    return this.pyProcess;
}, _Lepik_changeCurrentCommand = function _Lepik_changeCurrentCommand(cmd) {
    this.pyCommand = cmd;
};
module.exports = Lepik;
