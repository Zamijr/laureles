/**
 * @module General
 */
import {combineReducers} from 'redux';
import ajaxModule from './ajax';
import colaboradorModule from './colaborador';
import entregaLaurelModule from './entrega-laurel';
import recibeLaurelModule from './recibo-laurel';
import entregoLaurelModule from './entrego-laurel';
import canjeLaurelModule from './canje-laurel';
import homeModule from './home';
import asignarLaurelModule from './asignar-laureles';
import validarLaurelModule from './validacion-laureles';
import configModule from './config';
/**
 * El reductor raiz, combina todos los reductores de los diferentes modulos.
 * @class RootReducer
 */
const RootReducer = combineReducers({
	ajaxModule,
	colaboradorModule,
	entregaLaurelModule,
	recibeLaurelModule,
	canjeLaurelModule,
	entregoLaurelModule,
	homeModule,
	asignarLaurelModule,
	validarLaurelModule,
	configModule
});

export default RootReducer;
