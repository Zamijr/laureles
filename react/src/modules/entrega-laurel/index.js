import initialState from './initialState';
import {errorRecord} from '../home/initialState';
import {beginAjaxCall, ajaxCallError} from '../ajax';
import Immutable from 'immutable';

import CatalogosApi from '../../api/catalogos';
import ColaboradorApi from '../../api/colaborador';
import LaurelApi from '../../api/laurel';

const LISTAR_VALORES_SUCCESS = "LISTAR_VALORES_SUCCESS";
const LISTAR_VALORES_FAIL = "LISTAR_VALORES_FAIL";
const RECUPERAR_COLABORADORES_SUCCESS = "RECUPERAR_COLABORADORES_SUCCESS";
const RECUPERAR_COLABORADORES_FAIL = "RECUPERAR_COLABORADORES_FAIL";
const ENVIAR_LAUREL_SUCCESS = "ENVIAR_LAUREL_SUCCESS";
const ENVIAR_LAUREL_FAIL = "ENVIAR_LAUREL_FAIL";
const LISTAR_COLABORADORES_FAIL = "LISTAR_COLABORADORES_FAIL";
const CAMBIAR_TIPO_BUSQUEDA = "CAMBIAR_TIPO_BUSQUEDA";
const ACTUALIZAR_TEXTO_BUSQUEDA = "ACTUALIZAR_TEXTO_BUSQUEDA";
const ACTUALIZAR_SELECCIONADO = "ACTUALIZAR_SELECCIONADO";
const ACTUALIZAR_VALOR_SELECCIONADO = "ACTUALIZAR_VALOR_SELECCIONADO";
const ACTUALIZAR_MENSAJE1 = "ACTUALIZAR_MENSAJE1";
const ACTUALIZAR_MENSAJE2 = "ACTUALIZAR_MENSAJE2";
const BUSCAR_LAUREL_POR_ENTREGAR_SUCCESS = "BUSCAR_LAUREL_POR_ENTREGAR_SUCCESS";
const BUSCAR_LAUREL_POR_ENTREGAR_FAIL = "BUSCAR_LAUREL_POR_ENTREGAR_FAIL";
const ENTREGA_LAUREL_SUCCESS = "ENTREGA_LAUREL_SUCCESS";
const ENTREGA_LAUREL_FAIL = "ENTREGA_LAUREL_FAIL";

export default (state = initialState, action) => {

	switch(action.type){
		case LISTAR_VALORES_SUCCESS: {
			return state.set('listaValores',new Immutable.List(action.valores))
		}
		case RECUPERAR_COLABORADORES_SUCCESS: {
			return state.set('resultadoBusqueda',new Immutable.List(action.colaboradores))
		}
		case CAMBIAR_TIPO_BUSQUEDA: {
			return state.set('tipoBusqueda',action.tipo)
		}

		case ACTUALIZAR_TEXTO_BUSQUEDA: {
			return state.set('textoBusqueda',action.texto)
		}

		case ACTUALIZAR_SELECCIONADO: {
			return state.set('cSeleccionado',new Immutable.Map(action.colaborador))
		}

		case ACTUALIZAR_VALOR_SELECCIONADO: {
			return state.set('vSeleccionado',new Immutable.Map(action.valor))
		}

		case ACTUALIZAR_MENSAJE1: {
			return state.set('mensaje1',action.mensaje)
		}

		case ACTUALIZAR_MENSAJE2: {
			return state.set('mensaje2',action.mensaje)
		}

		case BUSCAR_LAUREL_POR_ENTREGAR_SUCCESS: {
			return state.set('laurel',action.laurel)
		}

		case ENTREGA_LAUREL_SUCCESS: {
			return state;
		}

		case RECUPERAR_COLABORADORES_FAIL: {
			let error = new errorRecord({
				titulo: 'Error',
				mensaje: 'Ocurrió un error al recuperar la lista de colaboradores',
				error: action.error
			});
			return state.set('errorGeneral',error)
		}
		case ENVIAR_LAUREL_FAIL: {
/*			let error = new errorRecord({
				titulo: 'Error',
				mensaje: 'Ocurrió un error al registrar los datos del laurel',
				error: action.error
			});*/
			console.log('Ocurrió un error al registrar los datos del laurel')
			return state;
		}
		case LISTAR_VALORES_FAIL: {
/*			let error = new errorRecord({
				titulo: 'Error',
				mensaje: 'Ocurrió un error al consultar la lista de valores',
				error: action.error
			});*/
			console.log('Ocurrió un error al consultar la lista de valores')
			return state;
		}
		case LISTAR_COLABORADORES_FAIL: {
/*			let error = new errorRecord({
				titulo: 'Error',
				mensaje: 'Ocurrió un error al consultar la lista de colaboradores',
				error: action.error
			});*/
			console.log('Ocurrió un error al consultar la lista de colaboradores')
			return state;
		}
		case BUSCAR_LAUREL_POR_ENTREGAR_FAIL: {
/*			let error = new errorRecord({
				titulo: 'Error',
				mensaje: 'Ocurrió un error al consultar la lista de valores',
				error: action.error
			});*/
			console.log('Ocurrió un error al consultar el laurel a entregar')
			return state;
		}
		case ENTREGA_LAUREL_FAIL: {
/*			let error = new errorRecord({
				titulo: 'Error',
				mensaje: 'Ocurrió un error al entregar el laurel',
				error: action.error
			});*/
			console.log('Ocurrió un error al entregar el laurel')
			return state;
		}
	default: { return state;
	}
	}
};

