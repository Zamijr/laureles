/**
* @module General
*/
const {stringify} = require('qs');
/**
 * La cadena de conexion con la base de datos mongodb.
 * @config mongoURL
 * @type {String}
 */
const mongoURL = 'mongodb://localhost:27017/laureles';

/**
 * Los valores de configuracion para la peticion del token oauth2 de salesforce.
 * @config tokenConf
 * @type {Object}
 */
const tokenConfSalesForce = { 
	url: 'https://test.salesforce.com/services/oauth2/token', 
	data: stringify({ 
		'grant_type': 'password', 
		'client_id': '3MVG9PerJEe9i8iLJzpdTu6giIl.q3xCUmbPaNWPCqKKKFc4RnfJDwveSQFFZ9hJVmvfT7NIvC7YHCAjeF59N', 
		'client_secret': '2821436475444071181', 
		'username': 'cibarra2@interware.com.mx.iwsanbox', 
		'password': '123456HSgMO9lVxY0LHBSiM8w6c31m' 
	}) 
}; 

/**
 * La url del servicio de objetos de recursos humanos en salesforce.
 * @config urlsalesColaboradores
 * @type {String}
 */
const urlSalesColaboradores = '/services/data/v38.0/sobjects/HRO__c/'; 

/**
 * Cadena con la URL de la petición a PeopleCloud con los campos para laureles
 * @config urlPeopleCloudToken
 * @type {String}
 */
const urlPeopleCloudToken = 'https://api.people-cloud.com/api/v1/employees/'
	+'?api_token=LDRMwjcPb0lbpk0HCbfaKw7ywNabw8BOwS4UR0ryixlS4rxNf8JcB7GUwof3'
	+'&fields=full_name,boss_id,boss_name,position_name,dob,first_name,last_name,second_last_name,area_id,area_name,start_date,contact_email'

/**
 * Contiene las constantes de configuracion de la app
 * @class Config
 */
module.exports = {
	mongoURL,
	tokenConfSalesForce, 
	urlPeopleCloudToken, 
	urlSalesColaboradores
};
