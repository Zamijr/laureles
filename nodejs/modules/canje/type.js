/**
 * @module Laurel
 */
const moment = require('moment');
const CanjeController = require('./controller');
const ColaboradorController = require('../colaborador/controller');
const log = require('../../log');

/**
 * Contiene las operaciones de control del Laurel
 * @class LaurelType
 */
class CanjeType {
	/**
	 * Obtiene un canje desde la base de datos por su Id.
	 * @method generarLaurel
	 * @static
	 */
	static generarCanje(idColaborador, idPremio) {
		log.info('Creando nuevo canje');
		return new Promise((resolve, reject) => {
			if(idColaborador && idColaborador !== '') {
					if(idPremio && idPremio !== null) {
					CanjeController.generarCanje(idColaborador, idPremio).then((canje) => {
						log.info('Canje generado correctamente');
						resolve(canje);
					}).catch((error) => {
						log.error('Error al crear canje en el type', error);
						reject(error);
					});
			} else {
				log.error('El canje no tiene Premio');
				throw new Error('El Id del premio es requerido');
			}
			} else {
				log.error('El canje no tiene Dueño');
				throw new Error('El Id del colaborador es requerido');
			}
		});
	}

	static historialCanjes(idColaborador) {
		log.info('Recuperando documentos de canje');
		return new Promise((resolve, reject) => {
			CanjeController.historialCanjes(idColaborador).then((listaCanjes) => {
				resolve(listaCanjes);
			}).catch((error) => {
				log.error('Error al recuperar la lista de canjes', error);
				reject(error);
			});
		});
	}

} // Cierre de clase CanjeType

module.exports = CanjeType;