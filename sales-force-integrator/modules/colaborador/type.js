/**
 * @module Colaborador
 */
const ColaboradorController = require('./controller');
const ColaboradorApi = require('../api/colaborador');
const log = require('../../log');
const {salesToSchemaColaborador, peopleToSchemaColaborador} = require('./utils');
const _ = require('lodash');
/**
 * Contiene las operaciones de control del Colaborador
 * @class ColaboradorType
 */
class ColaboradorType {
	/**
	 * Administra el proceso de carga de nuevos colaboradores 
	 *
	 * @method cargaColaboradores
	 */
	static cargaColaboradoresSales() {
		ColaboradorApi.getColaboradoresSalesfoce().then(colaboradores => {
			if(colaboradores !== null) {
				_.each(colaboradores, (colaboradorSales) => {
					let colaborador = salesToSchemaColaborador(colaboradorSales.data);
					ColaboradorController.buscarPorIdSalesforce(colaborador.idSalesforce).then(response => {
						if(response !== null) {
							colaborador._id = response._id;
							ColaboradorController.actualizarColaborador(colaborador);
						} else {
							ColaboradorController.guardarColaborador(colaborador);
						}
						
					}).catch(err => {
						log.error('No se puede buscar por idSalesforce ' + colaborador.idSalesforce + ' ', err);
					});
				});
			}
		}).catch(reason => {
			log.error(reason);
		});	
	}

	/**
	 * Administra el proceso de carga de nuevos colaboradores desde PeopleCloud
	 *
	 * @method cargaColaboradores
	 */
	static cargaColaboradores() {
		ColaboradorApi.getColaboradoresPeopleCloud().then(colaboradores => {
			if(colaboradores !== null) {
				_.each(colaboradores,(colaboradorSales) => {
					let colaborador = peopleToSchemaColaborador(colaboradorSales.data);
					ColaboradorController.buscarPorIdSalesforce(colaborador.idSalesforce).then(response => {
						if(response !== null) {
							colaborador._id = response._id;
							ColaboradorController.actualizarColaborador(colaborador);
						} else {
							ColaboradorController.guardarColaborador(colaborador);
						}
						
					}).catch(err => {
						log.error('No se puede buscar por id ' + colaborador.idSalesforce + ' ', err);
					});
				});
			}
		}).catch(reason => {
			log.error(reason);
		});	
	}
}

module.exports = ColaboradorType;
