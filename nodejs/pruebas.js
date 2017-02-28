global.appRoot = require('path').resolve(__dirname);

const mongoose = require('mongoose');
const conf = require('./config');
const log = require('./log');

const moment = require('moment');

const {schema, root} = require('./modules');

const LaurelType = require('./modules/laurel/type');
const ColaboradorType = require('./modules/colaborador/type');


const {graphql} = require('graphql');

let db;

function connect () {
	let options = { server: { socketOptions: { keepAlive: 2 } } };
	db = mongoose.connect(conf.db, options).connection;
	log.info('Database connected');
}

connect();

db.on('error', (error) => {
	log.error('Error en la base de datos' +  error);
})
.once('open', () => {

		/*LaurelType.aprobarLaurel('58868a51a6d77a2f084f6e10').then(function(data) {
			console.log('Responde: ', data)
		}).catch(function(error) {
			console.log('Error: ', error)
		});*/

//en el add(mes que le piquen al radiobutton,'M')
// mesactual es el mes actual para calcular la fecha
//[año, mes, día, hora, minutos]

		//	let mesactual = moment().month()+1;
		//	let caducidad = moment([2017,mesactual,1]).add(20,'d').subtract(1,'d');
			/*let mesactual = moment().month()+1;
			let caducidad = moment([2017, mesactual, 1]).add(1,'M').subtract(1,'d');
			let cronfecha = caducidad.format('ss 50 HH DD MM YYYY');
			console.log(cronfecha);
			console.log(caducidad);
			console.log(mesactual);*/

			let año = moment().year();
			console.log(año);
			let caducidad = moment().toObject();
			console.log(caducidad);
		/*	cronfecha = '0 * * * * *';
			let cron = require('cron');
				let cronJob = cron.job(cronfecha, function(){
						console.info('cron job completed');
				});
				cronJob.start();
*/
	});
