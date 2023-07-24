<a name="WindowsLepik"></a>

## WindowsLepik
WindowsLepik - A class that provides methods for windows machines.

**Kind**: global class  

* [WindowsLepik](#WindowsLepik)
    * [.getMousePosition()](#WindowsLepik+getMousePosition) ⇒ <code>Promise.&lt;{x: number, y: number}&gt;</code>
    * [.mouseClick([button], [amount])](#WindowsLepik+mouseClick)
    * [.mouseDoubleClick([button])](#WindowsLepik+mouseDoubleClick)
    * [.mouseScroll([amount])](#WindowsLepik+mouseScroll)
    * [.mouseDrag(fromX, fromY, toX, toY, [absolute])](#WindowsLepik+mouseDrag)
    * [.mouseMove(toX, toY, [absolute])](#WindowsLepik+mouseMove)
    * [.keyTap(key)](#WindowsLepik+keyTap) ⇒ <code>void</code>
    * [.write(text)](#WindowsLepik+write) ⇒ <code>void</code>
    * [.keyDown(key)](#WindowsLepik+keyDown) ⇒ <code>void</code>
    * [.keyUp(key)](#WindowsLepik+keyUp) ⇒ <code>void</code>
    * [.copy()](#WindowsLepik+copy) ⇒ <code>void</code>
    * [.paste()](#WindowsLepik+paste) ⇒ <code>void</code>
    * [.getScreenSize()](#WindowsLepik+getScreenSize) ⇒ <code>Promise.&lt;{width: number, height: number}&gt;</code>
    * [.getActiveWindow()](#WindowsLepik+getActiveWindow) ⇒ <code>Promise.&lt;number&gt;</code>
    * [.setActiveWindow(windowHandle)](#WindowsLepik+setActiveWindow) ⇒ <code>void</code>
    * [.minimizeWindow(windowHandle)](#WindowsLepik+minimizeWindow) ⇒ <code>void</code>
    * [.maximizeWindow(windowHandle)](#WindowsLepik+maximizeWindow) ⇒ <code>void</code>
    * [.closeWindow(windowHandle)](#WindowsLepik+closeWindow) ⇒ <code>void</code>
    * [.getWindowTitle(windowHandle)](#WindowsLepik+getWindowTitle) ⇒ <code>string</code>
    * [.delay(ms)](#WindowsLepik+delay) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="WindowsLepik+getMousePosition"></a>

### windowsLepik.getMousePosition() ⇒ <code>Promise.&lt;{x: number, y: number}&gt;</code>
Gets the current position of the mouse cursor on the screen.

**Kind**: instance method of [<code>WindowsLepik</code>](#WindowsLepik)  
**Returns**: <code>Promise.&lt;{x: number, y: number}&gt;</code> - A Promise that resolves with an object containing the X and Y coordinates of the mouse cursor.  
**Example**  
```js
const lepik = require("lepikjs");lepik.getMousePosition().then(position => {  console.log(`Mouse position: X = ${position.x}, Y = ${position.y}`);});
```
<a name="WindowsLepik+mouseClick"></a>

### windowsLepik.mouseClick([button], [amount])
Performs a click with the specified mouse button.

**Kind**: instance method of [<code>WindowsLepik</code>](#WindowsLepik)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [button] | <code>string</code> \| <code>number</code> | <code>&quot;&#x27;left&#x27;&quot;</code> | The button to use for the click (left, right, or middle mouse button). |
| [amount] | <code>number</code> | <code>1</code> | The number of clicks to perform. Default value is 1. |

**Example**  
```js
const lepik = require("lepikjs");lepik.mouseClick("right", 2);
```
<a name="WindowsLepik+mouseDoubleClick"></a>

### windowsLepik.mouseDoubleClick([button])
Performs a double-click with the specified mouse button.

**Kind**: instance method of [<code>WindowsLepik</code>](#WindowsLepik)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [button] | <code>string</code> \| <code>number</code> | <code>&quot;&#x27;left&#x27;&quot;</code> | The button to use for the click (left, right, or middle mouse button). |

**Example**  
```js
const lepik = require("lepikjs");lepik.mouseDoubleClick("middle");
```
<a name="WindowsLepik+mouseScroll"></a>

### windowsLepik.mouseScroll([amount])
Scrolls the mouse wheel up or down by the given amount.

**Kind**: instance method of [<code>WindowsLepik</code>](#WindowsLepik)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [amount] | <code>number</code> | <code>0</code> | The amount to scroll. A positive number scrolls up, a negative number scrolls down. |

**Example**  
```js
const lepik = require("lepikjs");lepik.mouseScroll(3);
```
<a name="WindowsLepik+mouseDrag"></a>

### windowsLepik.mouseDrag(fromX, fromY, toX, toY, [absolute])
Drag the mouse from the first coordinates to the second coordinates.

**Kind**: instance method of [<code>WindowsLepik</code>](#WindowsLepik)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fromX | <code>number</code> |  | The X-coordinate to start dragging from. |
| fromY | <code>number</code> |  | The Y-coordinate to start dragging from. |
| toX | <code>number</code> |  | The X-coordinate to drag to. |
| toY | <code>number</code> |  | The Y-coordinate to drag to. |
| [absolute] | <code>boolean</code> | <code>false</code> | Whether or not to use an absolute positioning of the mouse. |

**Example**  
```js
const lepik = require("lepikjs");lepik.mouseDrag(100, 100, 200, 200);
```
<a name="WindowsLepik+mouseMove"></a>

### windowsLepik.mouseMove(toX, toY, [absolute])
Move the mouse to the specified coordinates.

**Kind**: instance method of [<code>WindowsLepik</code>](#WindowsLepik)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| toX | <code>number</code> |  | The X-coordinate to move to. |
| toY | <code>number</code> |  | The Y-coordinate to move to. |
| [absolute] | <code>boolean</code> | <code>false</code> | Whether or not to use an absolute positioning of the mouse. |

**Example**  
```js
const lepik = require("lepikjs");lepik.mouseMove(500, 500);
```
<a name="WindowsLepik+keyTap"></a>

### windowsLepik.keyTap(key) ⇒ <code>void</code>
Sends a key tap event for the given key.

**Kind**: instance method of [<code>WindowsLepik</code>](#WindowsLepik)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key to tap. Must be a single character or a key name from the list returned by the `getSupportedKeys` method. |

**Example**  
```js
const lepik = require("lepikjs");lepik.keyTap("a");
```
<a name="WindowsLepik+write"></a>

### windowsLepik.write(text) ⇒ <code>void</code>
Sends a string of text to the active window by simulating individual key presses for each character.

**Kind**: instance method of [<code>WindowsLepik</code>](#WindowsLepik)  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The text to write. |

**Example**  
```js
const lepik = require("lepikjs");lepik.write("Hello, World!");
```
<a name="WindowsLepik+keyDown"></a>

### windowsLepik.keyDown(key) ⇒ <code>void</code>
Sends a key down event for the given key.

**Kind**: instance method of [<code>WindowsLepik</code>](#WindowsLepik)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key to press. Must be a single character or combination of keys. |

**Example**  
```js
const lepik = require("lepikjs");lepik.keyDown("Shift");
```
<a name="WindowsLepik+keyUp"></a>

### windowsLepik.keyUp(key) ⇒ <code>void</code>
Sends a key up event for the given key.

**Kind**: instance method of [<code>WindowsLepik</code>](#WindowsLepik)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key to press. Must be a single character or combination of keys. |

**Example**  
```js
const lepik = require("lepikjs");lepik.keyUp("Shift");
```
<a name="WindowsLepik+copy"></a>

### windowsLepik.copy() ⇒ <code>void</code>
Copies the selected text or content.

**Kind**: instance method of [<code>WindowsLepik</code>](#WindowsLepik)  
**Example**  
```js
const lepik = require("lepikjs");lepik.copy();
```
<a name="WindowsLepik+paste"></a>

### windowsLepik.paste() ⇒ <code>void</code>
Pastes the copied text or content.

**Kind**: instance method of [<code>WindowsLepik</code>](#WindowsLepik)  
**Example**  
```js
const lepik = require("lepikjs");lepik.paste();
```
<a name="WindowsLepik+getScreenSize"></a>

### windowsLepik.getScreenSize() ⇒ <code>Promise.&lt;{width: number, height: number}&gt;</code>
Gets the screen size.

**Kind**: instance method of [<code>WindowsLepik</code>](#WindowsLepik)  
**Returns**: <code>Promise.&lt;{width: number, height: number}&gt;</code> - A Promise that resolves with an object containing the width and height of the screen.  
**Example**  
```js
const lepik = require("lepikjs");lepik.getScreenSize().then((size) => {  console.log(`Screen size: Width = ${size.width}, Height = ${size.height}`);});
```
<a name="WindowsLepik+getActiveWindow"></a>

### windowsLepik.getActiveWindow() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the ID of the active window.

**Kind**: instance method of [<code>WindowsLepik</code>](#WindowsLepik)  
**Returns**: <code>Promise.&lt;number&gt;</code> - A Promise that resolves with the ID of the active window.  
**Example**  
```js
const lepik = require("lepikjs");lepik.getActiveWindow().then((windowId) => {  console.log(`Active window ID: ${windowId}`);});
```
<a name="WindowsLepik+setActiveWindow"></a>

### windowsLepik.setActiveWindow(windowHandle) ⇒ <code>void</code>
Sets the specified window as the active window.

**Kind**: instance method of [<code>WindowsLepik</code>](#WindowsLepik)  

| Param | Type | Description |
| --- | --- | --- |
| windowHandle | <code>string</code> | The handle of the window to set as active. |

**Example**  
```js
const lepik = require("lepikjs");lepik.setActiveWindow("window123");
```
<a name="WindowsLepik+minimizeWindow"></a>

### windowsLepik.minimizeWindow(windowHandle) ⇒ <code>void</code>
Minimizes the specified window.

**Kind**: instance method of [<code>WindowsLepik</code>](#WindowsLepik)  

| Param | Type | Description |
| --- | --- | --- |
| windowHandle | <code>string</code> | The handle of the window to minimize. |

**Example**  
```js
const lepik = require("lepikjs");lepik.minimizeWindow("window123");
```
<a name="WindowsLepik+maximizeWindow"></a>

### windowsLepik.maximizeWindow(windowHandle) ⇒ <code>void</code>
Maximizes the specified window.

**Kind**: instance method of [<code>WindowsLepik</code>](#WindowsLepik)  

| Param | Type | Description |
| --- | --- | --- |
| windowHandle | <code>string</code> | The handle of the window to maximize. |

**Example**  
```js
const lepik = require("lepikjs");lepik.maximizeWindow("window123");
```
<a name="WindowsLepik+closeWindow"></a>

### windowsLepik.closeWindow(windowHandle) ⇒ <code>void</code>
Closes the specified window.

**Kind**: instance method of [<code>WindowsLepik</code>](#WindowsLepik)  

| Param | Type | Description |
| --- | --- | --- |
| windowHandle | <code>string</code> | The handle of the window to close. |

**Example**  
```js
const lepik = require("lepikjs");lepik.closeWindow("window123");
```
<a name="WindowsLepik+getWindowTitle"></a>

### windowsLepik.getWindowTitle(windowHandle) ⇒ <code>string</code>
Returns window title of given window handle.

**Kind**: instance method of [<code>WindowsLepik</code>](#WindowsLepik)  

| Param | Type | Description |
| --- | --- | --- |
| windowHandle | <code>string</code> | The handle of the window to close. |

**Example**  
```js
const lepik = require("lepikjs");let title = await lepik.getWindowTitle("window123");
```
<a name="WindowsLepik+delay"></a>

### windowsLepik.delay(ms) ⇒ <code>Promise.&lt;void&gt;</code>
Delays the execution for the specified number of milliseconds.

**Kind**: instance method of [<code>WindowsLepik</code>](#WindowsLepik)  
**Returns**: <code>Promise.&lt;void&gt;</code> - A Promise that resolves after the delay.  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>number</code> | The number of milliseconds to delay. |

