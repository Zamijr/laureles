/**
 * @module Home
 */
import initialState, {usuarioRecord, errorRecord, showRecord} from './initialState';
import Immutable from 'immutable';
import {beginAjaxCall, ajaxCallError} from '../ajax';
import HomeApi from '../../api/home';
import LaurelApi from '../../api/laurel';
import ColaboradorApi from '../../api/colaborador';
import CatalogosApi from '../../api/catalogos';
import moment from 'moment';
/**
 * El reductor del modulo.
 * @class Home
 */
const INIT_APP = 'INIT_APP';
const REGISTRAR_USUARIO_SUCCESS = 'REGISTRAR_USUARIO_SUCCESS';
const REGISTRAR_USUARIO_FAIL = 'REGISTRAR_USUARIO_FAIL';
const LISTAR_PREMIOS_SUCCESS = 'LISTAR_PREMIOS_SUCCESS';
const LISTAR_PREMIOS_FAIL = 'LISTAR_PREMIOS_FAIL';
const LISTAR_LAURELES_RECIBIDOS_SUCCESS = 'LISTAR_LAURELES_RECIBIDOS_SUCCESS';
const LISTAR_LAURELES_RECIBIDOS_FAIL = 'LISTAR_LAURELES_RECIBIDOS_FAIL';
const LISTAR_ULTIMOS_LAURELES_GENERALES_SUCCESS = 'LISTAR_ULTIMOS_LAURELES_GENERALES_SUCCESS';
const LISTAR_ULTIMOS_LAURELES_GENERALES_FAIL = 'LISTAR_ULTIMOS_LAURELES_GENERALES_FAIL';
const ACTUALIZA_FOTO_COLABORADOR_SUCCESS = 'ACTUALIZA_FOTO_COLABORADOR_SUCCESS';
const ACTUALIZA_FOTO_COLABORADOR_FAIL = 'ACTUALIZA_FOTO_COLABORADOR_FAIL';
const CERRAR_DIALOG_USUARIO_ERROR = 'CERRAR_DIALOG_USUARIO_ERROR';
const RIGHT_MENU_SHOW = 'RIGHT_MENU_SHOW';

export default (state = initialState, action) => {
	switch(action.type) {
	case INIT_APP: {
		return state.set('datosIniciales',  new Immutable.Map({
			email: action.email,
			foto: action.foto,
			token: action.token
		}));
	}
	case REGISTRAR_USUARIO_SUCCESS: {
		let contadorPorEntregar = state.get('contadores').get('porEntregar'),
			contadorPorCanjear = state.get('contadores').get('porCanjear'),
			contadorEntregados = state.get('contadores').get('entregados'),
			contadorRecibidos = state.get('contadores').get('recibidos'),
			contadores = state.get('contadores'),
			fecha = action.fechaCaducidadLaureles ? action.fechaCaducidadLaureles.format('DD/MM/YYYY') : '';

		contadores = contadores.set('porEntregar', contadorPorEntregar.set('numero', action.laurelesPorEntregar)
			.set('pie', 'Caducidad ' + fecha))
		.set('entregados', contadorEntregados.set('numero', action.laurelesEntregados))
		.set('recibidos', contadorRecibidos.set('numero', action.laurelesRecibidos))
		.set('porCanjear', contadorPorCanjear.set('numero', action.laurelesPorCanjear));

		return state.set('contadores',  contadores)
			.set('usuario', new usuarioRecord(action.usuario));
	}
	case LISTAR_PREMIOS_SUCCESS: {
		return state.set('premios',  new Immutable.List(action.premios));
	}
	case LISTAR_LAURELES_RECIBIDOS_SUCCESS: {
		return state.set('laurelesRecibidos',  new Immutable.List(action.laureles));
	}
	case LISTAR_ULTIMOS_LAURELES_GENERALES_SUCCESS: {		
		return state.set('ultimosGenerales',  new Immutable.List(action.laureles));
	}
	case LISTAR_LAURELES_RECIBIDOS_FAIL: {
		let error = new errorRecord({
			titulo: 'Consulta error',
			mensaje: 'Ocurrió un error al consultar la lista de laureles recibidos',
			error: action.error
		});
		return state.set('errorGeneral', error);
	}
	case LISTAR_PREMIOS_FAIL: {
		let error = new errorRecord({
			titulo: 'Consulta error',
			mensaje: 'Ocurrió un error al consultar el catálogo de premios',
			error: action.error
		});
		return state.set('errorGeneral', error);
	}
	case LISTAR_ULTIMOS_LAURELES_GENERALES_FAIL: {
		let error = new errorRecord({
			titulo: 'Consulta error',
			mensaje: 'Ocurrió un error al consultar el listado de últimos laureles entregados',
			error: action.error
		});
		return state.set('errorGeneral', error);
	}
	case REGISTRAR_USUARIO_FAIL: {
		let error = new errorRecord({
			titulo: 'Usuario error',
			mensaje: 'Ocurrió un error al consultar el usuario',
			error: action.error
		});
		return initialState
			.set('contadores',  initialState.get('contadores'))
			.set('errorGeneral', error)
			.set('usuario', initialState.get('usuario'));
	}
	case CERRAR_DIALOG_USUARIO_ERROR: {
		return initialState
			.set('errorGeneral', initialState.get('errorGeneral'));
	}
	case RIGHT_MENU_SHOW: {
			return state.set('showMenuRight',action.show);
	}
	case ACTUALIZA_FOTO_COLABORADOR_SUCCESS:{
			console.log('actualizo FOto');
	}
	}
	return state;
};
/**
 * Coloca los valores iniciales de la aplicacion.
 * @method initApp
 * @param {Object} noName Los datos iniciales de la aplicacion
 * @return {Object} Returns La accion INIT_APP
 */
