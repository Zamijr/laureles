/**
* @module Laurel
*/
const LaurelSchema = require('./schema');
const mongoose = require('mongoose');
const log = require('../../log');
const moment = require('moment');
/**
 * El controlador de base de datos para mongoose del Laurel
 * @class LaurelController
 */
class LaurelController {

	static buscarLaurelPorId(idLaurel) {
		log.info('Buscando laurel en mongo');
		return new Promise((resolve, reject) => {
			LaurelSchema.findById(idLaurel)
			.populate('duenio')
			.populate('colaborador')
			.populate('valor')
			.exec((err, laurel) => {
				if (err) {
					log.error('Error no se puede encontrar el laurel en mongo', err);
					reject(err);
				} else {
					log.info('Correcto el laurel se encontro');
					resolve(laurel);
				}
			});
		});
	}

	/*
	*	buscarLaurelPorEntregar
	*	Recupera un documento que no esté vencido
	*/

	static buscarLaurelPorEntregar(idColaborador) {
		log.info('Buscando laurel en mongo');
		return new Promise((resolve, reject) => {
			let duenio = mongoose.Types.ObjectId(idColaborador);
			LaurelSchema.find({duenio, valor: null, fechaCaducidad: {$gte: new Date()}}).sort({_id: 1}).limit(1)
			.exec((err, laurel) => {
				if (err) {
					log.error('Error no se puede encontrar el laurel en mongo', err);
					reject(err);
				} else {
					log.info('Correcto el laurel se encontro');
					resolve(laurel[0]);
				}
			});
		});
	}
	/**
	 * Crea un nuevo laurel para un colaborador.
	 * @method generarLaurel
	 * @param {ColaboradorSchema} colaborador La información del colaborador al que se le quiere asignar un Laurel.
	 * @param {Date} caducidad Representan la fecha en la que el laurel ya no se puede asignar.
	 * @return {Promise} Returns La promesa con el LaurelSchema creado.
	 */
	static generarLaurel(duenio, fechaFinal) {
		log.info('Generando nuevo laurel en mongo');
		return new Promise((resolve, reject) => {
			let nuevoLaurel = new LaurelSchema();
			nuevoLaurel.duenio = mongoose.Types.ObjectId(duenio);
			nuevoLaurel.fechaCaducidad = fechaFinal;
			nuevoLaurel.fechaGeneracion = new Date();
			nuevoLaurel.save((err, laurel) => {
				if (err) {
					log.error('Error no se puede guardar el laurel en mongo', err);
					reject(err);
				} else {
					log.info('Laurel creado correctamente');
					resolve(laurel);
				}
			});
		});
	}

	static entregarLaurel(laurel, colaborador, valor, descripcion) {
		log.info('Entregando laurel');
		return new Promise((resolve, reject) => {
			log.info('Buscando laurel');
			LaurelSchema.findById(laurel, (err, laurelEncontrado) => {
				if (err) {
					log.error('No se encuentra el laurel solicitado', err);
					reject(err);
				} else {
					log.info('LaurelEncontrado');
					laurelEncontrado.colaborador = mongoose.Types.ObjectId(colaborador);
					laurelEncontrado.valor = mongoose.Types.ObjectId(valor);
					laurelEncontrado.fechaEntrega = new Date();
					laurelEncontrado.entregado = true;
					laurelEncontrado.aprobado = false;
					laurelEncontrado.descripcion = descripcion.split('/!/');
					log.info('Actualizando Laurel');
					laurelEncontrado.save((err, laurelGuardado) => {
						if(err) {
							log.error('No se puede guardar el Laurel', err);
						} else {
							log.info('Laurel Entregado');
							resolve(laurelGuardado);
						}
					});
				}
			});
		});
	}

	static ultimosLaurelesEntregados(limiteLaureles) {
		log.info(`Obteniendo los ultimos ${limiteLaureles} laureles`);
		return new Promise((resolve, reject) => {
			LaurelSchema
			.find({aprobado: true})
			.sort({fechaAprobacion: -1})
			.populate('duenio')
			.populate('colaborador')
			.populate('valor')
			.limit(limiteLaureles)
			.exec((err, laureles) => {
				if (err) {
					log.error('No se pueden consultar los laureles', err);
					reject(err);
				} else {
					log.info(`Se encontraron ${laureles.length} laureles`);
					resolve(laureles);
				}
			});
		});
	}

