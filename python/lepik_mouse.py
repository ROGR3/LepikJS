import mouse
import sys
from threading import Lock

print_lock = Lock()


def safe_print(*a, **b):
    with print_lock:
        print(*a, **b)
        sys.stdout.flush()


def mouseMove(x: int, y: int, a: bool = False, d: float = 0.2) -> None:
    mouse.move(x, y, absolute=a, duration=d)


def mouseDrag(fx: int, fy: int, tx: int, ty: int, a: bool = False, d: float = 0.2) -> None:
    mouse.drag(fx, fy, tx, ty, absolute=a, duration=d)


def mouseClick(key: str, am: int) -> None:
    for i in range(am):
        mouse.click(key)


def getMousePosition() -> tuple:
    safe_print(list(mouse.get_position()))


def mouseScroll(x: int) -> None:
    mouse.wheel(x)
