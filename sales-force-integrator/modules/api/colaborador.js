/**
* @module Colaborador
*/
const axios = require('axios');
const log = require('../../log');
const {
	tokenConfPeopleCloud,
	urlSalesColaboradores,
	urlPeopleCloudToken
} = require('../../config');
/**
 * Contiene la operaciones realizas a fuentes de informacion externas al proyecto, 
 * como SalesForce
 * @class ColaboradorApi
 */
class ColaboradorApi {
	/**
	 * Obtiene los Colaboradores del api Rest de Salesforce
	 *
	 * @method getColaboradoresSalesfoce
	 * @return {Promise} La promesa de ejecucion, con la lista de colaboradores en Salesforce
	 */
	static getColaboradoresSalesfoce() {
		log.info('Obteniendo token salesforce');
		log.info(tokenConf.url);
		return axios.post(tokenConf.url, tokenConf.data).then((data) => {
			log.info('Token recuperado');
			const token = data.data.access_token;
			const dominioDatos = data.data.instance_url;
			log.info('Obteniendo la lista de empleados: ' + dominioDatos + urlSalesColaboradores);
			return axios.get((dominioDatos + urlSalesColaboradores), {
				headers: { 
					Authorization: 'Bearer ' + token 
				}
			}).then(resp => {
				return Promise.all(resp.data.recentItems.map((element) => {
					return axios.get((dominioDatos + element.attributes.url), {
						headers: { 
							Authorization: 'Bearer ' + token 
						}
					});	
				}));
			}).catch(err => {
				log.error('Ocurrio un error al obtener ela lista de empleados', err);	
				return null;
			});
		}).catch(err => {
			log.error('Ocurrio un error al obtener el token de salesforce', err);
			return null;
		});
	}


	static getColaboradoresPeopleCloud() {
		log.info("Recuperando datos de empleados");
		return axios.get(urlPeopleCloudToken).then((data)=>{
			return data.data.collection.items;
		});
	}
	
}

module.exports = ColaboradorApi;
