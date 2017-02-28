/**
 * @module Home
 */
import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText, CardActions, Grid, Cell } from 'react-mdl';
/**
 * Muestra un contador de laureles.
 */
const Contador = ({titulo, pie, numero, texto, imagen}) => {
	return (
		<Card className={"contador"} shadow={0}>
			<CardTitle className="titulo">
					<div className="cajaTi">
						<h6>
							{titulo}
						</h6>
						<div className={imagen} href="#"></div>
					</div>
			</CardTitle>
			<CardText className="texto">
				<Grid noSpacing>
					<Cell col={4} className={'numero'}>
						<div>{numero}</div>
					</Cell>
					<Cell col={8} className={'label'}>
						<div>{texto}</div>
					</Cell>
				</Grid>
			</CardText>
			<CardActions className="acciones">
				{pie}
			</CardActions>
		</Card>
	);
};

Contador.propTypes = {
	titulo: PropTypes.string.isRequired,
	pie: PropTypes.string.isRequired,
	numero: PropTypes.number.isRequired,
	texto: PropTypes.string.isRequired
};

export default Contador;
