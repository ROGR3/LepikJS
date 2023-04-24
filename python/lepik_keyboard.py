import keyboard


def keyTap(key: str) -> None:
    try:
        keyboard.send(key)
    except Exception as e:
        print("Error in LepikJS keyTap:", e)


def keyDown(key: str) -> None:
    try:
        keyboard.press(key)
    except Exception as e:
        print("Error in LepikJS keyDown:", e)


def keyUp(key: str) -> None:
    try:
        keyboard.release(key)
    except Exception as e:
        print("Error in LepikJS keyUp:", e)


def write(arr: list, delay: float = 0.1) -> None:
    try:
        string = ' '.join(str(x) for x in arr)
        keyboard.write(string, delay=delay)
    except Exception as e:
        print("Error in LepikJS write:", e)


def copy() -> None:
    try:
        keyboard.press_and_release("ctrl+c")
    except Exception as e:
        print("Error in LepikJS copy:", e)


def paste() -> None:
    try:
        keyboard.press_and_release("ctrl+v")
    except Exception as e:
        print("Error in LepikJS paste:", e)