export const listarValores = (token) => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return CatalogosApi.listarValores(token).then(response => {
		 dispatch({type:LISTAR_VALORES_SUCCESS,valores:response.data.data.getValores});
		})
		.catch(error => {
			dispatch(ajaxCallError(error));
			dispatch({type: LISTAR_VALORES_FAIL, error});
			throw (error);
		})
	}
}

export const cambiarTipoBusqueda = (event) => {
	return (dispatch) => {
		return dispatch({type:CAMBIAR_TIPO_BUSQUEDA,tipo:event.target.value});
	}
}

export const actualizarTextoBusqueda = (event) => {
	return (dispatch) => {
		return dispatch({type:ACTUALIZAR_TEXTO_BUSQUEDA,texto:event.target.value});
	}
}

export const actualizaMensaje1 = (event) => {
	return (dispatch) => {
		return dispatch({type:ACTUALIZAR_MENSAJE1,mensaje:event.target.value});
	}
}

export const actualizaMensaje2 = (event) => {
	return (dispatch) => {
		return dispatch({type:ACTUALIZAR_MENSAJE2,mensaje:event.target.value});
	}
}

export const actualizarSeleccionado = (colaborador) => {
	return (dispatch) => {
		return dispatch({type:ACTUALIZAR_SELECCIONADO,colaborador});
	}
}

export const actualizarValorSeleccionado = (valor) => {
	return (dispatch) => {
		return dispatch({type:ACTUALIZAR_VALOR_SELECCIONADO,valor});
	}
}

export const entregarLaurel = ({laurel, colaborador, valor, descripcion, token}) => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		document.location = '#/';
		return LaurelApi.entregarLaurel(laurel, colaborador, valor, descripcion, token).then(response => {
			dispatch({type: ENTREGA_LAUREL_SUCCESS, laurel: response.data.data.entregarLaurel._id});
		})
		.catch(error => {
			dispatch(ajaxCallError(error));
			dispatch({type: ENTREGA_LAUREL_FAIL, error});
			throw (error);
		})
	}
}

export const buscarLaurelPorEntregar = (duenio, token) => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		return LaurelApi.buscarLaurelPorEntregar(duenio, token).then(response => {
			dispatch({type:BUSCAR_LAUREL_POR_ENTREGAR_SUCCESS,laurel:response.data.data.laurelPorEntregar._id});
		})
		.catch(error => {
			dispatch(ajaxCallError(error));
			dispatch({type: BUSCAR_LAUREL_POR_ENTREGAR_FAIL, error});
			throw (error);
		})
	}
}

export const listarColaboradores = (tipoBusqueda,textoBusqueda,token) => {
	return (dispatch) => {
		dispatch(beginAjaxCall());
		let nombre = "",email = "";
		if(tipoBusqueda==='nombre') {
			nombre=textoBusqueda;
			email="";
		}else{
			nombre="";
			email=textoBusqueda;
		}
		return ColaboradorApi.listarColaboradores(nombre,email,token).then(response => {
		 dispatch({type:RECUPERAR_COLABORADORES_SUCCESS, colaboradores:response.data.data.buscarColaboradores});
		})
		.catch(error => {
			dispatch(ajaxCallError(error));
			dispatch({type: LISTAR_COLABORADORES_FAIL, error});
			throw (error);
		})
	}
}