export const initApp = ({email, foto, token}) => {
	return (dispatch) => {
		dispatch(buscarUsuario(email, foto, token));
		dispatch({
			type: INIT_APP,
			email,
			foto,
			token
		});
	};
};
/**
 * Obtiene los valores del usuario, BUSCAR_USUARIO.
 * @method buscarUsuario
 * @param {String} email El email del usuario
 * @return {Object} Returns La accion BUSCAR_USUARIO_SUCESS
 * @throws {Error} Tabién dispara la acción BUSCAR_USUARI
 */
export const buscarUsuario = (email, foto, token) => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return HomeApi.registraUsuario(email, foto, token).then(response => {
			let usuario = response.data.data.registrarUsuario,
				laurelesPorEntregar = response.data.data.registrarUsuario.laurelesPorEntregar.length,
				laurelesRecibidos = response.data.data.registrarUsuario.laurelesRecibidos.length,
				laurelesEntregados = response.data.data.registrarUsuario.laurelesEntregados.length,
				laurelesPorCanjear = response.data.data.registrarUsuario.laurelesPorCanjear.length,
				fechaCaducidadLaureles = '';

			if(laurelesPorEntregar > 0) {
				fechaCaducidadLaureles = moment(new Date(response.data.data
									.registrarUsuario.laurelesPorEntregar[0].fechaCaducidad));
			}

			usuario.nombre = usuario.nombre + ' ' + usuario.apellidos;

			dispatch({type: REGISTRAR_USUARIO_SUCCESS,
				usuario,
				laurelesPorEntregar,
				laurelesRecibidos,
				laurelesEntregados,
				laurelesPorCanjear,
				fechaCaducidadLaureles
			});
		}).catch(error => {
			dispatch(ajaxCallError(error));
			dispatch({type: REGISTRAR_USUARIO_FAIL, error});
			throw (error);
		});
	};
};

/**
 * Solicita los datos del catálogo de premios.
 * @method listarPremios
 * @param {token} token de validación de sesión
 * @return {Array} Regresa la lista de premios con valor y tipo
 * @throws {Error} Recupera el error de la consulta y lo manda a la acción del modal de errores
 */
export const listarPremios = (token) => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return CatalogosApi.listarPremios(token).then(response => {
			dispatch({type: LISTAR_PREMIOS_SUCCESS, premios: response.data.data.getPremios});
		}).catch(error => {
			dispatch(ajaxCallError(error));
			dispatch({type: LISTAR_PREMIOS_FAIL, error});
			throw (error);
		});
	};
};

/**
 * Recupera la lista de objetos laurel del usuario.
 * @method listarLaurelesRecibidos
 * @param {String} idColaborador Cadena que corresponde al ObjectID del elemento colaborador en el objeto Laurel
 * @param {String} token de validación de sesión
 * @return {Array} Regresa la lista de laureles con nombre y apellidos colaborador y el nombre del valor reconocido
 * @throws {Error} Recupera el error de la consulta y lo manda a la acción del modal de errores
 */
export const listarLaurelesRecibidos = (idColaborador, token) => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return LaurelApi.listarLaurelesRecibidos(idColaborador, token).then(response => {
			dispatch({type: LISTAR_LAURELES_RECIBIDOS_SUCCESS, laureles: response.data.data.laurelesRecibidos});
		}).catch(error => {
			dispatch(ajaxCallError(error));
			dispatch({type: LISTAR_LAURELES_RECIBIDOS_FAIL, error});
			throw (error);
		});
	};
};

/**
 * Solicita la lista de los últimos laureles entregados y aprobados
 * @method listarUltimosLaurelesEntregados
 * @param {String} numeroLaureles Cantidad de laureles máxima a solicitar
 * @param {String} token Cadena de validación de sesión
 * @return {Array} Regresa la lista de laureles con los datos de colaborador y valor reconocido
 * @throws {Error} Recupera el error de la consulta y lo manda a la acción del modal de errores
 */
export const listarUltimosLaurelesEntregados = (numeroLaureles, token) => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return LaurelApi.ultimosLaurelesEntregados(numeroLaureles, token).then(response => {
			dispatch({type: LISTAR_ULTIMOS_LAURELES_GENERALES_SUCCESS,
				laureles: response.data.data.ultimosLaurelesEntregados});
		}).catch(error => {
			dispatch(ajaxCallError(error));
			dispatch({type: LISTAR_ULTIMOS_LAURELES_GENERALES_FAIL, error});
			throw (error);
		});
	};
};

/**
 * Inserta imagen del Colaborador
 * @method actualizaFotoColaborador
 * @param {String} ID del Colaborador
 * @param {String} URL de la foto Colaborador
 * @throws {Error} Recupera el error de la consulta y lo manda a la acción del modal de errores
 */
export const actualizaFotoColaborador = (idColaborador, urlFoto, token) => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return ColaboradorApi.actualizaFotoColaborador(idColaborador, urlFoto , token).then(response => {
			dispatch({type: ACTUALIZA_FOTO_COLABORADOR_SUCCESS});
		}).catch(error => {
			dispatch(ajaxCallError(error));
			dispatch({type: ACTUALIZA_FOTO_COLABORADOR_FAIL, error});
			throw (error);
		});
	};
};

export const cerrarDialogUsuarioError = () => {
	return {type: CERRAR_DIALOG_USUARIO_ERROR};
};

export const rightMenuShow = (show) => {
	return {type: RIGHT_MENU_SHOW,
		    show: show };
};
