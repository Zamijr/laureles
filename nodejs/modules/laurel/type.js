/**
 * @module Laurel
 */
const moment = require('moment');
const LaurelController = require('./controller');
const ColaboradorController = require('../colaborador/controller');
const log = require('../../log');
const {cambiaFechasLaurel} = require('./utils');
const cron = require('cron');

/**
 * Contiene las operaciones de control del Laurel
 * @class LaurelType
 */
class LaurelType {
	/**
	 * Obtiene un laurel desde la base de datos por su Id.
	 * @method buscarLaurelPorId
	 * @static
	 */
	static buscarLaurelPorId(idLaurel) {
		log.info('Búscando Laurel');
		return new Promise((resolve, reject) => {
			LaurelController.buscarLaurelPorId(idLaurel).then((laurel) => {
				log.info('Laurel encontrado');
				resolve(laurel !== null ? cambiaFechasLaurel(laurel.toObject()) : laurel);
			}).catch((error) => {
				log.error('Error al buscar el laurel en el type', error);
				reject(error);
			});
		});
	}

	static ultimosLaurelesEntregados(limiteLaureles) {
		log.info('Búscando Laurel');
		return new Promise((resolve, reject) => {
			LaurelController.ultimosLaurelesEntregados(limiteLaureles).then((laureles) => {
				log.info('Laurel encontrado');
				resolve(laureles.map(elem => {
					return elem.toObject();
				}));
			}).catch((error) => {
				log.error('Error al buscar el laurel en el type', error);
				reject(error);
			});
		});
	}

	static generarLaurel(idColaborador, fechaCaducidad) {
		log.info('Creando nuevo laurel');
		return new Promise((resolve, reject) => {
			if(idColaborador && idColaborador !== '') {
				if(fechaCaducidad && fechaCaducidad !== null) {
					let fechaCaducidadLaurel = moment(fechaCaducidad, 'D/M/YYYY');
					LaurelController.generarLaurel(idColaborador, fechaCaducidadLaurel).then((laurel) => {
						log.info('Laurel generado correctamente');
						resolve(this.buscarLaurelPorId(laurel.toObject()._id.toString()));
					}).catch((error) => {
						log.error('Error al crear laurel en el type', error);
						reject(error);
					});
				} else {
					log.error('El laurel no tiene fecha final');
					throw new Error('Se debe agregar la fecha final de vigencia del laurel');
				}
			} else {
				log.error('El laurel no tiene Dueño');
				throw new Error('El Id del colaborador es requerido');
			}
		});
	}

	static entregarLaurel(laurel, colaborador, valor, descripcion) {
		return new Promise((resolve, reject) => {
			LaurelController.entregarLaurel(laurel, colaborador, valor, descripcion).then((laurelEntregado) => {
				resolve(this.buscarLaurelPorId(laurelEntregado));
			}).catch((error) => {
				reject(error);
			});
		});
	}

