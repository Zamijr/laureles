global.appRoot = require('path').resolve(__dirname);

const mongoose = require('mongoose'); 
const conf = require('./config');
const log = require('./log');
const ColaboradorType = require('./modules/colaborador/type');

let db; 
mongoose.Promise = global.Promise;

function connect () { 
	let options = { server: { socketOptions: { keepAlive: 2 } } }; 
	db = mongoose.connect(conf.mongoURL, options).connection; 
	log.info('Database connected'); 
} 
 
connect(); 

db.on('error', (error) => {
	log.error('Error en la base de datos' +  error);
})
.on('disconnected', connect) 
.once('open', () => { 
	setInterval(ColaboradorType.cargaColaboradores, process.env.TIEMPOCARGA || 2000);
});
