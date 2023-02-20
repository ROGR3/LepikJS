import sys
from lepik_mouse import *
from lepik_keyboard import *

sys.argv.pop(0)


def log(msg: tuple) -> None:
    print(stringilize(msg), end='\n')


def stringilize(arr: tuple) -> str:
    string = ' '.join(str(x) for x in arr)
    return string


for i in range(len(sys.argv)):
    eval(sys.argv[i].replace("-", " "))
