/**
 * @module EntregaLaurel
 */
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import initialState from '../../modules/entrega-laurel/initialState';
/**
 * Formulario de búsqueda de colaborador.
 */

const Tarjeta = ({nombre,apellidos,perfil,sel,onClick}) => {
	let selected = sel? ' selected' : '';
	return (
		<div className={`colaboradores__tarjeta${selected}`} onClick={onClick}>
			<div className="colaboradores__tarjeta__avatar">
				<img className="colaboradores__tarjeta__avatar__img" src=""/>
			</div>
			<div className="colaboradores__tarjeta__texto">
				<p className="colaboradores__tarjeta__texto__nombre">{nombre+' '+apellidos}</p>
				<p className="colaboradores__tarjeta__texto__puesto">{perfil}</p>
			</div>
		</div>
	);
}



Tarjeta.propTypes = {
	nombre: PropTypes.string,
	apellidos: PropTypes.string,
	perfil: PropTypes.string,
	seleccion: PropTypes.func
}

export default Tarjeta