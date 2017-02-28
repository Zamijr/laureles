import initialState from './initialState';
import Immutable from 'immutable';
import CatalogosApi from '../../api/catalogos';
import {beginAjaxCall, ajaxCallError} from '../ajax';

const LISTAR_VALORES_SUCCESS = 'LISTAR_VALORES_SUCCESS';
const LISTAR_PREMIOS_SUCCESS = 'LISTAR_PREMIOS_SUCCESS';
const AGREGAR_VALOR_SUCCESS = 'AGREGAR_VALOR_SUCCESS';
const EDITAR_VALOR_SUCCESS = 'EDITAR_VALOR_SUCCESS';
const BORRAR_VALOR_SUCCESS = 'BORRAR_VALOR_SUCCESS';
const AGREGAR_PREMIO_SUCCESS = 'AGREGAR_PREMIO_SUCCESS';
const EDITAR_PREMIO_SUCCESS = 'EDITAR_PREMIO_SUCCESS';
const BORRAR_PREMIO_SUCCESS = 'BORRAR_PREMIO_SUCCESS';
const BORRAR_PREMIO_FAIL = 'BORRAR_PREMIO_FAIL';
const LISTAR_VALORES_FAIL = 'LISTAR_VALORES_FAIL';
const LISTAR_PREMIOS_FAIL = 'LISTAR_PREMIOS_FAIL';
const SET_CONTROLES = 'SET_CONTROLES';
const SET_FORM = 'SET_FORM';
const RESET_FORM = 'RESET_FORM';
const ACTUALIZA_CAMPO = 'ACTUALIZA_CAMPO';

export default function reducer(state = initialState, action) {
	switch (action.type) {
	case LISTAR_VALORES_SUCCESS:
	case AGREGAR_VALOR_SUCCESS: 
	case EDITAR_VALOR_SUCCESS: 
	case BORRAR_VALOR_SUCCESS: {
		return state.set('listaValores', new Immutable.List(action.lista));
	}
	case LISTAR_PREMIOS_SUCCESS:
	case AGREGAR_PREMIO_SUCCESS:
	case BORRAR_PREMIO_SUCCESS:
	case EDITAR_PREMIO_SUCCESS: {
		return state.set('listaPremios', new Immutable.List(action.lista));
	}
	case LISTAR_VALORES_FAIL: {
		return state;
	}
	case LISTAR_PREMIOS_FAIL: {
		return state;
	}
	case BORRAR_PREMIO_FAIL: {
		return state;
	}
	case SET_CONTROLES: {
		return state.set('controles', new Immutable.Map(action.controles)).set('seleccionados',new Immutable.List(action.lista));
	}
	case SET_FORM: {
		return state.set(action.form, new Immutable.Map(action.elemento));
	}
	case RESET_FORM: {
		return state.set(action.form, initialState.get(action.form));
	}
	case ACTUALIZA_CAMPO: {
		return state.setIn([action.form,action.campo],action.valor);
	}
	default: return state; 
	}
}

export const listarValores = (token) => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return CatalogosApi.listarValores(token).then(response => {
		 dispatch({type:LISTAR_VALORES_SUCCESS,lista:response.data.data.getValores});
		})
		.catch(error => {
			dispatch(ajaxCallError(error));
			dispatch({type: LISTAR_VALORES_FAIL, error});
			throw (error);
		})
	}
}

export const listarPremios = (token) => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return CatalogosApi.listarPremios(token).then(response => {
		 dispatch({type:LISTAR_PREMIOS_SUCCESS,lista:response.data.data.getPremios});
		})
		.catch(error => {
			dispatch(ajaxCallError(error));
			dispatch({type: LISTAR_PREMIOS_FAIL, error});
			throw (error);
		})
	}
}

export const agregarPremio = (premioObj,token) => {
	delete premioObj.id;
	premioObj.costo = Number(premioObj.costo);
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return CatalogosApi.agregarPremio(premioObj,token).then(response => {
			document.location = '/#/config/premios';
			dispatch({type: AGREGAR_PREMIO_SUCCESS, lista:response.data.data.nuevoTipoPremio });
		})
		.catch(error => {
			dispatch(ajaxCallError(error));
			dispatch({type: AGREGAR_PREMIO_FAIL, error});
			throw (error);
		})
	}
}

export const borrarPremio = (idPremio,token) => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return CatalogosApi.borrarPremio(idPremio,token).then(response => {
			dispatch({type: BORRAR_PREMIO_SUCCESS, lista:response.data.data.deshabilitarPremio });
		})
		.catch(error => {
			dispatch(ajaxCallError(error));
			dispatch({type: BORRAR_PREMIO_FAIL, error});
			throw (error);
		})
	}
}

export const editarPremio = (idPremio, premioObj, token) => {
  premioObj.costo = Number(premioObj.costo);
	delete premioObj.id;
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return CatalogosApi.editarPremio(idPremio, premioObj,token).then(response => {
			document.location = '/#/config/premios';
			dispatch({type: EDITAR_PREMIO_SUCCESS, lista: response.data.data.deshabilitarPremio });
		})
		.catch(error => {
			dispatch(ajaxCallError(error));
			dispatch({type: EDITAR_PREMIO_FAIL, error});
			throw (error);
		})
	}
}

export const agregarValor = (valorObj,token) => {
	delete valorObj.id;
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return CatalogosApi.agregarValor(valorObj,token).then(response => {
			document.location = '/#/config/valores';
			dispatch({type: AGREGAR_VALOR_SUCCESS, lista:response.data.data.nuevoTipoValor });
		})
		.catch(error => {
			dispatch(ajaxCallError(error));
			dispatch({type: AGREGAR_VALOR_FAIL, error});
			throw (error);
		})
	}
}

export const borrarValor = (idValor,token) => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return CatalogosApi.borrarValor(idValor,token).then(response => {
			dispatch({type: BORRAR_VALOR_SUCCESS, lista:response.data.data.deshabilitarValor });
		})
		.catch(error => {
			dispatch(ajaxCallError(error));
			dispatch({type: BORRAR_VALOR_FAIL, error});
			throw (error);
		})
	}
}

export const editarValor = (idValor, valorObj, token) => {
	delete valorObj.id;
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return CatalogosApi.editarValor(idValor, valorObj,token).then(response => {
			document.location = '/#/config/valores';
			dispatch({type: EDITAR_VALOR_SUCCESS, lista: response.data.data.deshabilitarValor });
		})
		.catch(error => {
			dispatch(ajaxCallError(error));
			dispatch({type: EDITAR_VALOR_FAIL, error});
			throw (error);
		})
	}
}

export const setControles = (controles, lista) => {
	return (dispatch) => {
		dispatch({type: SET_CONTROLES, controles, lista})
	}
}

export const setForm = (elemento,form) => {
	return (dispatch) => {
		dispatch({type: SET_FORM, elemento, form})
	}
}

export const resetForm = (form) => {
	return (dispatch) => {
		dispatch({type: RESET_FORM, form})
	}
}

export const updCampo = (e,form) => {
	return (dispatch) => {
		dispatch({type: ACTUALIZA_CAMPO, campo: e.target.name, valor: e.target.value, form})
	}
}
