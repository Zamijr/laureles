import initialState from './initialState';
import {errorRecord} from '../home/initialState';
import {beginAjaxCall, ajaxCallError} from '../ajax';
import LaurelApi from '../../api/laurel';

const LAURELES_RECIBIDOS_SUCCESS = 'LAURELES_RECIBIDOS_SUCCESS';
const LAURELES_RECIBIDOS_FAIL = 'LAURELES_RECIBIDOS_FAIL';

export default (state = initialState, action) => {

	switch(action.type) {
	case LAURELES_RECIBIDOS_SUCCESS: {
    return state;
	}
	case LAURELES_RECIBIDOS_FAIL: {
		let error = new errorRecord({
			titulo: 'Consulta error',
			mensaje: 'Ocurrió al querer asignar los Laureles.',
			error: action.error
		});
		return state.set('errorGeneral', error);
	}
	default: {
		return state;
	}
	}
};


export const asignarLaureles = (numero, periodo, token) => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return LaurelApi.asignarLaureles(numero, periodo, token).then(response => {
			dispatch({type: ASIGNAR_LAURELES_SUCCESS, result: response.data});
		}).catch(error => {
			dispatch(ajaxCallError(error));
			dispatch({type: ASIGNAR_LAURELES_FAIL, error});
			throw (error);
		});
	};
};
