Add-Type -AssemblyName System.Windows.Forms

Add-Type -MemberDefinition '[DllImport("user32.dll")] public static extern void mouse_event(int flags, int dx, int dy, int cButtons, int info);' -Name U32 -Namespace W;

Add-Type -TypeDefinition @"
using System;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Text;

public struct RECT
{
    public int Left;
    public int Top;
    public int Right;
    public int Bottom;
}

public static class User32 {
    [DllImport("user32.dll")]
    public static extern IntPtr GetForegroundWindow();

    [DllImport("user32.dll")]
    public static extern bool ShowWindowAsync(IntPtr hWnd, int nCmdShow);

    [DllImport("user32.dll")]
    public static extern bool IsIconic(IntPtr hWnd);

    [DllImport("user32.dll")]
    public static extern bool SetForegroundWindow(IntPtr hWnd);

    [DllImport("user32.dll")]
    public static extern void SwitchToThisWindow(IntPtr hWnd, bool fAltTab);

    [DllImport("user32.dll")]
    public static extern bool PostMessage(IntPtr hWnd, uint Msg, IntPtr wParam, IntPtr lParam);

    [DllImport("user32.dll")]
    public static extern bool IsWindow(IntPtr hWnd);

    [DllImport("user32.dll")]
    public static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);

    [DllImport("user32.dll", SetLastError = true)]
    public static extern bool GetWindowRect(IntPtr hwnd, out RECT lpRect);

    [DllImport("user32.dll")]
    public static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);

    public const uint WM_CLOSE = 0x0010;
}
"@

# Screen events
function GetScreenSize {
    $screen = [System.Windows.Forms.Screen]::PrimaryScreen
    $width = $screen.Bounds.Width
    $height = $screen.Bounds.Height
    [PSCustomObject]@{
        Width = $width
        Height = $height
    } | ConvertTo-Json
}

function GetActiveWindow {
    $windowHandle = [User32]::GetForegroundWindow()
    Write-Output $windowHandle.ToString()
}

function SetActiveWindow {
   param (
        [Parameter(Mandatory = $true)]
        [IntPtr]$WindowHandle
    )

    [User32]::SetForegroundWindow($WindowHandle)
    [User32]::SwitchToThisWindow($WindowHandle, $true)
  
}

function MinimizeWindow {
     param (
        [Parameter(Mandatory = $true)]
        [IntPtr]$WindowHandle
    )

    if ($WindowHandle -ne [IntPtr]::Zero) {
        if ([User32]::IsIconic($WindowHandle)) {
            [User32]::ShowWindowAsync($WindowHandle, 9)  # Restore if minimized
        } else {
            [User32]::ShowWindowAsync($WindowHandle, 6)  # Minimize if not already minimized
        }
    } else {
        Write-Host "No active window found."
    }
}

function MaximizeWindow {
    param (
        [Parameter(Mandatory = $true)]
        [IntPtr]$WindowHandle
    )

    if ($WindowHandle -ne [IntPtr]::Zero) {
        [User32]::ShowWindowAsync($WindowHandle, 3)  # Maximize window
    } else {
        Write-Host "No active window found."
    }
}

function CloseWindow {
    param (
        [Parameter(Mandatory = $true)]
        [IntPtr]$WindowHandle
    )

    if ($WindowHandle -ne [IntPtr]::Zero) {
        if ([User32]::IsWindow($WindowHandle)) {
            [User32]::PostMessage($WindowHandle, [User32]::WM_CLOSE, [IntPtr]::Zero, [IntPtr]::Zero)
        }
    } else {
        Write-Host "No active window found."
    }
}

function GetWindowTitle {
    param (
        [Parameter(Mandatory = $true)]
        [IntPtr]$WindowHandle
    )

    $maxTitleLength = 260
    $titleBuilder = New-Object System.Text.StringBuilder -ArgumentList $maxTitleLength
    $length = [User32]::GetWindowText($windowHandle, $titleBuilder, $maxTitleLength)

    if ($length -gt 0) {
        $title = $titleBuilder.ToString().TrimEnd("`0")
        return $title
    } else {
        return ""
    }
}

function GetWindowSize {
    param (
        [Parameter(Mandatory = $true)]
        [IntPtr]$WindowHandle
    )

    $rect = New-Object RECT
    $res = [User32]::GetWindowRect($WindowHandle, [ref]$rect)

    $width = $rect.Right - $rect.Left
    $height = $rect.Bottom - $rect.Top

    [PSCustomObject]@{
        Width = $width
        Height = $height
    } | ConvertTo-Json
}

function SetWindowSize {
    param (
        [Parameter(Mandatory = $true)]
        [IntPtr]$WindowHandle,
        [Parameter(Mandatory = $true)]
        [int]$Width,
        [Parameter(Mandatory = $true)]
        [int]$Height
    )

    $res = [User32]::SetWindowPos($WindowHandle, [IntPtr]::Zero, 0, 0, $Width, $Height, 0)
}






# Keyboard events
function KeyTap {
    param(
        [string]$text
    )

    [System.Windows.Forms.SendKeys]::SendWait($text)
}

