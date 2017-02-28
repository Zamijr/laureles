/**
 * @module Colaborador
 */
const ColaboradorSchema = require('./schema');
const log = require('../../log');
/**
 * El controlador de base de datos para Colaborador.
 * @class ColaboradorController
 */
class ColaboradorController {
	/**
	 * Obtiene el colaborador por ID de colaborador.
	 * @method buscarPorId
	 * @param {String} idColaborador El id del colaborador
	 * @return {Promise} Returns La promesa con el colaborador encontrado, null si no se encuentra
	 */
	static buscarPorId(idColaborador) {
		log.info('Buscando colaborador por id en mongo');
		return new Promise((resolve, reject) => {
			ColaboradorSchema.findById(idColaborador, (err, result) => {
				if (err) {
					log.error('Error al buscar el colaborador por id en mongo', err);
					reject(err);
				} else {
					log.info('Correcto búsqueda del colaborador por id en mongo');
					resolve(result);
				}
			});
		});
	}

	static buacarColaboradoresPorNombre(nombre) {
		log.info('Buscando colaborador por nombre en mongo');
		return new Promise((resolve, reject) => {
			ColaboradorSchema.find({$or: [{nombre: {$regex: new RegExp(nombre, 'i')}},
					{apellidos: {$regex: new RegExp(nombre, 'i')}}]}, (err, result) => {
				if (err) {
					log.error('Error al buscar el colaborador por nombre en mongo', err);
					reject(err);
				} else {
					log.info('Correcta búsqueda del colaborador por nombre en mongo');
					resolve(result);
				}
			});
		});
	}

	static buscarColaboradoresPorEmail(email) {
		log.info('Buscando por email en mongo');
		return new Promise((resolve, reject) => {
			ColaboradorSchema.find({email: {$regex: new RegExp(email, 'i')}}, (err, result) => {
				if (err) {
					log.error('Error al buscar por email en mongo', err);
					reject(err);
				} else {
					log.info('Correcto busqueda por email en mongo');
					resolve(result);
				}
			});
		});
	}
	/**
	 * Obtiene el colaborador por email de colaborador.
	 * @method buscarPorEmail
	 * @param {String} email El email del colaborador
	 * @return {Promise} Returns La promesa con el colaborador encontrado, null si no se encuentra
	 */
	static buscarPorEmail(email) {
		log.info('Buscando por email en mongo');
		return new Promise((resolve, reject) => {
			ColaboradorSchema.findOne({email: email}, (err, result) => {
				if (err) {
					log.error('Error al buscar por email en mongo', err);
					reject(err);
				} else {
					log.info('Correcto busqueda por email en mongo');
					resolve(result);
				}
			});
		});
	}
	/**
	* Busca todos los colaboradores activos.
	*
	* @method buscarTodoslosColaboradores
	* @return {Promise} Returns La promesa de ejecucion con los colaboradores.
	*/
	static buscarTodoslosColaboradores() {
		log.info('Buscando todos los colaboradores');
		return new Promise((resolve, reject) => {
			ColaboradorSchema.find({ fechaBaja: null})
			.exec((error, colaboradores) => {
				if(error) {
					log.error('Error al buscar los colaboradores', error);
					reject(error);
				} else {
					log.info('Colaboradores encontrados');
					resolve(colaboradores.map(elemento => {
						return elemento.toObject();
					}));
				}
			});
		});
	}
	/**
	 * Busca un colaborador que este activo, para asignarle laureles.
	 *
	 * @method buscarColaboradorPorAsignar
	 * @param {String} idLaurel El id del colaborador a buscar.
	 * @return {Promise} Returns La promesa con el ColaboradorSchema creado.
	 */
	static buscarColaboradorPorAsignar(idColaborador) {
		log.info('Buscando Colaborador en mongo');
		return new Promise((resolve, reject) => {
			ColaboradorSchema.findOne({_id: idColaborador, fechaBaja: ''})
			.exec((error, colaborador) => {
				if (error) {
					log.error('Error no se puede encontrar el colaborador', error);
					reject(error);
				} else {
					log.info('Colaborador encontrado correctamente');
					resolve(colaborador);
				}
			});
		});
	}

	static actualizaFotoColaborador(idColaborador, urlFoto) {
		return new Promise((resolve, reject) => {
			ColaboradorSchema.findById(idColaborador).exec((err, ColaboradorEncontrado) => {
				if (err) {
					log.error('No se encuentra el colaborador solicitado', err);
					reject(err);
				} else {
					ColaboradorEncontrado.urlFoto = urlFoto;
					ColaboradorEncontrado.save((err, ColaboradorEncontrado) => {
						if (err) {
							log.error('Error no se puede guardar el laurel en mongo', err);
							reject(err);
						} else {
							log.info('Colaborador actualizado');
							resolve(ColaboradorEncontrado);
						}
					});
				}
			});
		});
	}

	static actualizaRolColaborador(idColaborador, rol) {
		return new Promise((resolve, reject) => {
			ColaboradorSchema.findById(idColaborador).exec((err, ColaboradorEncontrado) => {
				if (err) {
					log.error('No se encuentra el colaborador solicitado', err);
					reject(err);
				} else {
					ColaboradorEncontrado.rol = rol;
					ColaboradorEncontrado.save((err, ColaboradorEncontrado) => {
						if (err) {
							log.error('Error no se puede guardar el laurel en mongo', err);
							reject(err);
						} else {
							log.info('Colaborador actualizado');
							resolve(ColaboradorEncontrado);
						}
					});
				}
			});
		});
	}

}

module.exports = ColaboradorController;
