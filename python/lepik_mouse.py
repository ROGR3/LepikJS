import mouse
import sys


def mouseMove(x: int, y: int, a: bool = False, d: float = 0.2) -> None:
    try:
        mouse.move(x, y, absolute=a, duration=d)
    except Exception as e:
        print("Error in LepikJS mouseMove:", e)


def mouseDrag(fx: int, fy: int, tx: int, ty: int, a: bool = False, d: float = 0.2) -> None:
    try:
        mouse.drag(fx, fy, tx, ty, absolute=a, duration=d)
    except Exception as e:
        print("Error in LepikJS mouseDrag:", e)


def mouseClick(key: str, am: int) -> None:
    try:
        for i in range(am):
            mouse.click(key)
    except Exception as e:
        print("Error in LepikJS mouseClick:", e)


def getMousePosition() -> None:
    try:
        print(list(mouse.get_position()))
    except Exception as e:
        print("Error in LepikJS getMousePosition:", e)


def mouseScroll(x: int) -> None:
    try:
        mouse.wheel(x)
    except Exception as e:
        print("Error in LepikJS mouseScroll:", e)
