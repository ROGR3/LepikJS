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
export = WindowsLepik;
