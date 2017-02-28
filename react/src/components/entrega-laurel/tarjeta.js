/**
 * @module EntregaLaurel
 */
import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import initialState from '../../modules/entrega-laurel/initialState';
import { Grid, Cell } from 'react-mdl';

/**
 * Formulario de búsqueda de colaborador.
 * <button className="valores__tarjeta__info-btn">{'MÁS INFORMACIÓN'}</button>
 */

const Tarjeta = ({clave, descripcion, onClick, selected}) => {
	let sel = selected ? 'selected' : ''
	return (
		<div className={`valores__tarjeta ${sel}`} onClick={onClick}>
			
			<div className="valores__tarjeta__nombre">
			<Grid noSpacing>
			<Cell col={10}><div>{clave}</div></Cell>
			<Cell col={2}><div className="okIconValores"></div></Cell>
			</Grid>
				<div className="valores__tarjeta__descripcion">{descripcion}</div>		
			</div>
		</div>
	);
}

Tarjeta.propTypes = {
	clave: PropTypes.string,
	descripcion: PropTypes.string,
	onClick: PropTypes.func
}

export default Tarjeta
