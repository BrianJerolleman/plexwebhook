var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Plex Webhookinator 3000',
  description: 'Server for plex WebHook. Used for stuffs like pause/play',
  script: 'F:\\Data\\Software\\plexwebhook\\plexwebhook.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();

console.log("complete");