	static laurelesPorEntregar(idColaborador) {
		return new Promise((resolve, reject) => {
			LaurelSchema.find({duenio: idColaborador, fechaEntrega: null})
			.populate('duenio')
			.populate('colaborador')
			.populate('valor')
			.exec((err, laureles) => {
				if (err) {
					log.error('Error no se pudo encontrar un laurel en mongo', err);
					reject(err);
				} else {
					log.info('Se encontraron laureles por entregar');
					resolve(laureles);
				}
			});
		});
	}

	static laurelesPorCanjear(idColaborador) {
		return new Promise((resolve, reject) => {
			LaurelSchema.find({colaborador: idColaborador, aprobado: true, canjeado: false})
			.populate('duenio')
			.populate('colaborador')
			.populate('valor')
			.exec((err, laureles) => {
				if (err) {
					log.error('Error no se pudo encontrar un laurel en mongo', err);
					reject(err);
				} else {
					log.info('Se encontraron laureles por canjear');
					resolve(laureles);
				}
			});
		});
	}

	static laurelesRecibidos(idColaborador) {
		return new Promise((resolve, reject) => {
			LaurelSchema.find({colaborador: (idColaborador), aprobado: true})
			.populate('duenio')
			.populate('colaborador')
			.populate('valor')
			.exec((err, laureles) => {
				if (err) {
					log.error('Error no se encontró la lista de laureles recibidos', err);
					reject(err);
				} else {
					log.info('Se encontraron laureles recibidos');
					resolve(laureles);
				}
			});
		});
	}

	static laurelesEntregados(idColaborador) {
		return new Promise((resolve, reject) => {
			LaurelSchema.find({duenio: idColaborador, aprobado: true})
			.populate('duenio')
			.populate('colaborador')
			.populate('valor')
			.exec((err, laureles) => {
				if (err) {
					log.error('Error no se encontró un laurel en mongo', err);
					reject(err);
				} else {
					log.info('Se encontraron laureles entregados');
					resolve(laureles);
				}
			});
		});
	}
	/**
	 * Busca todos los laureles por aprobar en mongo.
	 *
	 * @method buscarLaurelesPorAprobar
	 * @return {Promise} La promesa de ejecucion, con el resultado de la busqueda.
	 */
	static buscarLaurelesPorAprobar() {
		log.info('Buscando laureles por aprobar');
		return new Promise((resolve, reject) => {
			LaurelSchema.find({ fechaAprobacion: null, entregado: true})
			.populate('duenio')
			.populate('colaborador')
			.populate('valor')
			.exec((error, laureles) => {
				if(error) {
					log.error('Error al buscar los laureles por aprobar', error);
					reject(error);
				} else {
					log.info('Laureles encontrador por aprobar');
					resolve(laureles.map(elemento => {
						return elemento.toObject();
					}));
				}
			});
		});
	}
	/**
	 * Busca un laurel que este en estatus por Aprobar.
	 *
	 * @method buscarLaurelPorRechazarAporbar
	 * @param {String} idLaurel El id del laurel a buscar.
	 * @return {Promise} Returns La promesa con el LaurelSchema creado.
	 */
	static buscarLaurelPorRechazarAporbar(idLaurel) {
		log.info('Buscando Laurel en mongo');
		return new Promise((resolve, reject) => {
			LaurelSchema.findOne({_id: idLaurel, fechaAprobacion: null, entregado: true})
			.exec((error, laurel) => {
				if (error) {
					log.error('Error no se puede encontrar el laurel en mongo', error);
					reject(error);
				} else {
					log.info('Laurel encontrado correctamente');
					resolve(laurel);
				}
			});
		});
	}
	/**
	* Actualiza un laurel el mongo.
	*
	* @method actualizaLaurel
	* @param {LaurelSchema} laurel El laurel a actualizar.
	* @return {Promise} Returns La promesa de ejecucion con el laurel actualizado.
	*/
	static actualizaLaurel(laurel) {
		return new Promise((resolve, reject) => {
			laurel.save(laurel, (err, laurelActualizado) => {
				if (err) {
					log.error('Error no se puede actualizar el laurel en mongo', err);
					reject(err);
				} else {
					log.info('Laurel actualizado correctamente');
					resolve(laurelActualizado);
				}
			});
		});
	}

}

module.exports = LaurelController;
