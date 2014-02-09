var npm = require('npm');
var irc = require('slate-irc');
var net = require('net');
var c = require('irc-colors');

var stream = net.connect({
    port: 6667,
    host: 'irc.freenode.net'
});

var client = irc(stream);

client.nick('meow-node');
client.user('meow-node', 'Meow! The cattier alternative to purr.');

npm.load({}, function(err) {
    if (err) {
	throw err;
    }
    client.join('#node.js');
    client.join('#fez');
    client.on('message', function(data) {
        data.cmd = data.message.split(' ')[0];
        data.args = data.message.split(' ');
	data.for = data.to;
	data.nick = data.from;
	if (data.to == 'meow-node') {
	    data.for = data.from;
	}
	if (data.cmd == '!npm') {
	    if (!data.args[1]) {
		client.send(data.for, data.nick + ': Syntax: ' + c.bold.red('!npm') + ' [module] [optional: user to highlight]');
		client.send(data.for, data.nick + ': This bot was created by ' + c.bold.green('whiskers75') + ' - ' + c.blue('http://whiskers75.com') + ' | Source code: ' + c.blue('http://whiskers75.com/meow.js'));
		return;
	    }
            if (data.args[2] && data.args[2] !== 'search') {
                data.nick = data.args[2];
            }
	    npm.info(data.args[1], function(err, res) {
		if (res && (data.args[2] !== 'search')) {
		    res = res[Object.keys(res)[0]];
		    var depString = '';
		    if (res.engines && res.engines.node) {
			depString += ' (' + c.green('requires Node.js ' + res.engines.node) + ') ';
		    }
		    client.send(data.for, data.nick + ': ' + c.bold.red('[npm]') + ' ' + c.green(res.name) + ' ' + c.yellow(res.version) + ' - ' + c.gray(res.description) + depString + ' -> ' + c.blue('http://npmjs.org/package/' + res.name));
		}
		else {
                    client.send(data.for, data.nick + ': ' + c.red('Package not found.') + ' http://npmjs.org/search?q=' + data.args[1]);
		}
	    });
	}
    });
});
