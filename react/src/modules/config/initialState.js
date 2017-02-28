import Immutable from 'immutable';

let initialState = new Immutable.Map()
.set('controles', new Immutable.Map({editar:false, borrar:false}))
.set('listaValores',new Immutable.List())
.set('valorForm',new Immutable.Map()
	.set('id','')
	.set('clave','')
	.set('descripcion',''))
.set('listaPremios',new Immutable.List())
.set('premioForm',new Immutable.Map()
	.set('id','')
	.set('clave','')
	.set('tipo','tiempo')
	.set('costo',''))
.set('seleccionados',new Immutable.List())
;

export default initialState;
