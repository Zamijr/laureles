/**
 * @module Laurel
 */
const moment = require('moment');
const NotificacionController = require('./controller');
const ColaboradorController = require('../colaborador/controller');
const log = require('../../log');

/**
 * Contiene las operaciones de control del Laurel
 * @class NotificacionType
 */
class NotificacionType {

	static listarNotificaciones(idColaborador, numeroNotificaciones) {
		return new Promise((resolve, reject) => {
			NotificacionController.listarNotificaciones(idColaborador, numeroNotificaciones).then(notificaciones => {
				log.info('Notificaciones encontradas')
				resolve(notificaciones.map(elem => elem));
			}).catch((error) => {
				log.error('Error al listar las notificaciones', error);
				reject(error);
			});
		});
	}

	static registrarNotificacion(notificacion) {
		return new Promise((resolve, reject) => {
			NotificacionController.registrarNotificacion(notificacion).then(notificacion => {
				log.info('Notificacion registrada')
				resolve(notificacion);
			}).catch((error) => {
				log.error('Error al registrar la notificacion', error);
				reject(error);
			});
		});
	}

} // Cierre de clase NotificacionType

module.exports = NotificacionType;