function KeyDown {
    param (
        [Parameter(Mandatory = $true)]
        [string]$Key
    )

    [System.Windows.Forms.SendKeys]::SendWait("{{$Key} down}")
}

function KeyUp {
    param (
        [Parameter(Mandatory = $true)]
        [string]$Key
    )

    [System.Windows.Forms.SendKeys]::SendWait("{{$Key} up}")
}

function CopyToClipboard {
    [System.Windows.Forms.SendKeys]::SendWait("^c")
}
function PasteFromClipboard {
    [System.Windows.Forms.SendKeys]::SendWait("^v")
}


# Mouse events
function MouseClick {
    param(
        [ValidateSet('left', 'right', 'middle')]
        [string]$button
    )
    Write-host "Hey"
    switch ($button) {
        'left' {
            [W.U32]::mouse_event(2, 0, 0, 0, 0); # Left mouse button down
            [W.U32]::mouse_event(4, 0, 0, 0, 0); # Left mouse button up
            break
        }
        'right' {
            [W.U32]::mouse_event(8, 0, 0, 0, 0); # Right mouse button down
            [W.U32]::mouse_event(16, 0, 0, 0, 0); # Right mouse button up
            break
        }
        'middle' {
            [W.U32]::mouse_event(32, 0, 0, 0, 0); # Middle mouse button down
            [W.U32]::mouse_event(64, 0, 0, 0, 0); # Middle mouse button up
            break
        }
        default {
            throw "Unknown button: $button"
        }
    }
}

function MouseMove {
    param(
        [int]$x,
        [int]$y
    )

    [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point($x, $y)
}

function MouseScroll {
    param(
        [Parameter(Mandatory=$true)]
        [ValidateSet('up', 'down')]
        [string]$direction,
        [Parameter(Mandatory=$true)]
        [int]$scrollAmount
    )
    $scrollAmount = [System.Math]::Abs($scrollAmount) * 120
    switch ($direction) {
        'up' {
            [W.U32]::mouse_event(0x0800, 0, 0, $scrollAmount, 0)
            break
        }
        'down' {
            [W.U32]::mouse_event(0x0800, 0, 0, -$scrollAmount, 0)
            break
        }
        default {
            throw "Unknown direction: $direction"
        }
    }
}

function MouseDrag {
    param(
        [int]$fromX,
        [int]$fromY,
        [int]$toX,
        [int]$toY
    )

    # Move the mouse to the starting position
    [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point($fromX, $fromY)

    # Send a mouse down event
    [W.U32]::mouse_event(2, 0, 0, 0, 0); 
    # Move the mouse to the ending position
    [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point($toX, $toY)

    # Send a mouse up event
    [W.U32]::mouse_event(4, 0, 0, 0, 0); 
}

function GetMousePosition {
    $pos = [System.Windows.Forms.Cursor]::Position
    Write-Output "[$($pos.X), $($pos.Y)]"
}


# Loop forever, reading commands from stdin
# This logic will be changed in future
while ($true) {
    $line = [Console]::In.ReadLine()
    if ($line -eq "exit") {
        break
    }

    $js_args = $line -split ' '
    $cmd = $js_args[0]

    switch ($cmd) {
        'MouseClick' {
            MouseClick -button $js_args[1]
            break
        }
        'MouseMove' {
            MouseMove -x $js_args[1] -y $js_args[2] 
            break
        }
        'KeyTap' {
            KeyTap -text $js_args[1]
            break
        }
        'KeyDown'{
            KeyDown -Key $js_args[1]
        }
        'KeyUp'{
            KeyUp -Key $js_args[1]
        }
        'MouseDrag'{
            MouseDrag -fromX $js_args[1] -fromY $js_args[2] -toX $js_args[3] -toY $js_args[4]
            break
        }
        'MouseScroll'{
            MouseScroll -direction $js_args[1] -scrollAmount $js_args[2]
            break
        }
        'GetMousePosition'{
            GetMousePosition 
            break
        }
        'GetScreenSize'{
            GetScreenSize 
            break
        }
        'GetActiveWindow'{
            GetActiveWindow 
            break
        }
        'CopyToClipboard'{
            CopyToClipboard 
            break
        }
        'PasteFromClipboard'{
            PasteFromClipboard 
            break
        }
        'SetActiveWindow'{
            SetActiveWindow -WindowHandle ($js_args[1]/1)
            break
        }
        'MinimizeWindow'{
            MinimizeWindow -WindowHandle ($js_args[1]/1)
            break
        }
        'MaximizeWindow'{
            MaximizeWindow -WindowHandle ($js_args[1]/1)
            break
        }
        'CloseWindow'{
            CloseWindow  -WindowHandle ($js_args[1]/1)
        }
        'GetWindowTitle'{
            GetWindowTitle -WindowHandle ($js_args[1]/1)
        }
        'GetWindowSize'{
            GetWindowSize -WindowHandle ($js_args[1]/1)
        }
        'SetWindowSize'{
            SetWindowSize -WindowHandle ($js_args[1]/1) -Width ($js_args[2]/1) -Height ($js_args[3]/1)
        }
        default {
            Write-Error "Unknown command: $cmd"
            break
        }
    }
}