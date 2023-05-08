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
export = UnixLepik;
