import initialState from './initialState';
import { errorRecord } from '../home/initialState';
import { beginAjaxCall, ajaxCallError } from '../ajax';
import Immutable from 'immutable';

import LaurelApi from '../../api/laurel';

const LISTAR_LAURELES_RECIBIDOS_SUCCESS = 'LISTAR_LAURELES_RECIBIDOS_SUCCESS';
const LISTAR_LAURELES_RECIBIDOS_FAIL = 'LISTAR_LAURELES_RECIBIDOS_FAIL';

export default (state = initialState, action) => {

	switch (action.type) {
		case LISTAR_LAURELES_RECIBIDOS_SUCCESS: {
			return state.set('laurelesRecibidos', new Immutable.List(action.laureles));
		}
		case LISTAR_LAURELES_RECIBIDOS_FAIL: {
			let error = new errorRecord({
				titulo: 'Consulta error',
				mensaje: 'Ocurrió un error al consultar la lista de laureles recibidos',
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
			dispatch({ type: LISTAR_LAURELES_RECIBIDOS_SUCCESS, laureles: response.data.data.laurelesRecibidos });
		}).catch(error => {
			dispatch(ajaxCallError(error));
			dispatch({ type: LISTAR_LAURELES_RECIBIDOS_FAIL, error });
			throw (error);
		});
	};
};