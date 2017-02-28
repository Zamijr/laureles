/**
 * @module General
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Navigo from 'navigo';
import HeaderLaureles from './components/HeaderLaureles';
import MenuHamburguesa from './components/MenuHamburguesa';
import Menu from './components/menu';
import MenuIconos from './components/menuIzquierdoIconos';
import MenuUltimosLau from './components/menuUltimosLaureles';
import Dialog from './components/dialog';
import Laureado from './components/laureado';
import EntregaContainer from './containers/entrega-laurel';

import ReciboContainer from './containers/recibo-laurel';
import ReciboIndex from './components/recibo-laurel';
import ReciboResumen from './components/recibo-laurel/resumenLaurel';

import EntregoContainer from './containers/entregado-laurel';
import EntregoIndex from './components/entrego-laurel';
import EntregoResumen from './components/entrego-laurel/resumenLaurel';

import CanjeContainer from './containers/canje-laurel';

import ValidacionLaurelesContainer from './containers/validacion-laureles';
import ValidacionLaurelesIndex from './components/validacion-laureles/index';

import HomeContainer from './containers/home';
import AsignarContainer from './containers/asignar-laureles';
import ConfigContainer from './containers/config';
import ConfigValoresContainer from './containers/config/valores';
import ConfigPremiosContainer from './containers/config/premios';
import ConfigPremiosFormContainer from './containers/config/premiosForm';
import ConfigValoresFormContainer from './containers/config/valoresForm';
import { cerrarDialogUsuarioError, listarUltimosLaurelesEntregados, rightMenuShow, actualizaFotoColaborador } from './modules/home';
import { Layout, Drawer, Navigation, Content, Header, List, ListItem, ListItemContent, Grid, Cell, Button, Spinner, IconButton } from 'react-mdl';

let contenido;
/**
 * Ruteador General de la aplicación.
 * @class Router
 */
