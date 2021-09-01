// Simple mdns browser
//   using node-mdns-js
//     github https://github.com/mdns-js/node-mdns-js
//     npm https://www.npmjs.com/package/mdns-js
//
// prepare
//    npm install mdns-js
//
// usage
//    node browser.js servicename


const mdns = require('mdns-js');

const TIMEOUT = 5000; //5 seconds

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