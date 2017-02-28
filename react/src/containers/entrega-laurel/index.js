/**
 * @module Entrega
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import PanelEntrega from '../../components/entrega-laurel';
import {listarValores, buscarLaurelPorEntregar} from '../../modules/entrega-laurel';
/**
 * 
 * @class EntregaContainer
 */
class EntregaContainer extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.listarValores(this.props.sesion.token);
		if (this.props.usuario._id) {
			this.props.buscarLaurelPorEntregar(this.props.usuario._id,this.props.sesion.token);
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.usuario._id&&(this.props.usuario._id!==nextProps.usuario._id)) {
			this.props.buscarLaurelPorEntregar(nextProps.usuario._id,this.props.sesion.token);
		}
	}

	render() {
		return (
			<div>
				<PanelEntrega />
			</div>
		);
	}
}

EntregaContainer.propTypes = {
	sesion: PropTypes.object,
	usuario: PropTypes.object,
	listarValores: PropTypes.func,
	buscarLaurelPorEntregar: PropTypes.func
}


function mapStateToProps(state) {
	return {
		sesion: state.homeModule.get("datosIniciales").toJS(),
		usuario: state.homeModule.get("usuario").toJS()
	};
}

function mapDispatchToProps(dispatch) {
	return {
		listarValores: (token) => dispatch(listarValores(token)),
		buscarLaurelPorEntregar: (duenio,token) => dispatch(buscarLaurelPorEntregar(duenio,token))
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(EntregaContainer);
