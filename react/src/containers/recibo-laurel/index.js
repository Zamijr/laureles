/**
 * @module Recibo
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { listarLaurelesRecibidos } from '../../modules/recibo-laurel';
/**
 * 
 * @class ReciboContainer
 */
class ReciboContainer extends React.Component {

	constructor(props) {
		super(props);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.usuario._id && (this.props.usuario._id !== nextProps.usuario._id)) {
			this.props.listarLaurelesRecibidos(nextProps.usuario._id, nextProps.sesion.token);
		}
	}
	componentDidMount(){
		this.props.listarLaurelesRecibidos(this.props.usuario._id, this.props.sesion.token);
	}
	render() {
		let components = this.props.children && React.cloneElement(this.props.children, {
			laurelesRecibidos: this.props.laurelesRecibidos	
		});

		return (
			<div>
				{components}
			</div>
		);
	}
}

ReciboContainer.propTypes = {
	sesion: PropTypes.object,
	usuario: PropTypes.object,
	laurelesRecibidos: PropTypes.array
}


function mapStateToProps(state) {
	return {
		sesion: state.homeModule.get("datosIniciales").toJS(),
		usuario: state.homeModule.get("usuario").toJS(),
		laurelesRecibidos: state.homeModule.get('laurelesRecibidos').toJS()
	};
}

function mapDispatchToProps(dispatch) {
	return {
		listarLaurelesRecibidos: (idColaborador, token) => dispatch(
			listarLaurelesRecibidos(idColaborador, token))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ReciboContainer);
