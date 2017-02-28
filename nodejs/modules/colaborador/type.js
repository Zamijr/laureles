/**
 * @module Colaborador
 */
const ColaboradorController = require('./controller');
const log = require('../../log');
const {obtenerLaureles} = require('./utils');
/**
 * El objeto que resuelve los tipos para graphql, tambien aplica logica de negocio.
 * @class ColaboradorType
 */
class ColaboradorType {

	static buscarColaboradorPorId(idColaborador) {
		return new Promise((resolve, reject) => {
			if(idColaborador !== null && idColaborador !== '') {
				ColaboradorController.buscarPorId(idColaborador).then(colaborador => {
					resolve(colaborador);
				}).catch((error) => {
					log.error('Error al buscar el colaborador en el type', error);
					reject(error);
				});
			} else {
				throw new Error('El Id es requerido');
			}
		});
	}
	/**
	 * Obtiene un solo colaborador por su email.
	 * @method buscarColaboradorPorEmail
	 * @param {String} email El email del colaborador
	 * @return {Promise} Returns La promesa que resuelve el colaborador encontrado
	 * @throws {Error} Cuando no se encuentra el colaborador
	 */
	static registrarUsuario(email, foto) {
		return new Promise((resolve, reject) => {
			if(email !== null && email !== '') {
				ColaboradorController.buscarPorEmail(email).then(obtenerLaureles).then(response => {
					let {colaborador, laurelesPorEntregar, laurelesRecibidos,
						laurelesEntregados, laurelesPorCanjear} = response;
					if(colaborador !== null) {
						let retColaborador = colaborador.toObject();
						retColaborador.foto = foto;
						retColaborador.laurelesPorEntregar = laurelesPorEntregar;
						retColaborador.laurelesRecibidos = laurelesRecibidos;
						retColaborador.laurelesEntregados = laurelesEntregados;
						retColaborador.laurelesPorCanjear = laurelesPorCanjear;
						resolve(retColaborador);
					} else {
						throw new Error('El email no es valido');
					}
				}).catch((error) => {
					log.error('Error al buscar el colaborador en el type', error);
					reject(error);
				});
			} else {
				throw new Error('El Id es requerido');
			}
		});
	}

	static buscarColaboradores(nombre, email) {
		return new Promise((resolve, reject) => {
			if(nombre !== null && nombre !== '') {
				ColaboradorController.buacarColaboradoresPorNombre(nombre).then((colaboradores) => {
					log.info('Correcto al buscar por nombre');
					resolve(colaboradores.map(elem => {
						return elem.toObject();
					}));
				}).catch((error) => {
					log.error('Error al buscar el colaborador en el type', error);
					reject(error);
				});
			} else {
				if(email !== null && email !== '') {
					ColaboradorController.buscarColaboradoresPorEmail(email).then((colaboradores) => {
						log.info('Correcto al buscar por nombre');
						resolve(colaboradores.map(elem => {
							return elem.toObject();
						}));
					}).catch((error) => {
						log.error('Error al buscar el colaborador en el type', error);
						reject(error);
					});
				} else {
					throw new Error('El nombre o el email son requeridos');
				}
			}
		});
	}
	/**
	 * Administra el proceso de busqueda de laureles por aprobar,
	 * de momento sirve como puente entre el controllador y el schema de Graphql.
	 *
	 * @method buscarLaurelesPorAprobar
	 */
	static buscarTodoslosColaboradores() {
		return ColaboradorController.buscarTodoslosColaboradores();
	}

	static actualizaFotoColaborador(idColaborador, urlFoto) {
		return ColaboradorController.actualizaFotoColaborador(idColaborador, urlFoto);
	}

	static actualizaRolColaborador(idColaborador, rol) {
		return ColaboradorController.actualizaRolColaborador(idColaborador, rol);
	}
}

module.exports = ColaboradorType;
