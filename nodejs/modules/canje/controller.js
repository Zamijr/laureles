/**
* @module Canje
*/
const CanjeSchema = require('./schema');
const LaurelController = require('../laurel/controller');
const PremioController = require('../catalogos/controller');
const mongoose = require('mongoose');
const log = require('../../log');
const moment = require('moment');
/**
 * El controlador de base de datos para mongoose del canje
 * @class CanjeController
 */
class CanjeController {

	/*
	*	Genera un documento de canje, haciendo una búsqueda de los laureles más antiguos por ser canjeados.
	*	
	* @method generarCanje
	*/

	static generarCanje(idColaborador, idPremio) {
		log.info('Inicia proceso de canje');
		return new Promise((resolve, reject) => {
			PremioController.getPremioById(idPremio).then(premio => {
				LaurelController.laurelesPorCanjear(idColaborador).then(laureles =>{
					if(laureles.length >= premio.costo) {
						let idsLaureles = [];
						for (let i in laureles) {
							laureles[i].canjeado = true;
							laureles[i].save();
							idsLaureles.push(mongoose.Types.ObjectId(laureles[i]._id));
						}
						let duenio = mongoose.Types.ObjectId(idColaborador);
						let premio = mongoose.Types.ObjectId(idPremio);
						let canje = new CanjeSchema({duenio, premio});
						canje.laurelesCanje = idsLaureles;
						canje.save((err, canje) => {
							if (err) {
								log.error('Error no se puede registrar el canje en mongo', err);
								reject(err);
							} else {
								console.log('<>Canje', canje);
								log.info('Canje correcto');
								resolve(canje);
							}
						});
					} else {
						reject('Laureles insuficientes');
					}
				});
			}).catch((error) => {
				reject(error);
			});
		});
	}

	/*
	*	Genera un documento de canje, haciendo una búsqueda de los laureles más antiguos por ser canjeados.
	*	
	* @method generarCanje
	*/

	static historialCanjes(idColaborador) {
		let query = idColaborador? {duenio: mongoose.Types.ObjectId(idColaborador)} : {};
		return new Promise((resolve, reject) => {
			CanjeSchema.find(query)
			.populate('duenio')
			.populate('laurelesCanje')
			.exec((err, canjes) => {
				if (err) {
					reject(err);
				} else {
					resolve(canjes.map(elem => {
						return elem.toObject();
					}));
				}
			});
		});
	}

}

module.exports = CanjeController;
