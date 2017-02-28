/**
 * @module Canje
 */
import React, { PropTypes } from 'react';
import { Grid, Cell,Textfield, Button, i } from 'react-mdl';
import Contador from '../home/contador';
/**
 * La pantalla de Canje Laureles
 */
const Canje = ({usuario,premios, contadorCanje,registrarCanje,token}) => {
    let rowsPremios = premios.map((premio, index) => {
        
        return (
            <tr key={index}>
                <td className="mdl-data-table__cell--non-numeric">{premio.clave}</td>
                <td>{premio.tipo}</td>
                <td>{premio.costo}</td>
                <td >{premio.costo <= contadorCanje.numero ?<span className="canje-laureles__canjear" onClick={() => { registrarCanje("588780d5e32ce137f7ec2a9f","5893c92500c4e566540f2cdb",token)  } }>Canjear</span>:''}</td>
            </tr>
        );
    });
    return (
        <section className={'canje-laureles'}>
            <Grid className="laurelesRecibidos">
                <Cell col={12}>
                    <h4>{'Canje de Laureles'}</h4>
                </Cell>
                <Cell col={6}>
                    <Grid >
                        <Cell col={12}>
                            <div className="txtEligePremio">{'Elije el premio por el que deseas canjear tus laureles'}</div>
                            <div className="txtBusqueda">{'Puedes hacer una busqueda especifica'}</div>
                        </Cell>
                        <Cell col={12}>
                            <div className="buscador__form">
                                <Textfield
                                    label="Ingresa el nombre del premio"
                                    floatingLabel
                                    className="buscador__form__input"
                                    
                                    />
                                <Button raised colored
                                    
                                    raised
                                    >
                                    <i className="material-icons">search</i>
                                </Button>
                            </div>
                        </Cell>
                    </Grid>
                </Cell>
                <Cell col={6}>
                    <Contador titulo={contadorCanje.titulo} pie={''} texto={contadorCanje.texto} numero={contadorCanje.numero} imagen={contadorCanje.imagen} />;
                </Cell>
                <Cell className="contenidoPremios" col={12}>
                    <table width="100%" className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
                        <thead>
                            <tr>
                                <th className="mdl-data-table__cell--non-numeric">Premio</th>
                                <th >Tipo</th>
                                <th>Numero de Laureles</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowsPremios}
                        </tbody>
                    </table>
                </Cell>
            </Grid>
        </section>
    );
};

Canje.propTypes = {

};

export default Canje;
