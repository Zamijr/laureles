/**
 * @module General
 */
import React, { PropTypes } from 'react';
import { List, ListItem, ListItemContent } from 'react-mdl';
/**
 * Muestra un item del menu principal.
 */
const MenuItem = ({lista}) => {
	let listaMenu = lista.map((menuItem, index) => {
		return (
			<ListItem key={index}>
				<ListItemContent style={{'display':'block','cursor':'pointer'}}>
					<div className="cajaIcono" style={{'float':'left','width':'30%'}}>
						<a href="http://localhost:3333/#/asignar-laureles" className={menuItem.claseImagen}></a>
					</div>
					<div style={{'float':'left','width':'70%'}}>{menuItem.nombreItem}</div>
				</ListItemContent>
			</ListItem>
		);
	});
	return (
		<List>
			{listaMenu}
		</List>
	);
};

MenuItem.propTypes = {
	lista: PropTypes.array.isRequired
};

export default MenuItem;
