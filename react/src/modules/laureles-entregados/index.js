import initialState from './initialState';
import {errorRecord} from '../home/initialState';
import {beginAjaxCall, ajaxCallError} from '../ajax';
import LaurelApi from '../../api/laurel';

const LAURELES_ENTREGADOS_SUCCESS = 'LAURELES_ENTREGADOS_SUCCESS';
const LAURELES_ENTREGADOS_FAIL = 'LAURELES_ENTREGADOS_FAIL';

export default (state = initialState, action) => {

	switch(action.type) {
	case LAURELES_ENTREGADOS_SUCCESS: {
		return state.set('laurelesRecibidos',  new Immutable.List(action.laureles));
	}
	case LAURELES_ENTREGADOS_FAIL: {
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
 * Recupera la lista de laureles entregados.
 *
 * @method laurelesEntregados
 * @param {String} idColaborador Cadena que corresponde al id del colaborador
 * @param {String} token Token de validación de sesión.
 * @return {Array} Regresa la lista de laureles con nombre y apellidos colaborador y el nombre del valor reconocido
 * @throws {Error} Recupera el error de la consulta y lo manda a la acción del modal de errores
 */
export const laurelesEntregados = (idColaborador, token) => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return LaurelApi.laurelesEntregados(idColaborador, token).then(response => {
			dispatch({type: LAURELES_ENTREGADOS_SUCCESS, laureles: response.data.data.laurelesEntregados});
		}).catch(error => {
			dispatch(ajaxCallError(error));
			dispatch({type: LAURELES_ENTREGADOS_FAIL, error});
			throw (error);
		});
	};
};
