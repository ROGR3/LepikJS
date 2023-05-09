Add-Type -AssemblyName System.Windows.Forms

Add-Type -MemberDefinition '[DllImport("user32.dll")] public static extern void mouse_event(int flags, int dx, int dy, int cButtons, int info);' -Name U32 -Namespace W;
#left mouse click


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
            MouseScroll -direction $js_args[1] -scrollAmount $js_args[2]
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
