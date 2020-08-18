import { app, BrowserWindow, Menu, shell, ipcMain, Tray } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9090`
  : `file://${__dirname}/index.html`

function createWindow () {

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: "/build/icons/icon.png",
    height: 720,
    width: 1000,
    maxWidth: 1000,
    maxHeight: 720,
    // frame: false,
    useContentSize: true,
    maximizable: false,
    fullscreen: false,
    title: "智慧团建解密工具",
    enableLargerThanScreen: false,
    titleBarStyle: "hidden",
    // show: false,
  })
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    // mainWindow.focus()
  })
  mainWindow.loadURL(winURL)
  mainWindow.setMenu(null) // 去掉菜单
  mainWindow.on('closed', () => {
    mainWindow = null
  })
  // mainWindow.setIcon(null)

  //创建任务栏图标、菜单
  // const tray = new Tray("D:/0VueWorkSpace/my-decryStr/src/main/icons/icon.png");
  // const trayContextMenu = Menu.buildFromTemplate([
  //   {
  //     label: '打开',
  //     click: () => {
  //       mainWindow.show();
  //     }
  //   }, {
  //     label: '退出',
  //     click: () => {
  //       app.quit();
  //     }
  //   }
  // ]);
  // tray.setToolTip('decry');
  // tray.on('click', () => {
  //   mainWindow.show();
  // });
  // tray.on('right-click', () => {
  //   tray.popUpContextMenu(trayContextMenu);
  // });
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
