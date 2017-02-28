/**
 * @module General
 */
import React, {PropTypes} from 'react';
import { Navigation, Header, Badge, Icon } from 'react-mdl';
/**
 * Muestra el Header principal de la aplicación.
 */
const HeaderLaureles = ({muestraOcultaUltimosLau}) => {
    return (
        <Header title={<span>{'Laureles IW'}</span>}>
            <Navigation>
                <a>
                    <span className="buscar"></span>
                </a>
                <a>
                    <span className="campana"></span>
                </a>
                <a>
                    <span className="reloj"></span>
                </a>
                <a>
                    <button id="demo-menu-lower-right" onClick={muestraOcultaUltimosLau}
                        className="mdl-button mdl-js-button mdl-button--icon">
                        <i className="material-icons">more_vert</i>
                    </button>
                </a>
            </Navigation>
        </Header>

    );
};

HeaderLaureles.propTypes = {
    muestraOcultaUltimosLau: PropTypes.func.isRequired
};

export default HeaderLaureles;
