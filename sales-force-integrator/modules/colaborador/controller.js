/**
* @module Colaborador
*/
const ColaboradorSchema = require('./schema');
const log = require('../../log');
/**
 * El controlador de base de datos para mongoose del Colaborador
 * @class ColaboradorController
 */
class ColaboradorController {
	/**
	 * Busca un colaborador por id de salesforce, para prevenir duplicados
	 *
	 * @method buscarPorIdSalesforce
	 * @param {String} idSalesforce El Id para buscar
	 * @return {Promise} La promesa de ejecucion, con el resultado de la consulta
	 */
	static buscarPorIdSalesforce(idSalesforce) {
		log.info('Buscando por idSalesforce en mongo');
		return new Promise((resolve, reject) => {
			ColaboradorSchema.findOne({idSalesforce}, (err, result) => {
				if (err) {
					log.error('Error al buscar por idSalesforce en mongo', err);
					reject(err);
				} else {
					log.info('Correcto búsqueda por idSalesforce en mongo');
					resolve(result !== null ? result.toObject() : null);
				}
			});
		});
	}
	/**
	 * Guarda un Colaborador en Mongo
	 *
	 * @method guardarColaborador
	 * @param {String} colaborador El colaborador a guardar
	 * @return {Promise} La promesa de ejecucion, con el resultado del guardado
	 */
	static guardarColaborador(colaborador) {
		log.info('Buscando por idSalesforce en mongo');
		return new Promise((resolve, reject) => {
			let colab = new ColaboradorSchema(colaborador);
			colab.save((err, result) => {
				if (err) {
					log.error('Error al buscar por idSalesforce en mongo', err);
					reject(err);
				} else {
					log.info('Correcto búsqueda por idSalesforce en mongo');
					resolve(result.toObject());
				}
			});
		});
	}
	/**
	 * Actualiza un Colaborador en Mongo
	 *
	 * @method actualizarColaborador
	 * @param {String} colaborador El colaborador a guardar
	 * @return {Promise} La promesa de ejecucion, con el resultado del guardado
	 */
	static actualizarColaborador(colaborador) {
		log.info('Buscando Colaborador por actualizar');
		return new Promise((resolve, reject) => {
			ColaboradorSchema.findById(colaborador._id, (err, colabMongo) => {
				if (err) {
					log.error('Colaborador no encontrado', err);
					reject(err);
				} else {
					log.info('Correcto búsqueda por idSalesforce en mongo');
					colabMongo.idSalesforce = colaborador.idSalesforce;
					colabMongo.email = colaborador.email;
					colabMongo.nombre = colaborador.nombre;
					colabMongo.apellidos = colaborador.apellidos;
					colabMongo.ultimaFechaModificacionSalesforce = colaborador.ultimaFechaModificacionSalesforce;
					colabMongo.fechaIngreso = colaborador.fechaIngreso;
					colabMongo.fechaNacimiento = colaborador.fechaNacimiento;
					colabMongo.familiares = colaborador.familiares;
					colabMongo.area = colaborador.area;
					colabMongo.perfil = colaborador.perfil;
					colabMongo.fechaBaja = colaborador.fechaBaja;
					colabMongo.save(colaborador._id, (err, colabUpdated) => {
						if (err) {
							log.error('Error al buscar el Colaborador a actualizar', err);
							reject(err);
						} else {
							resolve(colabUpdated.toObject);
						}
					});
				}
			});
		});
	}
}

module.exports = ColaboradorController;
