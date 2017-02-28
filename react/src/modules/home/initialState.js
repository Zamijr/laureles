import Immutable from 'immutable';
import moment from 'moment';

export const contadorRecord = new Immutable.Record({
	titulo: '',
	pie: '',
	texto: 'Laureles',
	numero: '',
	vinculo: '',
	imagen: ''
});

const datosIniciales = new Immutable.Map({
	email: null,
	foto: null,
	token: null
});

const contadores = new Immutable.Map({
	porEntregar: new contadorRecord({
		titulo: 'Por Entregar',
		pie: 'Caducidad ' + moment().format('DD/MM/YYYY'),
		numero: 0,
		vinculo: '/#/entregar-laurel',
		imagen: 'porEntregarImg'
	}),
	porCanjear: new contadorRecord({
		titulo: 'Por Canjear',
		pie: 'Por Entregar',
		numero: 0,
		vinculo: '/#/canje-laurel',
		imagen: 'imagenContaCanjear'
	}),
	recibidos: new contadorRecord({
		titulo: 'Recibidos',
		pie: 'Quien te ha reconocido',
		numero: 0,
		vinculo: '/#/recibo-laurel',
		imagen: 'imagenContaRecibidos'
	}),
	entregados: new contadorRecord({
		titulo: 'Entregados',
		pie: 'A quien has reconocido',
		numero: 0,
		vinculo: '/#/entrego-laurel',
		imagen: 'imagenContaEntregados'
	})
});

export const usuarioRecord = new Immutable.Record({
	_id: '',
	nombre: '',
	apellidos: '',
	email: '',
	perfil: '',
	foto: ''
});

export const errorRecord = new Immutable.Record({
	titulo: '',
	mensaje: '',
	error: null
});


export default new Immutable.Map({})
.set('datosIniciales', datosIniciales)
.set('contadores', contadores)
.set('premios', new Immutable.List())
.set('laurelesRecibidos', new Immutable.List())
.set('ultimosGenerales', new Immutable.List())
.set('showMenuRight')
.set('usuario', new usuarioRecord())
.set('errorGeneral', new errorRecord());
