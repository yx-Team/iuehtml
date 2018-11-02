'use strict'

import { app, BrowserWindow } from 'electron'
// import cheerio from 'cheerio'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
// let loginWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    useContentSize: false,
    width: 1200,
    show: false,
    // frame: false,
    resizable: false,
    icon: '../../build/icons/256x256.png',
    backgroundColor: '#fff',
    webPreferences: {webSecurity: false}
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  // login

  // loginWindow = new BrowserWindow({
  //   useContentSize: true,
  //   frame: false,
  //   resizable: false,
  //   webPreferences: {webSecurity: false}
  // })
  // loginWindow.loadURL(winURL + '#/login')
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

// 爬虫
// const $ = cheerio.load('<h2 class="title">Hello world</h2>')

// $('h2.title').text('Hello there!')
// $('h2').addClass('welcome')

// console.log($.html())
