import time
import os


def keyTap(key: str) -> None:
    os.system(f'xdotool key {key}')


def keyDown(key: str) -> None:
    os.system(f'xdotool keydown {key}')


def keyUp(key: str) -> None:
    os.system(f'xdotool keyup {key}')


def write(arr: list, delay: float = 0.1) -> None:
    string = ' '.join(str(x) for x in arr)
    os.system(f'xdotool type --delay {delay} {string}')


def copy() -> None:
    os.system('xdotool key --clearmodifiers ctrl+c')
    time.sleep(0.1)


def paste() -> None:
    os.system('xdotool key --clearmodifiers ctrl+v')
    time.sleep(0.1)
