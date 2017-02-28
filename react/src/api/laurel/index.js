/**
 * @module Catalogos
 */
import {post} from 'axios';
import {urlGrapqhl, getHeaders} from '../conf';
/**
 * Las peticiones a Graphql del modulo EntregaLaurel.
 * @class CatalogosApi
 */
export default class LaurelApi {

	/**
	* Solicita el siguiente elemento a utilizar por el flujo de entrega de laurel.
	*
	* @method buscarLaurelPorEntregar
	* @param {String}	idColaborador Cadena que identifica al colaborador.
	* @param {String}	token de sesión de Google
	* @return Regresa un objeto laurel de mongo
	*/
	static buscarLaurelPorEntregar(idColaborador, token) {
		return post(urlGrapqhl, {
			query: `{laurelPorEntregar(idColaborador:"${idColaborador}"){_id}}`,
			variables: null,
			operationName: null
		}, getHeaders(token));
	}

	/**
	* Actualiza el colaborador,valor y descripción en el laurel para reflejar la
	* acción de otorgar el reconocimiento a un colaborador
	*
	* @method entregarLaurel
	* @param {String}	laurel Cadena que corresponde al ObjectId de identificación
	* del laurel recuperado por buscarLaurelPorEntregar
	* @param {String}	colaborador Cadena que corresponde al ObjectId de
	* identificación del colaborador a quien se hace el reconocimiento
	* @param {String}	valor Cadena que corresponde al ObjectId de
	* identificación del valor por el cual se reconoce al colaborador
	* @param {String}	descripcion
	* @param {String}	token de sesión de Google
	* @return {Object} Regresa un objeto laurel de mongo
	*/

	static entregarLaurel(laurel, colaborador, valor, descripcion, token) {
		return post(urlGrapqhl, {
			query: `mutation{entregarLaurel(laurel:"${laurel}"colaborador:"${colaborador}"
			valor:"${valor}"descripcion:"${descripcion}"){_id}}`,
			variables: null,
			operationName: null
		}, getHeaders(token));
	}

	static ultimosLaurelesEntregados(numeroLaureles, token) {
		return post(urlGrapqhl, {
			query: `{ultimosLaurelesEntregados(limiteLaureles:${numeroLaureles})
			{_id colaborador{nombre apellidos urlFoto} valor{clave}}}`,
			variables: null,
			operationName: null
		}, getHeaders(token));
	}

	static listarLaurelesRecibidos(idColaborador, token) {
		return post(urlGrapqhl, {
			query: `{laurelesRecibidos(idColaborador:"${idColaborador}")
			{_id descripcion duenio{nombre apellidos perfil urlFoto} valor{clave}}}`,
			variables: null,
			operationName: null
		}, getHeaders(token));
	}
	/**
	* Asigna los laureles a todos los colaboradores
	*
	* @method asignarLaureles
	* @param {Int} numero Es el numero de laureles que se asignaran a cada colaborador.
	* @param {String} fecha Fecha para calcular el periodo de vigencia de los laureles.
	* @param {String}	token Token de la sesión de Google.
	*/
	static asignarLaureles(numero, periodo, token) {
		return post(urlGrapqhl, {
			query: `mutation{ asignarLaurelesTodos(numeroLaureles:${numero}, periodo:${periodo})
			{ _id }}`,
			variables: null,
			operationName: null
		}, getHeaders(token));
	}

	/**
	* Consulta los laureles Recibidos.
	*
	* @method laurelesRecibidos
	* @param {String} idColaborador Identificador del colaborador.
	* @param {String} token Token de la sesion de Google.
	* @return {Object} Regresa un de laurel de mongo.
	*/
	static laurelesRecibidos(idColaborador, token) {
		return post(urlGrapqhl, {
			query: `{laurelesRecibidos(idColaborador:"${idColaborador}"){
    colaborador {nombre apellidos email perfil},
    valor {clave descripcion}, descripcion}}`,
			variables: null,
			operationName: null
		}, getHeaders(token));
	}

	static listarLaurelesEntregados(idColaborador, token) {
		return post(urlGrapqhl, {
			query: `{laurelesEntregados(idColaborador:"${idColaborador}")
			{_id descripcion colaborador{nombre apellidos perfil urlFoto} valor{clave}}}`,
			variables: null,
			operationName: null
		}, getHeaders(token));
	}

	static listarLaurelesXaprobar(token) {
		return post(urlGrapqhl, {
			query: `{buscarLaurelesPorAprobar
			{_id duenio{_id
    					nombre
    					apellidos
    					email
    					fechaNacimiento
    					area
    					perfil
    					fechaBaja
    					urlFoto
    					rol} 
				colaborador {
						_id
						nombre
						apellidos
						email
						fechaNacimiento
						area
						perfil
						fechaBaja
						urlFoto
						rol
					} fechaEntrega valor{clave}
				}}`,
			variables: null,
			operationName: null
		}, getHeaders(token));
	}

	/**
	* Consulta los laureles Entregados.
	*
	* @method laurelesEntregados
	* @param {String} idColaborador Identificador del colaborador.
	* @param {String} token Token de la sesion de Google.
	* @return {Object} Regresa un de laurel de mongo.
	*/
	static laurelesEntregados(idColaborador, token) {
		return post(urlGrapqhl, {
			query: `{laurelesEntregados(idColaborador:"${idColaborador}") {
    colaborador {nombre apellidos email perfil},
		valor {clave descripcion}, descripcion}}`,
			variables: null,
			operationName: null
		}, getHeaders(token));
	}

	/**
	* Consulta los laureles por canjear.
	*
	* @method laurelesPorCanjear
	* @param {String} idColaborador Identificador del colaborador.
	* @param {String} token Token de la sesion de Google.
	* @return {Object} Regresa un de laurel de mongo.
	*/
	static laurelesPorCanjear(idColaborador, token) {
		return post(urlGrapqhl, {
			query: `{laurelesPorCanjear(idColaborador:"${idColaborador}") {
    colaborador {nombre apellidos email perfil},
		valor {clave descripcion}, descripcion}}`,
			variables: null,
			operationName: null
		}, getHeaders(token));
	}

	static registrarCanje(idColaborador, idPremio, token) {
		return post(urlGrapqhl, {
			query: `mutation{registrarCanje(idColaborador:"${idColaborador}",idPremio:"${idPremio}") {
    				_id}}`,
			variables: null,
			operationName: null
		}, getHeaders(token));
	}

}// Llave del Api de Laureles



