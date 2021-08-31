// Simple mdns browser
//   using node-mdns-js
//     github https://github.com/mdns-js/node-mdns-js
//     npm https://www.npmjs.com/package/mdns-js
//
// prepare
//    npm isntall mdns-js
//
// usage
//    node browser.js servicename


const mdns = require('mdns-js');

const TIMEOUT = 5000; //5 seconds

//if you have avahi or bonjour or other mdns service running on the same system
//you REALLY would like to exlude 0.0.0.0 from the interfaces bound to
//mdns.excludeInterface('0.0.0.0')

//const browser = mdns.createBrowser(); //defaults to mdns.ServiceType.wildcard
//const browser = mdns.createBrowser(mdns.tcp('googlecast'));
//const browser = mdns.createBrowser(mdns.tcp('googlezone'));

let browser = null;
if (process.argv.length > 2) {
  const service = process.argv[2];
  console.warn('service name =', service)
  browser = mdns.createBrowser(mdns.tcp(service));
}
else {
  browser = mdns.createBrowser();
}

browser.on('ready', function onReady() {
  console.warn('browser is ready');
  browser.discover();
});


browser.on('update', function onUpdate(data) {
  console.log('data:', data);
});

//stop after timeout
setTimeout(function () {
  browser.stop();
}, TIMEOUT);