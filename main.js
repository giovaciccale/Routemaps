const { app, BrowserWindow } = require('electron');
const path = require('path');
const childProcess = require('child_process');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  });

  // Cargá tu app web local
  mainWindow.loadURL('http://localhost:3000');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Ejecutá el servidor Node.js
app.whenReady().then(() => {
  childProcess.exec('node app.js', (err, stdout, stderr) => {
    if (err) {
      console.error('Error iniciando el servidor:', err);
    }
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
  });

  // Esperá un poquito antes de abrir la ventana (mientras arranca el server)
  setTimeout(createWindow, 2000);
});

app.on('window-all-closed', () => {
  app.quit();
});
