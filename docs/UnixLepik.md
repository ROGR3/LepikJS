<a name="UnixLepik"></a>

## UnixLepik
UnixLepik - A class that provides methods for Unix machines.Relies on xdotool.

**Kind**: global class  

* [UnixLepik](#UnixLepik)
    * [.getMousePosition()](#UnixLepik+getMousePosition) ⇒ <code>Object</code>
    * [.mouseClick([button], [amount])](#UnixLepik+mouseClick)
    * [.mouseDoubleClick([button])](#UnixLepik+mouseDoubleClick)
    * [.mouseScroll(fromX, fromY, toX, toY, [absolute])](#UnixLepik+mouseScroll)
    * [.mouseDrag(fromX, fromY, toX, toY, [absolute])](#UnixLepik+mouseDrag)
    * [.mouseMove(toX, toY, [absolute])](#UnixLepik+mouseMove)
    * [.keyTap(key)](#UnixLepik+keyTap) ⇒ <code>void</code>
    * [.write(text)](#UnixLepik+write) ⇒ <code>void</code>
    * [.keyDown(key)](#UnixLepik+keyDown) ⇒ <code>void</code>
    * [.keyUp(key)](#UnixLepik+keyUp) ⇒ <code>void</code>
    * [.copy()](#UnixLepik+copy) ⇒ <code>void</code>
    * [.paste()](#UnixLepik+paste) ⇒ <code>void</code>
    * [.getScreenSize()](#UnixLepik+getScreenSize) ⇒ <code>Object</code>
    * [.getActiveWindow()](#UnixLepik+getActiveWindow) ⇒ <code>Promise.&lt;number&gt;</code>
    * [.setActiveWindow(windowHandle)](#UnixLepik+setActiveWindow) ⇒ <code>void</code>
    * [.minimizeWindow(windowHandle)](#UnixLepik+minimizeWindow) ⇒ <code>void</code>
    * [.maximizeWindow(windowHandle)](#UnixLepik+maximizeWindow) ⇒ <code>void</code>
    * [.closeWindow(windowHandle)](#UnixLepik+closeWindow) ⇒ <code>void</code>
    * [.getWindowTitle(windowHandle)](#UnixLepik+getWindowTitle) ⇒ <code>string</code>
    * [.delay(ms)](#UnixLepik+delay) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="UnixLepik+getMousePosition"></a>

### unixLepik.getMousePosition() ⇒ <code>Object</code>
Gets the current position of the mouse cursor on the screen.

**Kind**: instance method of [<code>UnixLepik</code>](#UnixLepik)  
**Returns**: <code>Object</code> - An object containing the X and Y coordinates of the mouse cursor.  
**Example**  
```js
const lepik = require("lepikjs");let {x,y} = lepik.getMousePosition()
```
<a name="UnixLepik+mouseClick"></a>

### unixLepik.mouseClick([button], [amount])
Performs a click with the specified mouse button.

**Kind**: instance method of [<code>UnixLepik</code>](#UnixLepik)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [button] | <code>string</code> \| <code>number</code> | <code>&quot;&#x27;left&#x27;&quot;</code> | The button to use for the click (left, right, or middle mouse button). |
| [amount] | <code>number</code> | <code>1</code> | The number of clicks to perform. Default value is 1. |

**Example**  
```js
const lepik = require("lepikjs");lepik.mouseClick("right", 2);
```
<a name="UnixLepik+mouseDoubleClick"></a>

### unixLepik.mouseDoubleClick([button])
Performs a double-click with the specified mouse button.

**Kind**: instance method of [<code>UnixLepik</code>](#UnixLepik)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [button] | <code>string</code> \| <code>number</code> | <code>&quot;&#x27;left&#x27;&quot;</code> | The button to use for the click (left, right, or middle mouse button). |

**Example**  
```js
const lepik = require("lepikjs");lepik.mouseDoubleClick("middle");
```
<a name="UnixLepik+mouseScroll"></a>

### unixLepik.mouseScroll(fromX, fromY, toX, toY, [absolute])
Drag the mouse from the first coordinates to the second coordinates.

**Kind**: instance method of [<code>UnixLepik</code>](#UnixLepik)  

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
<a name="UnixLepik+mouseDrag"></a>

### unixLepik.mouseDrag(fromX, fromY, toX, toY, [absolute])
Drag the mouse from the first coordinates to the second coordinates.

**Kind**: instance method of [<code>UnixLepik</code>](#UnixLepik)  

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
<a name="UnixLepik+mouseMove"></a>

### unixLepik.mouseMove(toX, toY, [absolute])
Move the mouse to the specified coordinates.

**Kind**: instance method of [<code>UnixLepik</code>](#UnixLepik)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| toX | <code>number</code> |  | The X-coordinate to move to. |
| toY | <code>number</code> |  | The Y-coordinate to move to. |
| [absolute] | <code>boolean</code> | <code>false</code> | Whether or not to use an absolute positioning of the mouse. |

**Example**  
```js
const lepik = require("lepikjs");lepik.mouseMove(500, 500);
```
<a name="UnixLepik+keyTap"></a>

### unixLepik.keyTap(key) ⇒ <code>void</code>
Sends a key tap event for the given key.

**Kind**: instance method of [<code>UnixLepik</code>](#UnixLepik)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key to tap. Must be a single character or a key name from the list returned by the `getSupportedKeys` method. |

**Example**  
```js
const lepik = require("lepikjs");lepik.keyTap("a");
```
<a name="UnixLepik+write"></a>

### unixLepik.write(text) ⇒ <code>void</code>
Sends a string of text to the active window by simulating individual key presses for each character.

**Kind**: instance method of [<code>UnixLepik</code>](#UnixLepik)  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | The text to write. |

**Example**  
```js
const lepik = require("lepikjs");lepik.write("Hello, World!");
```
<a name="UnixLepik+keyDown"></a>

### unixLepik.keyDown(key) ⇒ <code>void</code>
Sends a key down event for the given key.

**Kind**: instance method of [<code>UnixLepik</code>](#UnixLepik)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key to press. Must be a single character or combination of keys. |

**Example**  
```js
const lepik = require("lepikjs");lepik.keyDown("Shift");
```
<a name="UnixLepik+keyUp"></a>

### unixLepik.keyUp(key) ⇒ <code>void</code>
Sends a key up event for the given key.

**Kind**: instance method of [<code>UnixLepik</code>](#UnixLepik)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The key to press. Must be a single character or combination of keys. |

**Example**  
```js
const lepik = require("lepikjs");lepik.keyUp("Shift");
```
<a name="UnixLepik+copy"></a>

### unixLepik.copy() ⇒ <code>void</code>
Copies the selected text or content.

**Kind**: instance method of [<code>UnixLepik</code>](#UnixLepik)  
**Example**  
```js
const lepik = require("lepikjs");lepik.copy();
```
<a name="UnixLepik+paste"></a>

### unixLepik.paste() ⇒ <code>void</code>
Pastes the copied text or content.

**Kind**: instance method of [<code>UnixLepik</code>](#UnixLepik)  
**Example**  
```js
const lepik = require("lepikjs");lepik.paste();
```
<a name="UnixLepik+getScreenSize"></a>

### unixLepik.getScreenSize() ⇒ <code>Object</code>
Gets the screen size.

**Kind**: instance method of [<code>UnixLepik</code>](#UnixLepik)  
**Returns**: <code>Object</code> - An object containing the width and height of the screen.  
**Example**  
```js
const lepik = require("lepikjs");let {width, height} = lepik.getScreenSize()
```
<a name="UnixLepik+getActiveWindow"></a>

### unixLepik.getActiveWindow() ⇒ <code>Promise.&lt;number&gt;</code>
Gets the ID of the active window.

**Kind**: instance method of [<code>UnixLepik</code>](#UnixLepik)  
**Returns**: <code>Promise.&lt;number&gt;</code> - A Promise that resolves with the ID of the active window.  
**Example**  
```js
const lepik = require("lepikjs");lepik.getActiveWindow().then((windowId) => {  console.log(`Active window ID: ${windowId}`);});
```
<a name="UnixLepik+setActiveWindow"></a>

### unixLepik.setActiveWindow(windowHandle) ⇒ <code>void</code>
Sets the specified window as the active window.

**Kind**: instance method of [<code>UnixLepik</code>](#UnixLepik)  

| Param | Type | Description |
| --- | --- | --- |
| windowHandle | <code>string</code> | The handle of the window to set as active. |

**Example**  
```js
const lepik = require("lepikjs");lepik.setActiveWindow("window123");
```
<a name="UnixLepik+minimizeWindow"></a>

### unixLepik.minimizeWindow(windowHandle) ⇒ <code>void</code>
Minimizes the specified window.

**Kind**: instance method of [<code>UnixLepik</code>](#UnixLepik)  

| Param | Type | Description |
| --- | --- | --- |
| windowHandle | <code>string</code> | The handle of the window to minimize. |

**Example**  
```js
const lepik = require("lepikjs");lepik.minimizeWindow("window123");
```
<a name="UnixLepik+maximizeWindow"></a>

### unixLepik.maximizeWindow(windowHandle) ⇒ <code>void</code>
Maximizes the specified window.

**Kind**: instance method of [<code>UnixLepik</code>](#UnixLepik)  

| Param | Type | Description |
| --- | --- | --- |
| windowHandle | <code>string</code> | The handle of the window to maximize. |

**Example**  
```js
const lepik = require("lepikjs");lepik.maximizeWindow("window123");
```
<a name="UnixLepik+closeWindow"></a>

### unixLepik.closeWindow(windowHandle) ⇒ <code>void</code>
Closes the specified window.

**Kind**: instance method of [<code>UnixLepik</code>](#UnixLepik)  

| Param | Type | Description |
| --- | --- | --- |
| windowHandle | <code>string</code> | The handle of the window to close. |

**Example**  
```js
const lepik = require("lepikjs");lepik.closeWindow("window123");
```
<a name="UnixLepik+getWindowTitle"></a>

### unixLepik.getWindowTitle(windowHandle) ⇒ <code>string</code>
Returns window title of given window.

**Kind**: instance method of [<code>UnixLepik</code>](#UnixLepik)  

| Param | Type | Description |
| --- | --- | --- |
| windowHandle | <code>string</code> | The handle of the window to close. |

**Example**  
```js
const lepik = require("lepikjs");let title = lepik.getWindowTitle("window123");
```
<a name="UnixLepik+delay"></a>

### unixLepik.delay(ms) ⇒ <code>Promise.&lt;void&gt;</code>
Delays the execution for the specified number of milliseconds.

**Kind**: instance method of [<code>UnixLepik</code>](#UnixLepik)  
**Returns**: <code>Promise.&lt;void&gt;</code> - A Promise that resolves after the delay.  

| Param | Type | Description |
| --- | --- | --- |
| ms | <code>number</code> | The number of milliseconds to delay. |

