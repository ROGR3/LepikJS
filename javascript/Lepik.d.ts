declare class Lepik {
    #private;
    private pyCommand;
    private readonly pyPath;
    private readonly isWin;
    private safeMode;
    private readonly hasGoodVersion;
    private readonly supportedChars;
    constructor(obj: {
        _path: string;
        _isWin: boolean;
        _hasGoodVersion: boolean;
    });
    mouseMove(x?: number, y?: number, a?: boolean, d?: number): void;
    mouseDoubleClick(key: string | number): void;
    mouseClick(key?: string | number, am?: number): void;
    mouseDrag(fx?: number, fy?: number, tx?: number, ty?: number, a?: boolean, d?: number): void;
    mouseScroll(am?: number): void;
    getMousePosition(): {
        x: number;
        y: number;
    };
    keyTap(key?: string): void;
    write(msg?: string, d?: number): void;
    on(ev: string, cb: Function): void;
    start(): void;
    end(): void;
}
export = Lepik;
