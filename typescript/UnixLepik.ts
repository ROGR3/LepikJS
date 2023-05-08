import { execSync } from "child_process"

class UnixLepik {
  constructor() {
  }

  //Mouse methods
  getMousePosition(): { x: number, y: number } {
    const command = "xdotool getmouselocation --shell | awk '{sub(/:/,\"=\"); print}'"

    let positions = this.#executeXDoTool(command).trim().split('\n').filter((s: string) => s.startsWith('X=') || s.startsWith('Y=')).map((s: string) => parseInt(s.split('=')[1]))
    return { x: positions[0], y: +positions[1] }

  }
  mouseClick(button: string, amount: number): void {
    const command = `xdotool click --repeat ${amount} ${button}`
    this.#executeXDoTool(command)
  }
  mouseScroll(amount: number): void {
    let direction = amount < 0 ? 5 : 4
    const command = `xdotool click --repeat ${Math.abs(amount)} ${direction}`
    this.#executeXDoTool(command)
  }

  mouseDrag(fromX: number, fromY: number, toX: number, toY: number, absolute: boolean = true) {
    const command = absolute ?
      `xdotool mousemove ${fromX} ${fromY} mousedown 1 mousemove ${toX} ${toY} mouseup 1`
      : `xdotool mousedown 1 mousemove_relative ${toX} ${toY} mouseup 1`

    this.#executeXDoTool(command)
  }

  mouseMove(toX: number, toY: number, absolute: boolean = true) {
    let movement = absolute ? "mousemove" : "mousemove_relative"
    const command = `xdotool ${movement} ${toX} ${toY}`
    this.#executeXDoTool(command)
  }

  //Keyboard methods
  keyTap(key: string | number) {
    // Any valid X Keysym string will work. Multiple keys are separated by '+'. Aliases exist for "alt", "ctrl", "shift", "super", and "meta" which all map to Foo_L, such as Alt_L and Control_L, etc.

    const command = `xdotool key ${key.toString()[0]}`
    this.#executeXDoTool(command)
  }

  write(text: string | number, delay: number) {
    // Types as if you had typed it. Supports newlines and tabs (ASCII newline and tab).
    const command = `xdotool type ${text} --delay ${delay}`
    this.#executeXDoTool(command)
  }

  keyDown(key: string) {
    const command = `xdotool keydown ${key}`
    this.#executeXDoTool(command)
  }

  keyUp(key: string) {
    const command = `xdotool keyup ${key}`
    this.#executeXDoTool(command)
  }

  #executeXDoTool(command: string) {
    return execSync(command).toString();
  }

}

export = UnixLepik