	static buscarLaurelPorEntregar(colaborador) {
		return new Promise((resolve, reject) => {
			LaurelController.buscarLaurelPorEntregar(colaborador).then((laurel) => {
				resolve(this.buscarLaurelPorId(laurel));
			}).catch((error) => {
				reject(error);
			});
		});
	}
	/**
	 * Administra el proceso de busqueda de laureles por aprobar,
	 * de momento sirve como puente entre el controllador y el schema de Graphql.
	 *
	 * @method buscarLaurelesPorAprobar
	 */
	static buscarLaurelesPorAprobar() {
		return LaurelController.buscarLaurelesPorAprobar();
	}
	/**
	* Aprueba un Laurel.
	*
	* @method aprobarLaurel
	* @param {String} idLaurel El id del laurel a aprobar.
	* @return {Promise} Returns El LaurelSchema actualizado.
	*/
	static aprobarLaurel(idLaurel) {
		return new Promise((resolve, reject) => {
			LaurelController.buscarLaurelPorRechazarAporbar(idLaurel).then(laurelEncontrado => {
				if(laurelEncontrado !== null) {
					laurelEncontrado.aprobado =true;
					laurelEncontrado.fechaAprobacion = new Date();
					LaurelController.actualizaLaurel(laurelEncontrado).then(laurelActualizado => {
						resolve(laurelActualizado.toObject());
					}).catch((error) => {
						reject(error);
					});
				} else {
					throw new Error('El Laurel no existe o ya esta aprobado o ya esta rechazado');
				}
			}).catch((error) => {
				reject(error);
			});
		});
	}
	/**
	 * Rechaza un Laurel y genera uno nuevo.
	 *
	 * @method rechazarLaurel
	 * @param {String} idLaurel El id del laurel a rechazar.
	 * @param {String} mensajeRechazo El mensaje del porque se rechaza el laurel.
	 * @return {Promise} Returns El LaurelSchema creado.
	 */
	static rechazarLaurel(idLaurel, mensajeRechazo) {
		return new Promise((resolve, reject) => {
			if(mensajeRechazo !== null && mensajeRechazo !== '') {
				LaurelController.buscarLaurelPorRechazarAporbar(idLaurel).then(laurelEncontrado => {
					if(laurelEncontrado !== null) {
						laurelEncontrado.mensajeRechazo = mensajeRechazo;
						laurelEncontrado.aprobado = false;
						laurelEncontrado.fechaAprobacion = new Date();
						LaurelController.actualizaLaurel(laurelEncontrado).then(laurelActualizado => {
							ColaboradorController.buscarPorId(laurelActualizado.duenio).then(colaborador => {
								LaurelController.generarLaurel(colaborador._id,
								laurelActualizado.fechaCaducidad).then(laurelNuevo =>{
									if(laurelNuevo !== null) {
										resolve(laurelNuevo.toObject());
									} else {
										throw new Error('No se puede generar el laurel');
									}
								}).catch((error) => {
									reject(error);
								});
							}).catch(error => {
								reject(error);
							});
						}).catch((error) => {
							reject(error);
						});
					} else {
						throw new Error('El Laurel no existe o ya esta aprobado o ya esta rechazado');
					}
				}).catch((error) => {
					reject(error);
				});
			} else {
				throw new Error('El mensaje de Rechazo es requerido');
			}
		});
	}
	/**
	 * Asignara laureles a todos los colaboradores
	 *
	 * @method asignarLaureles
	 * @param {String} numeroLaureles El numero de laureles que se asignaran.
	 * @param {Int} periodo Numero de meses para el periodo del laurel.
	 * @return {Promise} Returns El LaurelSchema creado.
	 */
	static asignarLaurelesTodos(numeroLaureles, periodo) {
		let mesactual = moment().month()+periodo;
		let caducidad = moment([2017, mesactual, 20]);
		return new Promise((resolve, reject) => {
			ColaboradorController.buscarTodoslosColaboradores().then(colaboradoresEncontrados => {
				if(colaboradoresEncontrados !== null) {
					for(let i=0; i<colaboradoresEncontrados.length; i++) {
						for(let j=0; j<numeroLaureles;j++) {
							ColaboradorController.buscarColaboradorPorAsignar(colaboradoresEncontrados[i]._id)
							.then(() => {
								LaurelController.generarLaurel(colaboradoresEncontrados[i]._id, caducidad)
								.then(laurelNuevo => {
									if(laurelNuevo !== null) {
										resolve(laurelNuevo.toObject());
									} else {
										throw new Error('No se puede generar el laurel');
									}
								}).catch((error) => {
									reject(error);
								});
							}).catch(error => {
								reject(error);
							});
						}
					}
				} else {
					throw new Error('No se encontraron los colaboradores');
				}
			}).catch((error) => {
				reject(error);
			});
		});
	}
	/**
	* Cron que automatiza la asignacion de los laureles a Todos los colaboradores.
	*
	* @method cronAsignarLaureles
	* @param {String} numeroLaureles El numero de laureles que se asignaran.
	* @param {Int} periodo Numero de meses para el periodo del laurel.
	*/
	static cronAsignarLaureles(numeroLaureles, periodo) {
		LaurelType.asignarLaurelesTodos(numeroLaureles, periodo);
		let mesactual = moment().month()+1;
		let caducidad = moment([2017, mesactual, 1]).add(1, 'M').subtract(1, 'd');
		let cronfecha = caducidad.format('ss mm HH DD MM YYYY');
		let cronJob = cron.job(cronfecha, function() {
			LaurelType.asignarLaurelesTodos(numeroLaureles, periodo);
		});
		cronJob.start();
	}
/**
	 * Asignara laureles a los colaboradores
	 *
	 * @method asignarLaureles
	 * @param {String} [colaboradores] Es el arreglo de colaboradores.
	 * @param {String} numeroLaureles El numero de laureles que se asignaran.
	 * @return {Promise} Returns El LaurelSchema creado.
	 */
	static asignarLaureles(colaboradores, numeroLaureles) {
		return new Promise((resolve, reject) => {
			for (let i=0; i<colaboradores.length; i++) {
				for (let j=0; j<numeroLaureles; j++) {
					ColaboradorController.buscarColaboradorPorAsignar(colaboradores[i]._id)
					.then(colaborador => {
						LaurelController.generarLaurel(colaborador, new Date()).then(laurelNuevo =>{
							if(laurelNuevo !== null) {
								resolve(laurelNuevo.toObject());
							} else {
								throw new Error('No se puede generar el laurel');
							}
						}).catch((error) => {
							reject(error);
						});
					}).catch(error => {
						reject(error);
					});
				}
			}
		});
	}

	/**
	 * Regresa los objetos laurel de mongo con estado aprobado en que el usuario es el colaborador
	 *
	 * @method laurelesRecibidos
	 * @param {String} colaborador Cadena ID del usuario actual.
	 * @return {Promise} Returns Arreglo de objetos laurel.
	 */
	static laurelesRecibidos(idColaborador) {
		return new Promise((resolve, reject) => {
			LaurelController.laurelesRecibidos(idColaborador).then(laureles =>{
				resolve(laureles.map(item=>item.toObject()));
			}).catch((error) => {
				reject(error);
			});
		});
	}
	/**
	 * Regresa el objeto de los laureles entregados.
	 *
	 * @method laurelesEntregados
	 * @param {string} idColaborador Es el id del colaborador actual.
	 * @return {Promise} Regresa el Arreglo de los objetos laureles.
	 */
	static laurelesEntregados(idColaborador) {
		return new Promise((resolve, reject) => {
			LaurelController.laurelesEntregados(idColaborador).then(laureles =>{
				resolve(laureles.map(item=>item.toObject()));
			}).catch((error) => {
				reject(error);
			});
		});
	}
	/**
	 * Metodo para ver los laureles que el colaborador tiene por canjear.
	 *
	 * @method laurelesPorCanjear
	 * @param {String} colaborador Cadena ID del usuario actual.
	 * @return {Promise} Returns Arreglo de objetos laurel.
	 */
	static laurelesPorCanjear(idColaborador) {
		return new Promise((resolve, reject) => {
			LaurelController.laurelesPorCanjear(idColaborador).then(laureles =>{
				resolve(laureles.map(item=>item.toObject()));
			}).catch((error) => {
				reject(error);
			});
		});
	}

} // Cierre de clase LaurelType

module.exports = LaurelType;
