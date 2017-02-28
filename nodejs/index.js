global.appRoot = require('path').resolve(__dirname);

const mongoose = require('mongoose');
const conf = require('./config');
const web = require('./web');
const log = require('./log');

let db;
mongoose.Promise = global.Promise;


const PORT = process.env.PORT || 8000;

function connect () {
	let options = { server: { socketOptions: { keepAlive: 2 } } };
	db = mongoose.connect(conf.db, options).connection;
	log.info('Database connected');
}

connect();

db.on('error', (error) => {
	log.error('Error en la base de datos' +  error);
})
.on('disconnected', connect)
.once('open', () => {
	web.listen(PORT);
});
