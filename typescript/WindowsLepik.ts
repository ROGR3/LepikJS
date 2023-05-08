import { spawn } from "child_process"

class WindowsLepik {
  ps;
  constructor(psPath: string) {
    this.ps = spawn('powershell.exe', ['-ExecutionPolicy', 'Bypass', '-File', psPath], {
      stdio: ['pipe', 'pipe', 'inherit']
    });
    this.ps.stdout.on("data", (data: SourceBuffer) => {
      if (data.toString().trim().length)
        console.log("data: " + data.toString().trim())
    });

    this.ps.on('close', () => {
      console.log(`PowerShell process exited`);
    });
    process.on('exit', () => {
      this.ps.kill();
    });
  }


  //Mouse methods
  getMousePosition(): Promise<{ x: number, y: number }> {
    return new Promise((resolve, reject) => {
      this.#executePowerShell("GetMousePosition");

      this.ps.stdout.once("data", (data: string) => {
        const dataArr = JSON.parse(data.toString());
        resolve({ x: dataArr[0], y: dataArr[1] });
      });
    });
  }
  mouseClick(button: string, amount: number): void {
    // button needs to be "left", "right", or "middle"
    const command = `MouseClick ${button}`
    this.#executePowerShell(command)
  }
  mouseScroll(amount: number): void {
    const command = `MouseScroll ${amount}`
    this.#executePowerShell(command)
  }

  mouseDrag(fromX: number, fromY: number, toX: number, toY: number, absolute: boolean = true) {
    const command = `MouseDrag ${fromX} ${fromY} ${toX} ${toY}`
    this.#executePowerShell(command)
  }

  mouseMove(toX: number, toY: number, absolute: boolean = true) {
    const command = `MouseMove ${toX} ${toY}`
    this.#executePowerShell(command)
  }

  //Keyboard methods
  keyTap(key: string) {
    const command = `KeyTap ${key}`
    this.#executePowerShell(command)
  }

  #executePowerShell(command: string) {
    this.ps.stdin.write(command + "\n");
  }

  close() {
    this.ps.stdin.write("exit\n");
  }
}


export = WindowsLepik 