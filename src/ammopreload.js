const { contextBridge, ipcRenderer } = require('electron');
var data = ''
ipcRenderer.on('send-data-to-ammo', (evt, arg) => {
    data = arg;
})
contextBridge.exposeInMainWorld('api', {
  getCaliber: function(){
        return data
    }
});
