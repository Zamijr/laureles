/**
 * @module Canje Laurel
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import PanelCanje from '../../components/canje-laurel';
import {listarPremios} from '../../modules/home';
import {registrarCanje} from '../../modules/canje-laurel';
/**
 * 
 * @class CanjeContainer
 */
class CanjeContainer extends React.Component {

	constructor(props) {
		super(props);
	}
	componentDidMount(){
		this.props.listarPremios(this.props.sesion.token);
	}
	
	render() {
		return (
			<div>
	<PanelCanje usuario={this.props.usuario} premios={this.props.premios} contadorCanje={ this.props.contadores.get('porCanjear').toJS()} registrarCanje={this.props.registrarCanje} token={this.props.sesion.token}  />
			</div>
		);
	}
}

CanjeContainer.propTypes = {
	premios: PropTypes.array,
	usuario: PropTypes.object,
	sesion: PropTypes.object
}


function mapStateToProps(state) {
	return {
		contadores: state.homeModule.get('contadores'),
		premios: state.homeModule.get('premios').toJS(),
		usuario: state.homeModule.get('usuario').toJS(),
		sesion: state.homeModule.get('datosIniciales').toJS(),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		listarPremios: (token) => dispatch(listarPremios(token)),
		registrarCanje: (idColaborador, idPremio, token) => dispatch(
				registrarCanje(idColaborador,idPremio, token))
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(CanjeContainer);
