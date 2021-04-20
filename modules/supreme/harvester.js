const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')


function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  
  // and load the index.html of the app.
  win.loadFile(path.join(__dirname, 'index.html'))
  win.loadURL('https://www.supremenewyork.com/mobile#checkout')
}


app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})