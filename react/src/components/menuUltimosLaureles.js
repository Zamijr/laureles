/**
 * @module General
 */
import React, { PropTypes } from 'react';
import { List, ListItem, ListItemContent } from 'react-mdl';
/**
 * Muestra menu Ultimos Laureles recibidos
 */
const MenuUltimosLau = ({menuUltimosLaureles}) => {
	let listaMenu = menuUltimosLaureles.map((item, index) => {
		return (
			<ListItem key={index} threeLine>
			<img className="imagenGoogle" src={item.colaborador.urlFoto} />
				<ListItemContent subtitle={item.valor.clave} >
					{item.colaborador.nombre}
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

MenuUltimosLau.propTypes = {
	menuUltimosLaureles: PropTypes.array.isRequired
};

export default MenuUltimosLau;
