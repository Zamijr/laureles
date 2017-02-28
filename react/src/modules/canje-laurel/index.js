import initialState from './initialState';
import { beginAjaxCall, ajaxCallError } from '../ajax';
import Immutable from 'immutable';

import LaurelApi from '../../api/laurel';

const REGISTRAR_CANJE_SUCCESS = 'REGISTRAR_CANJE_SUCCESS';
const REGISTRAR_CANJE_FAIL = 'REGISTRAR_CANJE_FAIL';

export default (state = initialState, action) => {

	switch (action.type) {
		case REGISTRAR_CANJE_SUCCESS: {
			//return 
		}
		case REGISTRAR_CANJE_FAIL: {
			console.log('RegistrarCanje Fallo');
		}
		default: {
			return state;
		}
	}
};
//IMPORTANTEEEEEEEEEEEEE
// Pendiente hasta que se pueda asignar laureles con el servicio para proseguir con las pruebas
export const registrarCanje = (idColaborador, idPremio, token) => {
	return (dispatch) => {
		console.log('entro dsipa registrarCanje');
		dispatch(beginAjaxCall());
		return LaurelApi.registrarCanje(idColaborador, idPremio,  token).then(response => {
			console.log('response');
			console.log(response);
			//dispatch({ type: REGISTRAR_CANJE_SUCCESS, laureles: response.data.data.laurelesRecibidos });
		}).catch(error => {
			dispatch(ajaxCallError(error));
			dispatch({ type: REGISTRAR_CANJE_FAIL, error });
			throw (error);
		});
	};
};