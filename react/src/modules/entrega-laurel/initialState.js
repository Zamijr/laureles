import Immutable from 'immutable';

export default new Immutable.Map({})
.set('tipoBusqueda', 'nombre')
.set('textoBusqueda', '')
.set('mensaje1', '')
.set('mensaje2', '')
.set('laurel', '')
.set('cSeleccionado', new Immutable.Map({_id: '', nombre: '', apellidos: '', perfil: '', foto: ''}))
.set('vSeleccionado', new Immutable.Map({_id: '', clave: '', descripcion: ''}))
.set('resultadoBusqueda', new Immutable.List([]))
.set('listaValores', new Immutable.List([]));
