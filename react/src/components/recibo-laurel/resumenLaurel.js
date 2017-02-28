/**
 * @module Recibidos
 */
import React, { PropTypes } from 'react';
import { Grid, Cell, Button } from 'react-mdl';

/**
 * La pantalla de Resumen  Laurel Recibido
 */
class Recibidos extends React.Component {

	render() {
		let laurelSelect = {};
		let mensaje1 = "";
		let mensaje2 = "";
		let datosLaurel = this.props.laurelesRecibidos.map((laurel, index) => {
			if (laurel._id == this.props.params.idLaurel) {
				return (
					laurelSelect = laurel
				);
			}
		});
		let separaMensajes = (laurelSelect.descripcion).split(",");
		mensaje1 = separaMensajes[0];
		mensaje2 = separaMensajes[1];
		return (
			<section className={'resumenRecibido'}>
				<h4>Resumen</h4>
				<div className="resumen" >
					<div className="resumen__datos">
						<img className="resumen__datos__foto" src={laurelSelect.duenio.urlFoto} alt="" />
						<p className="resumen__datos__nombre">{laurelSelect.duenio.nombre + " " + laurelSelect.duenio.apellidos}</p>
						<p className="resumen__datos__puesto">{laurelSelect.duenio.perfil}</p>
						<p>Te entrego este laurel para reconocer el valor de</p>
						<p><strong>{laurelSelect.valor.clave}</strong></p>
					</div>
				</div>
				<div>
					<p>¿Por qué te otorgo este laurel?</p>
					<p>{mensaje1}</p>
					<p>¿Cómo me haces sentir?</p>
					<p>{mensaje2}</p>
				</div>
				<Button style={{ float: 'right' }} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="#/recibo-laurel/" >Regresar </Button>

			</section>
		);
	}
};

Recibidos.propTypes = {

};

export default Recibidos;
