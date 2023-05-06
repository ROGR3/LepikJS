import os


def mouseMove(x: int, y: int, a: bool = False, d: float = 0.2) -> None:
    cmd = f'xdotool mousemove {"--screen 0 " if a else ""}{x} {y} {int(d*1000)}'
    os.system(cmd)


def mouseDrag(fx: int, fy: int, tx: int, ty: int, a: bool = False, d: float = 0.2) -> None:
    cmd = f'xdotool {"mousedown 1" if a else "mousemove_relative"} {fx} {fy}; sleep {d}; xdotool {"mouseup 1" if a else "mousemove_relative"} {tx-fx} {ty-fy}'
    os.system(cmd)


def mouseClick(key: str, am: int) -> None:
    if key == "left":
        key = 1
    elif key == "middle":
        key = 2
    elif key == "right":
        key = 3
    cmd = f'xdotool click --repeat {am} {key}'
    os.system(cmd)


def getMousePosition() -> None:
    cmd = 'xdotool getmouselocation --shell | awk \'{sub(/:/,"="); print}\''
    output = os.popen(cmd).read().strip()
    pos = [int(s.split('=')[1]) for s in output.split('\n')
           if s.startswith('X=') or s.startswith('Y=')]
    print(pos)


def mouseScroll(x: int) -> None:
    if x < 0:
        cmd = f'xdotool click --repeat {-x} 5'
    else:
        cmd = f'xdotool click --repeat {x} 4'
    os.system(cmd)
