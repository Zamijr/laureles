/**
 * @module General
 */
import React, {PropTypes} from 'react';
import MenuItem from './menuItem';
/**
 * Muestra el menu principal.
 */
const Menu = ({nombreUsuario, emailUsuario, fotoUsuario, listaOpciones}) => {
	return (
		<div className="menu">
			<div className="usuario">
				<div className="foto">
					<img src={fotoUsuario} />
				</div>
				<div className="nombre">
					{nombreUsuario}
				</div>
				<div className="email">
					{emailUsuario}
				</div>
			</div>
			<div className="listaMenu">
				<MenuItem lista={listaOpciones}/>
			</div>
		</div>
  );
};

Menu.propTypes = {
	nombreUsuario: PropTypes.string.isRequired,
	emailUsuario: PropTypes.string.isRequired,
	fotoUsuario: PropTypes.string.isRequired,
	listaOpciones: PropTypes.array.isRequired
};

export default Menu;
