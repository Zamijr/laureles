/**
 * @module Entregado
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { listarLaurelesEntregados } from '../../modules/entrego-laurel';
/**
 * 
 * @class EntregadoContainer
 */
class EntregadoContainer extends React.Component {

	constructor(props) {
		super(props);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.usuario._id && (this.props.usuario._id !== nextProps.usuario._id)) {
			this.props.listarLaurelesEntregados(nextProps.usuario._id, nextProps.sesion.token);
		}
	}
	componentDidMount(){
		this.props.listarLaurelesEntregados(this.props.usuario._id, this.props.sesion.token);
	}
	render() {
		let components = this.props.children && React.cloneElement(this.props.children, {
			laurelesEntregados: this.props.laurelesEntregados	
		});

		return (
			<div>
				{components}
			</div>
		);
	}
}

EntregadoContainer.propTypes = {
	sesion: PropTypes.object,
	usuario: PropTypes.object,
	laurelesEntregados: PropTypes.array
}


function mapStateToProps(state) {
	return {
		sesion: state.homeModule.get("datosIniciales").toJS(),
		usuario: state.homeModule.get("usuario").toJS(),
		laurelesEntregados: state.entregoLaurelModule.get('laurelesEntregados').toJS()
	};
}

function mapDispatchToProps(dispatch) {
	return {
		listarLaurelesEntregados: (idColaborador, token) => dispatch(
			listarLaurelesEntregados(idColaborador, token))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(EntregadoContainer);
