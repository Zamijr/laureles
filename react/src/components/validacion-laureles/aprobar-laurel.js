/**
 * @module Validacion Laureles
 */
import React, { PropTypes } from 'react';
import { Grid, Cell,Textfield, Button, i } from 'react-mdl';
import Contador from '../home/contador';
/**
 * La pantalla de Validacion Laureles
 */
const ValidacionLaureles = ({}) => {
    return (
        <section className={'validacion-laureles'}>
            <Grid className="laurelesValidaciones" noSpacing>
                <Cell col={12}>
                    <h4>{'Validacion  Laureles'}</h4>
                </Cell>
                <Cell col={12} align="middle">
                    <Grid>
                        <Cell col={5} className="quienOtorga">
                            QUIÉN LO OTORGA
                        </Cell>
                        <Cell col={2}>
                           
                        </Cell>
                        <Cell col={5}>
                            QUIÉN LO RECIBE
                        </Cell>
                        
                    </Grid>
                </Cell>
                <Cell col={12}>
                        <Grid noSpacing>
                            <Cell col={5} >
                                <Grid noSpacing>
                                    <Cell col={12} align="top" >
                                        <div className="otorgaImg">
                                        
                                        </div>
                                    </Cell>
                                    <Cell col={12}>
                                        <div>Alejandra Gonzalez Garrido</div>
                                        <div>Project manager Jr.</div>
                                    </Cell>
                                </Grid>
                            </Cell>
                            <Cell col={1} align="middle">
                                <div className="flecha" ></div>
                            </Cell>
                            <Cell col={5}>
                                <Grid noSpacing>
                                    <Cell col={12} align="top">
                                        <div className="recibeImg">
                                        
                                        </div>
                                    </Cell>
                                    <Cell col={12}>
                                    
                                    </Cell>
                                </Grid>
                            </Cell>
                             
                        </Grid>
                </Cell>
                <Cell col={12}>
                    3
                </Cell>
            </Grid>
        </section>
    );
};

ValidacionLaureles.propTypes = {

};

export default ValidacionLaureles;
