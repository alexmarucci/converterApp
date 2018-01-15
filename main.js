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

 ipcMain.on('request-download', (event, video) => {
    download( video.id, video.title );
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
      win.webContents.send('clipboard-paste', clipboard.readText());
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

var YoutubeMp3Downloader = require("youtube-mp3-downloader");
 
//Configure YoutubeMp3Downloader with your settings
var YD = new YoutubeMp3Downloader({
    "ffmpegPath": "./node_modules/ffmpeg-binaries/bin/ffmpeg",        // Where is the FFmpeg binary located?
    "outputPath": "./storage",    // Where should the downloaded and encoded files be stored?
    "youtubeVideoQuality": "highest",       // What video quality should be used?
    "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
    "progressTimeout": 200                 // How long should be the interval of the progress reports
});
function download(video_id, title) {
  //Download video and save as MP3 file
  YD.download(video_id, title + '.mp3');
   
  YD.on("finished", function(err, data) {
      console.log(JSON.stringify(data));
      win.webContents.send('download-finished', data);
  });
   
  YD.on("error", function(error) {
      console.log(error);
      win.webContents.send('download-error', error);
  });
   
  YD.on("progress", function(progress) {
      console.log(JSON.stringify(progress));
      win.webContents.send('download-progress', progress);
  });
}
 