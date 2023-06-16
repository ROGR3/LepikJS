export class LepikEvents {
  on(ev: string, cb: Function) {
    // @ts-ignore 
    const lepikEvents = require("lepikevents");
    switch (ev) {
      case "keyPress":
        lepikEvents.events.on("keyPress", (data: string) => {
          cb(data);
        });
        break;
      case "keyUp":
        lepikEvents.events.on("keyUp", (data: string) => {
          cb(data);
        });
        break;
      case "keyDown":
        lepikEvents.events.on("keyDown", (data: string) => {
          cb(data);
        });
        break;
      case "mouseClick":
        lepikEvents.events.on("mouseClick", (data: number[]) => {
          cb({ x: data[0], y: data[1], button: data[2] });
        });
        break;
      case "mouseDoubleClick":
        lepikEvents.events.on("mouseDoubleClick", (data: number[]) => {
          cb({ x: data[0], y: data[1], button: data[2] });
        });
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
        console.error("Unknown event: " + ev);
        break;
    }
  }
}