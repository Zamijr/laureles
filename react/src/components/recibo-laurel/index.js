/**
 * @module Recibidos
 */
import React, { PropTypes } from 'react';
import { Grid, Cell } from 'react-mdl';
import LaurelesRecibidos from './laurelesRecibidos';

/**
 * La pantalla del Recibidos Laureles
 */
const Recibidos = ({laurelesRecibidos}) => {
	let rowsLaureles = laurelesRecibidos.map(l => {
		return {
			idLaurel: l._id,
			urlFoto: l.duenio.urlFoto,
			nombreColaborador: l.duenio.nombre + ' ' + l.duenio.apellidos,
			valor: l.valor.clave,
			descripcion: l.descripcion
		};
	});
	return (
		<section className={'recibidos'}>
			<Grid className="laurelesRecibidos">
				<Cell col={12} >
					<p className="tituloLaurelesRecibidos">{'Laureles Recibidos'}</p>
					<LaurelesRecibidos rows={rowsLaureles} />
				</Cell>
			</Grid>
		</section>
	);
};

Recibidos.propTypes = {
	
};

export default Recibidos;
