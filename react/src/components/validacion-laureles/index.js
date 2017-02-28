/**
 * @module Validar Laureles
 */
import React, { PropTypes } from 'react';
import { Grid, Cell } from 'react-mdl';
import LaurelesXaprobar from './laurelesXaprobar';

/**
 * La pantalla de Validar Laureles 
 */
const ValidarLaurel = ({laurelesXaprobar}) => {
	let rowsLaureles = laurelesXaprobar.map(l => {
		return {
			idLaurel: l._id,
			nombreDuenio:  l.duenio.nombre + ' ' + l.duenio.apellidos,
			nombreColaborador: l.colaborador.nombre + ' ' + l.colaborador.apellidos,
			valor: l.valor.clave,
			urlFoto: l.duenio.urlFoto,
			fechaEnvio: l.fechaEntrega
		};
	});
	return (
		<section className={'validarLaurel'}>
			<Grid className="laurelesXaprobar">
				<Cell col={12} >
					<p >{'Laureles por validar'}</p>
					<LaurelesXaprobar rows={rowsLaureles} />
				</Cell>
			</Grid>
		</section>
	);
};

ValidarLaurel.propTypes = {
	
};

export default ValidarLaurel;
