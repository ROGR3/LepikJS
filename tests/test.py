import keyboard

# print(keyboard.hook(lambda e: e.event_type ==
#       keyboard.KEY_UP or callback(e), suppress=True))
# print(keyboard.hook(lambda e: e.event_type == keyboard.KEY_DOWN or callback(e)))


# def callback(e):
#     print(e)

# def onPress(e):
#     print("key pressed: ", e.name)
#     keyboard.unhook_all()
#     keyboard.on_release(onRelease)


# def onRelease(e):
#     print("key released: ", e.name)
#     keyboard.unhook_all()
#     keyboard.on_press(onPress)


# keyboard.on_press(onPress)
# keyboard.on_release(onRelease)

# keyboard.wait()


# def onPress(e):
#     print("key pressed: ", e.name)
#     print(keyboard._pressed_events)
#     print(keyboard._pressed_events)


# keyboard.on_press(onPress)

# keyboard.wait()

# def handle_keyboard_press():
#     def handle_press(e):
#         print(e.name)
#         print(e.event_type)

#     while True:
#         time.sleep(1)
#         keyboard.on_press(handle_press)

# def handle_press(e):
#     print(e.name)
#     print(e.event_type)


# keyboard.hook(handle_press)

# keyboard.wait()


arr = ["enter", "backspace", "capslock", "tab", "space", "left", "up", "right", "down", "insert", "delete", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c",
       "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10"]
keyboard.send("f5")
