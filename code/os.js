var os = require('os');
setInterval(function() {
    console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
    console.log('Up since ' + new Date(new Date().getTime() - os.uptime() * 1000));
    console.log('Load average (1m): ' + (os.loadavg()[0] * 100).toFixed(0) + '%');
}, 1000);
