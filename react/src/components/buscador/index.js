/**
 * @module EntregaLaurel
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, RadioGroup, Radio, Textfield, Grid, Cell } from 'react-mdl';
import Tarjeta from './tarjeta';
import {
	actualizarSeleccionado, actualizarTextoBusqueda,
	cambiarTipoBusqueda, listarColaboradores
} from '../../modules/entrega-laurel';
/**
 * Formulario de búsqueda de colaborador.
 */

class Buscador extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		let colaboradores = this.props.resultadoBusqueda.map(c => {
			return (<Tarjeta key={c._id} nombre={c.nombre} apellidos={c.apellidos} perfil={c.perfil}
				onClick={() => this.props.actualizarSeleccionado(c)} sel={this.props.seleccionado._id === c._id} />)
		});
		return (
			<div className="buscador">
				<Grid noSpacing>
					<Cell col={8}>
					<br/>
						<div className="buscador__tipo-busqueda">
							<RadioGroup
								className="buscador__tipo-busqueda"
								onChange={(event) => this.props.cambiarTipoBusqueda(event)}
								name="tipoBusqueda"
								value={this.props.tipoBusqueda}
								>
										<Radio value="nombre" checked>Buscar por nombre</Radio>
										<Radio value="email"> Buscar por e-mail</Radio>	
							</RadioGroup>
						</div>
					</Cell>
					<Cell col={4}>
						<div className="buscador__form">
							<Textfield
								label="Ingresar el nombre del colaborador"
								floatingLabel
								className="buscador__form__input"
								onChange={(e) => this.props.actualizarTextoBusqueda(e)}
								/>
							<Button raised colored
								onClick={() => this.props.listarColaboradores(
									this.props.tipoBusqueda, this.props.textoBusqueda, this.props.sesion.token)}
								raised
								>
								<i className="material-icons">search</i>
							</Button>
						</div>
					</Cell>
				</Grid>
				<hr />
				<div className="colaboradores">
					{colaboradores}
				</div>
			</div>
		);
	}
}

Buscador.propTypes = {
	tipoBusqueda: PropTypes.string,
	textoBusqueda: PropTypes.string,
	resultadoBusqueda: PropTypes.array,
	seleccionado: PropTypes.object,
	cambiarTipoBusqueda: PropTypes.func,
	actualizarTextoBusqueda: PropTypes.func,
	listarColaboradores: PropTypes.func
};

function mapStateToProps(state) {
	return {
		tipoBusqueda: state.entregaLaurelModule.get('tipoBusqueda'),
		textoBusqueda: state.entregaLaurelModule.get('textoBusqueda'),
		resultadoBusqueda: state.entregaLaurelModule.get('resultadoBusqueda').toJS(),
		seleccionado: state.entregaLaurelModule.get('cSeleccionado').toJS(),
		sesion: state.homeModule.get('datosIniciales').toJS(),
		usuario: state.homeModule.get('usuario').toJS()
	};
}

function mapDispatchToProps(dispatch) {
	return {
		cambiarTipoBusqueda: (evento) => dispatch(cambiarTipoBusqueda(evento)),
		actualizarTextoBusqueda: (e) => dispatch(actualizarTextoBusqueda(e)),
		listarColaboradores: (tipoBusqueda, textoBusqueda, token) =>
			dispatch(listarColaboradores(tipoBusqueda, textoBusqueda, token)),
		actualizarSeleccionado: (colaborador) => dispatch(actualizarSeleccionado(colaborador))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Buscador);
