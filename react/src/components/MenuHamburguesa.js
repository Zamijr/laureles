/**
 * @module General
 */
import React, {PropTypes} from 'react';
import {Drawer,Navigation} from 'react-mdl';
/**
 * Muestra el Menu Hamburguesa superior izquierda principal de la aplicación.
 */
const MenuHamburguesa = ({listaOpciones}) => {
    let listaMenu = listaOpciones.map((menuItem, index) => {
		return (
			<a key={index}>
				{menuItem}
			</a>
		);
	});
    return (
        <Drawer title="Laureles IW">
            <Navigation>
                {listaMenu}
            </Navigation>
        </Drawer>

    );
};

MenuHamburguesa.propTypes = {
    listaOpciones: PropTypes.array.isRequired
};

export default MenuHamburguesa;
