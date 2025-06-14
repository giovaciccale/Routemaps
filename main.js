const { app, BrowserWindow } = require('electron');
const path = require('path');
const childProcess = require('child_process');
const waitOn = require('wait-on');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true
    }
  });

  mainWindow.loadURL('http://localhost:3000');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  // Ejecutá el servidor backend
  const serverProcess = childProcess.exec('node app.js', (err, stdout, stderr) => {
    if (err) {
      console.error('Error iniciando el servidor:', err);
    }
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
  });

  // Esperá hasta que el puerto 3000 esté disponible
  waitOn({ resources: ['http://localhost:3000'], timeout: 10000 }, (err) => {
    if (err) {
      console.error('El servidor no respondió a tiempo:', err);
    } else {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
