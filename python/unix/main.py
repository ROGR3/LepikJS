import sys
from lepik_mouse import *
from lepik_keyboard import *


while True:
    command = input().strip()
    if command == "exit":
        sys.exit(0)
    eval(command.replace("-", " "))
