"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LepikEvents = void 0;
class LepikEvents {
    on(ev, cb) {
        // @ts-ignore 
        const lepikEvents = require("lepikevents");
        switch (ev) {
            case "keyPress":
                lepikEvents.events.on("keyPress", (data) => {
                    cb(data);
                });
                break;
            case "keyUp":
                lepikEvents.events.on("keyUp", (data) => {
                    cb(data);
                });
                break;
            case "keyDown":
                lepikEvents.events.on("keyDown", (data) => {
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
exports.LepikEvents = LepikEvents;
