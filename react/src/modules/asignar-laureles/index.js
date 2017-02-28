import initialState from './initialState';
import {errorRecord} from '../home/initialState';
import {beginAjaxCall, ajaxCallError} from '../ajax';
import LaurelApi from '../../api/laurel';

const CAMBIAR_NUMERO_ASIGNACION = 'CAMBIAR_NUMERO_ASIGNACION';
const CAMBIAR_PERIODO_ASIGNACION = 'CAMBIAR_PERIODO_ASIGNACION';
const ASIGNAR_LAURELES_SUCCESS = 'ASIGNAR_LAURELES_SUCCESS';
const ASIGNAR_LAURELES_FAIL = 'ASIGNAR_LAURELES_FAIL';

export default (state = initialState, action) => {

	switch(action.type) {
	case CAMBIAR_NUMERO_ASIGNACION: {
		return state.set('numeroAsignar', action.numero);
	}
	case CAMBIAR_PERIODO_ASIGNACION: {
		return state.set('periodoAsignar', action.periodo);
	}
	case ASIGNAR_LAURELES_SUCCESS: {
		let result = new errorRecord({
			titulo: 'General',
			mensaje: 'Se asignarón los Laureles correctamente.',
			error: action.result
		});
		return state.set('General', result);
	}
	case ASIGNAR_LAURELES_FAIL: {
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

export const cambiarNumeroAsignacion = (event, numero) => {
	return (dispatch) => {
		numero = event.target.value;
		return dispatch({type: CAMBIAR_NUMERO_ASIGNACION, numero});
	};
};

export const cambiarPeriodoAsignacion = (event, periodo) => {
	return (dispatch) => {
		periodo = event.target.value;
		return dispatch({type: CAMBIAR_PERIODO_ASIGNACION, periodo});
	};
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
