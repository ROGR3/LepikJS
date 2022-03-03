import keyboard


def keyTap(key: str) -> None:
    keyboard.send(key)


def write(arr: tuple, delay: int) -> None:
    string = ' '.join(str(x) for x in arr)
    keyboard.write(string, delay=delay)
