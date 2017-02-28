const moment = require('moment');
/**
 * Genera un nuevo objeto Colaborador con el esquema del proyecto laureles
 *
 * @method salesToSchemaColaborador
 * @param {Object} colaboradorSales El objeto colaborador obtenido de Salesforce
 * @return {Object} El objeto colaborador con el esquema de laureles
 * @for ColaboradorType
 */
const salesToSchemaColaborador = (colaboradorSales) => {
	let colaborador = {};

	let familiares = null;

	if(colaboradorSales.FAMILIAR__c !== null && colaboradorSales.FAMILIAR__c !== '') {
		familiares = colaboradorSales.FAMILIAR__c.split(',').map((element) => {
			return element.replace(' ', '');
		});
	}

	colaborador.idSalesforce = colaboradorSales.Id;
	colaborador.email = colaboradorSales.e_Mail__c;
	colaborador.nombre = colaboradorSales.Nombre__c;
	colaborador.apellidos = colaboradorSales.Apellidos__c;
	colaborador.ultimaFechaModificacionSalesforce = 
		colaboradorSales.LastModifiedDate !== null && colaboradorSales !== '' ? 
		moment(colaboradorSales.LastModifiedDate).toDate() : null;
	colaborador.fechaIngreso = colaboradorSales.Fecha_de_Ingreso__c;
	colaborador.fechaNacimiento = 
		colaboradorSales.Fecha_de_nacimiento__c !== null && colaboradorSales.Fecha_de_nacimiento__c !== '' ?
		moment(colaboradorSales.Fecha_de_nacimiento__c, 'YYYY-MM-DD').toDate() :  null;
	colaborador.familiares = familiares;
	colaborador.area = colaboradorSales.Oficina__c;
	colaborador.perfil = colaboradorSales.Perfil__c;
	colaborador.fechaBaja = colaboradorSales.Fecha_de_Baja__c;
	return colaborador;
};

/**
 * Genera un nuevo objeto Colaborador con el esquema del proyecto laureles
 *
 * @method salesToSchemaColaborador
 * @param {Object} colaboradorSales El objeto colaborador obtenido de Salesforce
 * @return {Object} El objeto colaborador con el esquema de laureles
 * @for ColaboradorType
 */
const peopleToSchemaColaborador = (colaboradorPeople) => {
	let colaborador = {};
	let colaboradorTemp = {};

	for ( i in colaboradorPeople ) {
		colaboradorTemp[colaboradorPeople[i].name]=colaboradorPeople[i].value;
	}

	colaborador.idSalesforce = colaboradorTemp.id;
	colaborador.email = colaboradorTemp.contact_email;
	colaborador.nombre = colaboradorTemp.first_name;
	colaborador.apellidos = colaboradorTemp.last_name+" "+ colaboradorTemp.second_last_name;
	colaborador.fechaIngreso = colaboradorTemp.start_date ? moment(colaboradorTemp.start_date, 'YYYY-MM-DD'):'';
	colaborador.fechaNacimiento = colaboradorTemp.dob ? moment(colaboradorTemp.dob, 'YYYY-MM-DD').toDate() :  null;
	colaborador.area = colaboradorTemp.area_name;
	colaborador.perfil = colaboradorTemp.position_name;
	colaborador.familiares = null;
	colaborador.ultimaFechaModificacionSalesforce = null;
	colaborador.fechaBaja = null;
	return colaborador;
};

module.exports = {
	salesToSchemaColaborador,
	peopleToSchemaColaborador
};
