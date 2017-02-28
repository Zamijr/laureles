/**
 * @module Home
 */
import React, {PropTypes} from 'react';
import Contador from './contador';
import {Grid, Cell} from 'react-mdl';
/**
 * Contiene los contadores presentados en el home.
 */
const GrupoContadores = ({contadores}) => {
	let listaContadores = contadores.map(({titulo, pie, texto, numero, vinculo, imagen}, index) => {
	let contador = <Contador titulo={titulo}  pie={pie} texto={texto} numero={numero} imagen={imagen} />;

		if (numero > 0 && vinculo)
			return (
			<Cell key={index} col={3} hidePhone> <div onClick={()=>{ window.location.href = vinculo}}> {contador} </div> </Cell>
		);
		else
		return (
			<Cell key={index} col={3} hidePhone> {contador} </Cell>
		);
	});
	return (
		<Grid>
			{listaContadores}
		</Grid>
	);
};

GrupoContadores.propTypes = {
	contadores: PropTypes.array.isRequired
};

export default GrupoContadores;
