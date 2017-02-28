import initialState from './initialState';
import {errorRecord} from '../home/initialState';
import {beginAjaxCall, ajaxCallError} from '../ajax';
import LaurelApi from '../../api/laurel';
import Immutable from 'immutable';

const LAURELES_X_APROBAR_SUCCESS = 'LAURELES_X_APROBAR_SUCCESS';
const LAURELES_X_APROBAR_FAIL = 'LAURELES_X_APROBAR_FAIL';

export default (state = initialState, action) => {

	switch(action.type) {
	case LAURELES_X_APROBAR_SUCCESS: {
		return state.set('laurelesXaprobar',  new Immutable.List(action.laureles));
	}
	case LAURELES_X_APROBAR_FAIL: {
		let error = new errorRecord({
			titulo: 'Consulta error',
			mensaje: 'Ocurrió un error al consultar el listado de últimos laureles entregados',
			error: action.error
		});
		return state.set('errorGeneral', error);
	}
	default: {
		return state;
	}
	}
};

/**
 * Recupera la lista de laureles por Aprobar.
 *
 * @method laurelesXaprobar
 * @param {String} idColaborador Cadena que corresponde al id del colaborador
 * @param {String} token Token de validación de sesión.
 * @return {Array} Regresa la lista de laureles con nombre y apellidos colaborador y el nombre del valor reconocido
 * @throws {Error} Recupera el error de la consulta y lo manda a la acción del modal de errores
 */
export const listarLaurelesXaprobar = (token) => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return LaurelApi.listarLaurelesXaprobar(token).then(response => {
			dispatch({type: LAURELES_X_APROBAR_SUCCESS, laureles: response.data.data.buscarLaurelesPorAprobar});
		}).catch(error => {
			dispatch(ajaxCallError(error));
			dispatch({type: LAURELES_X_APROBAR_FAIL, error});
			throw (error);
		});
	};
};
