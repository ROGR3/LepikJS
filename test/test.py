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

def handle_press(e):
    print(e.name)
    print(e.event_type)


keyboard.hook(handle_press)

keyboard.wait()
