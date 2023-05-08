"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _UnixLepik_instances, _UnixLepik_executeXDoTool;
const child_process_1 = require("child_process");
class UnixLepik {
    constructor() {
        _UnixLepik_instances.add(this);
    }
    //Mouse methods
    getMousePosition() {
        const command = "xdotool getmouselocation --shell | awk '{sub(/:/,\"=\"); print}'";
        let positions = __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeXDoTool).call(this, command).trim().split('\n').filter((s) => s.startsWith('X=') || s.startsWith('Y=')).map((s) => parseInt(s.split('=')[1]));
        return { x: positions[0], y: +positions[1] };
    }
    mouseClick(button, amount) {
        const command = `xdotool click --repeat ${amount} ${button}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeXDoTool).call(this, command);
    }
    mouseScroll(amount) {
        let direction = amount < 0 ? 5 : 4;
        const command = `xdotool click --repeat ${Math.abs(amount)} ${direction}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeXDoTool).call(this, command);
    }
    mouseDrag(fromX, fromY, toX, toY, absolute = true) {
        const command = absolute ?
            `xdotool mousemove ${fromX} ${fromY} mousedown 1 mousemove ${toX} ${toY} mouseup 1`
            : `xdotool mousedown 1 mousemove_relative ${toX} ${toY} mouseup 1`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeXDoTool).call(this, command);
    }
    mouseMove(toX, toY, absolute = true) {
        let movement = absolute ? "mousemove" : "mousemove_relative";
        const command = `xdotool ${movement} ${toX} ${toY}`;
        __classPrivateFieldGet(this, _UnixLepik_instances, "m", _UnixLepik_executeXDoTool).call(this, command);
    }
    //Keyboard methods
    keyTap(key) {
        const command = `xdotool key ${key}`;
    }
}
_UnixLepik_instances = new WeakSet(), _UnixLepik_executeXDoTool = function _UnixLepik_executeXDoTool(command) {
    return child_process_1.execSync(command).toString();
};
module.exports = UnixLepik;
