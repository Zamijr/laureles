/**
 * @module Home
 */
import React, {PropTypes} from 'react';
import {ListItem, Grid, Cell} from 'react-mdl';
/**
 * Representa un elemento de la lista de laureles.
 */
const LaurelElement = ({imagen, nombreColaborador, valor}) => {
	return (
		<ListItem>
			<Grid noSpacing>
				<Cell col={2}>
					<img src={imagen} />
				</Cell>
				<Cell col={10}>
					<Grid noSpacing>
						<Cell col={12}>
							{nombreColaborador}
						</Cell>
						<Cell col={12}>
							{valor}
						</Cell>
					</Grid>	
				</Cell>
			</Grid>
		</ListItem>
	);
};

LaurelElement.propTypes = {
	imagen: PropTypes.string.isRequired,
	nombreColaborador: PropTypes.string.isRequired,
	valor: PropTypes.string.isRequired
};

export default LaurelElement;
