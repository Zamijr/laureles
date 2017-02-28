/**
 * @module Validacion Laureles
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { listarLaurelesXaprobar } from '../../modules/validacion-laureles';
/**
 * 
 * @class ValidacionLaurelesContainer
 */
class ValidacionContainer extends React.Component {

	constructor(props) {
		super(props);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.usuario._id && (this.props.usuario._id !== nextProps.usuario._id)) {
			this.props.listarLaurelesXaprobar(nextProps.sesion.token);
		}
	}
	componentDidMount(){
		this.props.listarLaurelesXaprobar(this.props.sesion.token);
	}
	render() {
		let components = this.props.children && React.cloneElement(this.props.children, {
			laurelesXaprobar: this.props.laurelesXaprobar	
		});

		return (
			<div>
				{components}
			</div>
		);
	}
}

ValidacionContainer.propTypes = {
	sesion: PropTypes.object,
	usuario: PropTypes.object,
	laurelesXaprobar: PropTypes.array
}


function mapStateToProps(state) {
	return {
		sesion: state.homeModule.get("datosIniciales").toJS(),
		usuario: state.homeModule.get("usuario").toJS(),
		laurelesXaprobar: state.validarLaurelModule.get('laurelesXaprobar').toJS()
	};
}

function mapDispatchToProps(dispatch) {
	return {
		listarLaurelesXaprobar: (token) => dispatch(
			listarLaurelesXaprobar(token))
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(ValidacionContainer);
