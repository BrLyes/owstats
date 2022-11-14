import { dialog, app, BrowserWindow, nativeTheme, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import os from 'os';

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(path.join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

let mainWindow

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/logo.png'), // tray icon
    autoHideMenuBar:true,
    width: 1600,
    height: 720,
    useContentSize: true,
    webPreferences: {
      sandbox: false,
      contextIsolation: true,
      preload                : path.resolve(__dirname,
                                            'electron-preload.js'),
    }
  });

  mainWindow.loadURL(process.env.APP_URL)

  // if (process.env.DEBUGGING) {
  //   mainWindow.webContents.openDevTools()
  // } else {
  //   mainWindow.webContents.on('devtools-opened', () => {
  //     mainWindow.webContents.closeDevTools()
  //   })
  // }

  mainWindow.on('close', () => {
    mainWindow.webContents.send('close');
  });

  mainWindow.on('closed', () => {
    mainWindow = null
  });

  mainWindow.webContents.send('created');

  mainWindow.webContents.openDevTools()

}

app.whenReady().then(() => {
  autoUpdater.autoDownload=true;
  autoUpdater.checkForUpdates();
});

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  mainWindow.webContents.send("closing");
  if (mainWindow === null) {
    createWindow()
  }
})

autoUpdater.on("update-available", (info) => {
  const dialogOpts = {
    title: 'Update available',
    message: 'An update is being downloaded, please wait. OWStats will restart automatically'
  };
  dialog.showMessageBox(dialogOpts);
});

autoUpdater.on("update-not-available", (info) => {
  app.whenReady().then(createWindow)
});


autoUpdater.on("update-downloaded", () => {
  autoUpdater.quitAndInstall();
});
