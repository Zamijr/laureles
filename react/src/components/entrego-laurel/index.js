/**
 * @module Entregados
 */
import React, { PropTypes } from 'react';
import { Grid, Cell } from 'react-mdl';
import LaurelesEntregados from './laurelesEntregados';

/**
 * La pantalla de Entregados Laureles
 */
const Entregados = ({laurelesEntregados}) => {
	let rowsLaureles = laurelesEntregados.map(l => {
		return {
			idLaurel: l._id,
			nombreColaborador: l.colaborador.nombre + ' ' + l.colaborador.apellidos,
			valor: l.valor.clave,
			descripcion: l.descripcion,
			urlFoto: l.colaborador.urlFoto
		};
	});
	return (
		<section className={'entregados'}>
			<Grid className="laurelesEntregados">
				<Cell col={12} >
					<p className="tituloLaurelesEntregados">{'Laureles Entregados'}</p>
					<LaurelesEntregados rows={rowsLaureles} />
				</Cell>
			</Grid>
		</section>
	);
};

Entregados.propTypes = {
	
};

export default Entregados;
