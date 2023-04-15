import sys
from lepik_mouse import *
from lepik_keyboard import *


def stringilize(arr: tuple) -> str:
    string = ' '.join(str(x) for x in arr)
    return string


while True:
    command = input().strip()
    if command == "exit":
        sys.exit(0)
    try:
        eval(command.replace("-", " "))
    except:
        print("Invalid command:", command)
