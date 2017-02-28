/**
* @module Laurel
*/
const NotificacionSchema = require('./schema');
const mongoose = require('mongoose');
const log = require('../../log');
const fecha = require('./utils').fecha;
/**
 * El controlador de base de datos para mongoose del Laurel
 * @class LaurelController
 */
class NotificacionController {

	static notificacionById (id) {
		return new Promise((resolve, reject) => {
			NotificacionSchema.findById(id)
			.populate('colaborador')
			.exec((err, elem) => {
				if (err) {
					log.error('Error al buscar notificacion', err);
					reject(err);
				} else {
						resolve(fecha(elem.toObject()));
				}
			});
		});
	}

	static listarNotificaciones(idColaborador,numeroNotificaciones) {
		return new Promise((resolve, reject) => {
			let colaborador = mongoose.Types.ObjectId(idColaborador);
			idColaborador
			NotificacionSchema.find({colaborador}).sort({_id: -1}).limit(numeroNotificaciones)
			.exec((err, notificaciones) => {
				if (err) {
					log.error('Error al solicitar la lista de notificaciones', err);
					reject(err);
				} else {
					log.info('Se encontraron notificaciones');
					console.log(notificaciones.length);
						resolve(notificaciones.map(elem =>  this.notificacionById(elem._id)));
				}
			});
		});
	}

	static registrarNotificacion({idColaborador, titulo, descripcion, tipo}) {
		console.log(idColaborador);
		return new Promise((resolve, reject) => {
			let colaborador = mongoose.Types.ObjectId(idColaborador);
			let notificacion = new NotificacionSchema({colaborador,titulo,descripcion,tipo});
			notificacion.save((err, notificacion) => {
				if (err) {
					log.error('Error al registrar la notificación', err);
					reject(err);
				} else {
					log.info('Notificación registrada correctamente');
						resolve(this.notificacionById(notificacion._id));
				}
			});
		});
	}

}
module.exports = NotificacionController;