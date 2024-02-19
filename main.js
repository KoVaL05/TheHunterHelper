const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('node:path');
const fs = require('fs');

const createWindow = function(){
    const win = new BrowserWindow({
        width: 1100,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'src/preload.js')
        }
    });
    win.loadFile('src/GUI/main.html');
};

const createAmmoWindow = function(data, width, height){
    const ammo = new BrowserWindow({
        width: width,
        height: height,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'src/ammopreload.js'),
        }
    });
    ammo.loadFile('src/GUI/ammo.html');

    ammo.webContents.send('send-data-to-ammo', data);
}

app.whenReady().then(function(){
    createWindow();
});

function ammowindowsize(json, caliber){
    var width = 300;
    var height = 380;
    const data = json.filter(ammo => ammo.caliber === caliber);
    if(data.length > 1){
        width *= data.length;
    }
    return { retdata: data, width: width, height: height };
};


ipcMain.on('open-ammo-window', function(_event, data){
    const filePath = path.join(app.getAppPath(), 'src/json/ammunition.json');

    fs.readFile(filePath, 'utf8', (err, fileData) => {
        if (err) {
            console.error('Error reading the JSON file:', err);
            return;
        }

        try {
            const json = JSON.parse(fileData);
            const {retdata, width, height} = ammowindowsize(json, data);
            createAmmoWindow(retdata, width, height);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
});

app.on('window-all-closed', function(){
    if(process.platform !== 'darwin') app.quit()
});