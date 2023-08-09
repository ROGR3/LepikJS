
const lepik = require("../../index.js")

// Main function to set window position
async function main() {
  // Log the start time of the function
  console.log(`Starting setWindowPosition at ${Date.now()}`)

  // Get the active window using lepik library
  let handle = await lepik.getActiveWindow()

  // Set the position of the window to (100, 100)
  lepik.setWindowPosition(handle, 100, 100)

  // Close the lepik library
  lepik.close()

  // Log the end time of the function
  console.log(`Closing setWindowPosition at ${Date.now()}`)
}

main()
