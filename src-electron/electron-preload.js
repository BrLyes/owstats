//Requires
const {spawn}                      = require('child_process');
const fs                           = require('fs');
const loadIniFile                  = require('read-ini-file')
const {contextBridge, ipcRenderer} = require('electron')

//Paths
const latestJson = 'tracker/latest.json';
const trackerExe = 'tracker.exe';
const configIni  = 'tracker/config.ini';

//Read config.ini and fetch [tesseract]EXE_LOCATION
const config       = loadIniFile.sync(configIni)
const tesseractExe = config.tesseract.EXE_LOCATION;
let tracker        = null;

//Filewatch for latest.json
fs.watchFile(latestJson, () =>
{
  window.postMessage('update', '*');
});

//Context bridge
contextBridge.exposeInMainWorld('tracker', {
  checkReqs   : () =>
    {
      return fs.existsSync(tesseractExe);
    },
  getLatest   : () =>
    {
      return fs.existsSync(latestJson) ?
             JSON.parse(fs.readFileSync(latestJson)) :
             null;
    },
  deleteLatest: () =>
    {
      return fs.unlinkSync(latestJson);
    }
})


ipcRenderer.on('close', () =>
{
  tracker.stdin.pause();
  tracker.kill();
  tracker = null;
  console.log("tracker stopped");
});

ipcRenderer.on('created', () =>
{
  tracker = spawn('.\\' + trackerExe, [], {cwd: 'tracker/'});
  tracker.stdout.on('data', (data) =>
  {
    console.log(data.toString());
  })
  tracker.stderr.on('data', (data) =>
  {
    console.log(data.toString());
  })
});
