// Simple mdns browser
//   using node-mdns-js
//     github https://github.com/mdns-js/node-mdns-js
//     npm https://www.npmjs.com/package/mdns-js
//
// prepare
//    npm isntall mdns-js
//
// usage
//    node browser_googlezone.js


const mdns = require('mdns-js');

const TIMEOUT = 5000; //5 seconds


//const browser = mdns.createBrowser(); //defaults to mdns.ServiceType.wildcard
//const browser = mdns.createBrowser(mdns.tcp('googlecast'));
const browser = mdns.createBrowser(mdns.tcp('googlezone'));

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