declare class WindowsLepik {
    #private;
    ps: any;
    constructor(psPath: string);
    getMousePosition(): Promise<{
        x: number;
        y: number;
    }>;
    mouseClick(button: string, amount: number): void;
    mouseScroll(amount: number): void;
    mouseDrag(fromX: number, fromY: number, toX: number, toY: number, absolute?: boolean): void;
    mouseMove(toX: number, toY: number, absolute?: boolean): void;
    keyTap(key: string): void;
    close(): void;
}
declare class UnixLepik {
    #private;
    constructor();
    getMousePosition(): {
        x: number;
        y: number;
    };
    mouseClick(button: string, amount: number): void;
    mouseScroll(amount: number): void;
    mouseDrag(fromX: number, fromY: number, toX: number, toY: number, absolute?: boolean): void;
    mouseMove(toX: number, toY: number, absolute?: boolean): void;
    keyTap(key: string): void;
}
declare const _default: {
    UnixLepik: typeof UnixLepik;
    WindowsLepik: typeof WindowsLepik;
};
export = _default;
