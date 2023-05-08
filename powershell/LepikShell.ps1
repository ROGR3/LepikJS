$signature = @"
[DllImport("user32.dll", SetLastError=true)]
public static extern void mouse_event(uint dwFlags, uint dx, uint dy, uint dwData, UIntPtr dwExtraInfo);
"@

Add-Type -MemberDefinition $signature -Name Win32Functions -Namespace User32
Add-Type -AssemblyName System.Windows.Forms

function MouseClick {
    param(
        [ValidateSet('left', 'right', 'middle')]
        [string]$button
    )
    Write-host "Hey"
    switch ($button) {
        'left' {
            $flags = [User32.MouseFlags]::LEFTDOWN
            [User32]::mouse_event($flags, 0, 0, 0, [System.IntPtr]::Zero)
            $flags = [User32.MouseFlags]::LEFTUP
            [User32]::mouse_event($flags, 0, 0, 0, [System.IntPtr]::Zero)
            break
        }
        'right' {
            $flags = [User32.MouseFlags]::RIGHTDOWN
            [User32]::mouse_event($flags, 0, 0, 0, [System.IntPtr]::Zero)
            $flags = [User32.MouseFlags]::RIGHTUP
            [User32]::mouse_event($flags, 0, 0, 0, [System.IntPtr]::Zero)
            break
        }
        'middle' {
            $flags = [User32.MouseFlags]::MIDDLEDOWN
            [User32]::mouse_event($flags, 0, 0, 0, [System.IntPtr]::Zero)
            $flags = [User32.MouseFlags]::MIDDLEUP
            [User32]::mouse_event($flags, 0, 0, 0, [System.IntPtr]::Zero)
            break
        }
        default {
            throw "Unknown button: $button"
        }
    }
}

function KeyTap {
    param(
        [string]$text
    )

    [System.Windows.Forms.SendKeys]::SendWait($text)
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
        [int]$amount
    )

    $flags = [User32.MouseFlags]::WHEEL
    [User32]::mouse_event($flags, 0, 0, $amount, [System.IntPtr]::Zero)
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
    $flags = [User32.MouseFlags]::LEFTDOWN
    [User32]::mouse_event($flags, 0, 0, 0, [System.IntPtr]::Zero)

    # Move the mouse to the ending position
    [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point($toX, $toY)

    # Send a mouse up event
    $flags = [User32.MouseFlags]::LEFTUP
    [User32]::mouse_event($flags, 0, 0, 0, [System.IntPtr]::Zero)
}

function GetMousePosition {
    $pos = [System.Windows.Forms.Cursor]::Position
    Write-Output "[$($pos.X), $($pos.Y)]"
}


# Loop forever, reading commands from stdin
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
            MouseMove -x $js_args[1] -y $js_args[2] # Explicitly cast to int
            break
        }
        'KeyTap' {
            KeyTap -text $js_args[1]
            break
        }
        'MouseDrag'{
            MouseDrag -fromX $js_args[1] -fromY $js_args[2] -toX $js_args[3] -toY $js_args[4]
        }
        'MouseScroll'{
            MouseScroll -amount $js_args[1]
        }
        'GetMousePosition'{
            GetMousePosition 
        }
        default {
            Write-Error "Unknown command: $cmd"
            break
        }
    }
}
