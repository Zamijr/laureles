const bunyan = require('bunyan');

const app = 'laurelesNode';

const Logger = bunyan.createLogger({
	name: 'laureles',
	level: 'debug',
	streams: [
		{
			level: 'debug',
			stream: process.stdout            // log INFO and above to stdout
		},
		{
			type: 'rotating-file',
			period: '2w',
			level: 'info',
			count: 3,
			path: global.appRoot.concat('/log/').concat(app).concat('-info.log')   // log INFO and above to stdout
		},
		{
			type: 'rotating-file',
			period: '3w',
			level: 'error',
			count: 5,
			path: global.appRoot.concat('/log/').concat(app).concat('-error.log')  // log ERROR and above to a file
		}
	]
});

module.exports = Logger;