class Router extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.router = new Navigo();
		contenido = <HomeContainer ruta={'/'} />;
		this.selectContent = this.selectContent.bind(this);
		this.cerrarDialog = this.cerrarDialog.bind(this);
		this.muestraOcultaUltimosLau = this.muestraOcultaUltimosLau.bind(this);
	}
	/**
	 * Inicializa el listener de los cambios de ruta.
	 * @method componentDidMount
	 * @private
	 */
	componentDidMount() {
		this.props.listarUltimosLaurelesEntregados(20, this.props.sesion.token);
		this.props.rightMenuShow(true);
		this.router
			.on('/', () => {
				this.selectContent('/');
			})
			.on('/asignar-laureles', () => {
				this.selectContent('/asignar-laureles');
			})
			.on('/entregar-laurel', () => {
				this.selectContent('/entregar-laurel');
			})
			.on('/recibo-laurel', () => {
				this.selectContent('/recibo-laurel');
			})
			.on('/recibo-laurel/resumen/:idLaurel', (params) => {
				this.selectContent('/recibo-laurel/resumen/:idLaurel', params);
			})
			.on('/entrego-laurel', () => {
				this.selectContent('/entrego-laurel');
			})
			.on('/entrego-laurel/resumen/:idLaurel', (params) => {
				this.selectContent('/entrego-laurel/resumen/:idLaurel', params);
			})
			.on('/canje-laurel', () => {
				this.selectContent('/canje-laurel');
			})
			.on('/validacion-laureles', () => {
				this.selectContent('/validacion-laureles');
			})
			.on('/config', () => {
				this.selectContent('/config');
			})
			.on('/config/valores', () => {
				this.selectContent('/config/valores');
			})
			.on('/config/premios', () => {
				this.selectContent('/config/premios');
			})
			.on('/config/premios/form', () => {
				this.selectContent('/config/premios/form');
			})
			.on('/config/valores/form', () => {
				this.selectContent('/config/valores/form');
			})
			.notFound(() => {
				console.log('ruta no encontrada');
			})
			.resolve();
		//this.props.actualizaFotoColaborador("588780d5e32ce137f7ec2a9f","urlFoto",this.props.sesion.token);
	}
	/**
	 * Configura los componentes por ruta del browser.
	 * @method selectContent
	 * @private
	 */
	selectContent(ruta, params) {
		switch (ruta) {
			case '/':
				contenido = <HomeContainer ruta={ruta} />;
				break;
			case '/asignar-laureles':
				contenido = <AsignarContainer ruta={ruta} />;
				break;
			case '/entregar-laurel':
				contenido = <EntregaContainer ruta={ruta} />;
				break;
			case '/recibo-laurel':
				contenido = <ReciboContainer ruta={ruta}>
					<ReciboIndex />
				</ReciboContainer>;
				break;
			case '/entrego-laurel':
				contenido = <EntregoContainer ruta={ruta}>
					<EntregoIndex />
				</EntregoContainer>;
				break;
			case '/recibo-laurel/resumen/:idLaurel':
				contenido = <ReciboContainer ruta={ruta} >
					<ReciboResumen params={params} />
				</ReciboContainer>;
				break;
			case '/entrego-laurel/resumen/:idLaurel':
				contenido = <EntregoContainer ruta={ruta} >
					<EntregoResumen params={params} />
				</EntregoContainer>;
				break;
			case '/canje-laurel':
				contenido = <CanjeContainer ruta={ruta} />;
				break;
			case '/validacion-laureles':
				contenido = <ValidacionLaurelesContainer ruta={ruta}>
								<ValidacionLaurelesIndex/>
							</ValidacionLaurelesContainer>
				break;
			case '/config':
				contenido = <ConfigContainer ruta={ruta} />;
				break;
			case '/config/valores':
				contenido = <ConfigValoresContainer ruta={ruta} />;
				break;
			case '/config/premios':
				contenido = <ConfigPremiosContainer ruta={ruta} />;
				break;
			case '/config/premios/form':
				contenido = <ConfigPremiosFormContainer ruta={ruta} />;
				break;
			case '/config/valores/form':
				contenido = <ConfigValoresFormContainer ruta={ruta} />;
				break;
		}
		this.forceUpdate();
	}
	componentWillReceiveProps(nextProps) {

		if (nextProps.usuario._id && (this.props.usuario._id !== nextProps.usuario._id)) {
			this.props.actualizaFotoColaborador(nextProps.usuario._id,nextProps.usuario.foto,this.props.sesion.token);
		}
	}
	cerrarDialog(event) {
		event.preventDefault();
		this.props.limpiarError();
	}
	muestraOcultaUltimosLau() {
		this.props.rightMenuShow(!this.props.showMenuRight);
	}

	// Recupera la lista de empleados laureados
	render() {
		return (
			<div id="laureles">
				{this.props.loading}
				{this.props.error.mensaje !== '' && (
					<Dialog>
						<div className="title">
							<span>{this.props.error.titulo}</span>
							<IconButton name="clear" accent onClick={this.cerrarDialog} />
						</div>
						<div className="body">
							<div>
								<div className="texto">
									{this.props.error.mensaje}
								</div>
								<div className="botones">
									<Button raised accent
										onClick={this.cerrarDialog}>
										{'Aceptar'}
									</Button>
								</div>
							</div>
						</div>
					</Dialog>
				)}
				{this.props.loading && (
					<div className="spinner-screen">
						<div className="spinner">
							<Spinner />
						</div>
					</div>
				)}
				<Layout fixedHeader>
					<HeaderLaureles muestraOcultaUltimosLau={this.muestraOcultaUltimosLau} />
					<MenuHamburguesa listaOpciones={['Laureles', 'Mis laureles', 'Premios', 'Valores', 'Estadísticas', 'Administración']} />
					<Grid noSpacing>
						<Cell id="contenidoPrincipal" col={this.props.showMenuRight ? 10 : 12} tablet={6} >
							<div className="menuIzquierdo">
								<br />
								<MenuIconos />
								<Menu
									nombreUsuario={this.props.usuario.get('nombre')}
									emailUsuario={this.props.usuario.get('email')}
									fotoUsuario={this.props.usuario.get('foto')}
									listaOpciones={[{ nombreItem: 'Laureles', claseImagen: 'laurel' }, { nombreItem: 'Mis laureles', claseImagen: 'canjear' }, { nombreItem: 'Premios', claseImagen: 'ribbon' }, { nombreItem: 'Valores', claseImagen: 'valoresIW' }, { nombreItem: 'Estadísticas', claseImagen: 'estadisticas' }, { nombreItem: 'Administración', claseImagen: 'admin' }]} />
							</div>
							<div className="contenido">
								{contenido}
							</div>
						</Cell>
						<Cell id="menuUltimosLaureles" col={2} hideDesktop={!this.props.showMenuRight} hideTablet hidePhone>
							<br />
							<div>
								<strong>{'Ultimos Laureles'}</strong>
								<MenuUltimosLau menuUltimosLaureles={this.props.ultimosGenerales} />
							</div>
						</Cell>
					</Grid>
				</Layout>
			</div>
		);
	}
}

Router.propTypes = {
	loading: PropTypes.bool.isRequired,
	error: PropTypes.object.isRequired,
	usuario: PropTypes.object.isRequired,
	limpiarError: PropTypes.func.isRequired,
	ultimosGenerales: PropTypes.array,
	showMenuRight: PropTypes.bool
};

function mapStateToProps(state) {
	return {
		loading: state.ajaxModule > 0,
		usuario: state.homeModule.get('usuario'),
		ultimosGenerales: state.homeModule.get('ultimosGenerales').toJS(),
		showMenuRight: state.homeModule.get('showMenuRight'),
		sesion: state.homeModule.get('datosIniciales').toJS(),
		error: state.homeModule.get('errorGeneral').toJS()
	};
}

function mapDispatchToProps(dispatch) {
	return {
		limpiarError: () => dispatch(cerrarDialogUsuarioError()),
		rightMenuShow: (show) => dispatch(rightMenuShow(show)),
		listarUltimosLaurelesEntregados: (numeroLaureles, token) => dispatch(
			listarUltimosLaurelesEntregados(numeroLaureles, token)),
		actualizaFotoColaborador: (idColaborador, urlFoto, token) => dispatch(
			actualizaFotoColaborador(idColaborador, urlFoto, token))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Router);
