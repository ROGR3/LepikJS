import sys
from lepik_mouse import *
from lepik_keyboard import *


while True:
    command = input().strip()
    if command == "exit":
        sys.exit(0)
    try:
        eval(command.replace("-", " "))
    except:
        print("Invalid command:", command)
