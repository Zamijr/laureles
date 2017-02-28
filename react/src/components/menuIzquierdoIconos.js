/**
 * @module General
 */
import React, { PropTypes } from 'react';
import { Grid, Cell} from 'react-mdl';
/**
 * Muestra el menu de Iconos izquierdo.
 */
const MenuIconos = () => {
    return (
        <Grid noSpacing className="iconosMenuIzq">
            <Cell col={12} className="cajaIcono" >
                <a href="#" className="laurel"></a>
            </Cell>
            <Cell col={12} className="cajaIcono" >
                <a href="#" className="canjear"></a>
            </Cell>
            <Cell col={12} className="cajaIcono" >
                <a href="#" className="ribbon"></a>
            </Cell>
            <Cell col={12} className="cajaIcono" >
                <a href="#" className="valoresIW"></a>
            </Cell>
            <Cell col={12} className="cajaIcono" >
                <a href="#" className="estadisticas"></a>
            </Cell>
            <Cell col={12} className="cajaIcono" >
                <a href="#" className="admin"></a>
            </Cell>
        </Grid>
    );
};

MenuIconos.propTypes = {

};

export default MenuIconos;
