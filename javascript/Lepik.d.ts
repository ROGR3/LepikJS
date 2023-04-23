declare class Lepik {
    #private;
    private pyCommand;
    private pyProcess;
    private readonly pyPath;
    private readonly hasGoodVersion;
    private readonly supportedChars;
    constructor(_path: string, _isWin: boolean, _hasGoodVersion: boolean);
    mouseMove(x?: number, y?: number, a?: boolean, d?: number): void;
    mouseDoubleClick(key: string | number): void;
    mouseClick(key?: string | number, am?: number): void;
    mouseDrag(fx?: number, fy?: number, tx?: number, ty?: number, a?: boolean, d?: number): void;
    mouseScroll(am?: number): void;
    getMousePosition(): Promise<{
        x: number;
        y: number;
    }>;
    getSupportedKeys(): string[];
    keyTap(key: string): void;
    keyUp(key: string): void;
    keyDown(key: string): void;
    write(msg?: string, d?: number): void;
    copy(): void;
    paste(): void;
    on(ev: string, cb: Function): void;
    close(): void;
}
export = Lepik;
