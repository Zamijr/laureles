/**
 * @module Home
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Home from '../../components/home';
import {listarLaurelesRecibidos, listarPremios} from '../../modules/home';
/**
 * El home principal de la aplicación, contiene los elementos principales que se muestran al inicio.
 * @class HomeLaureles
 */
class HomeLaureles extends React.Component {

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		this.props.listarPremios(this.props.sesion.token);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.usuario._id&&(this.props.usuario._id!==nextProps.usuario._id)) {
			this.props.listarLaurelesRecibidos(nextProps.usuario._id, nextProps.sesion.token);
		}
	}

	render() {
		return (
			<div>
				<Home
					contadores={[
						this.props.contadores.get('porEntregar').toJS(),
						this.props.contadores.get('porCanjear').toJS(),
						this.props.contadores.get('recibidos').toJS(),
						this.props.contadores.get('entregados').toJS(),
					]}
					laurelesRecibidos={this.props.laurelesRecibidos}
					premios={this.props.premios}
				/>
			</div>
		);
	}
}

HomeLaureles.propTypes = {
	ruta: PropTypes.string.isRequired,
	contadores: PropTypes.object.isRequired,
	laurelesRecibidos: PropTypes.array,
	premios: PropTypes.array,
	usuario: PropTypes.object,
	sesion: PropTypes.object
};

function mapStateToProps(state) {
	return {
		contadores: state.homeModule.get('contadores'),
		laurelesRecibidos: state.homeModule.get('laurelesRecibidos').toJS(),
		premios: state.homeModule.get('premios').toJS(),
		usuario: state.homeModule.get('usuario').toJS(),
		sesion: state.homeModule.get('datosIniciales').toJS()
	};
}

function mapDispatchToProps(dispatch) {
	return {
		listarPremios: (token) => dispatch(listarPremios(token)),
		listarLaurelesRecibidos: (idColaborador, token) => dispatch(
			listarLaurelesRecibidos(idColaborador, token))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeLaureles);
