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
  keyTap(key: string) {
    const command = `xdotool key ${key}`
  }


  #executeXDoTool(command: string) {
    return execSync(command).toString();
  }

}

export = UnixLepik
