const { ipcRenderer, ipcMain, app, BrowserWindow, globalShortcut, clipboard } = require('electron')

let win;
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 600, 
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`
  })
  win.loadURL(`file://${__dirname}/dist/index.html`)
  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()
  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
  
  win.webContents.openDevTools();

 ipcMain.on('asynchronous-message', (event, arg) => {
    event.sender.send('asynchronous-reply', 'pong')
  })
}
// Create window on electron intialization
app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('browser-window-focus', function () {
  globalShortcut.register('CommandOrControl+Shift+V', () => {
      win.webContents.send('asynchronous-reply', clipboard.readText());
    })
})
app.on('browser-window-blur', function () {
  globalShortcut.unregisterAll()
})
app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})