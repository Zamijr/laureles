/**
 * @module Entrega de Laurel
 */
import React, {PropTypes, Component} from 'react';
import {Grid, Cell} from 'react-mdl';
import {Step} from 'react-mdl-extra';
import Buscador from '../buscador';
import StatefulStepper from '../statefulStepper';
import Tarjeta from './tarjeta';
import Mensaje from './mensaje';
import {connect} from 'react-redux';
import {
	entregarLaurel,
	actualizarValorSeleccionado,
	actualizaMensaje1,
	actualizaMensaje2
} from '../../modules/entrega-laurel';

/**
 * La pantalla de entrega de Laurel.
 */
class PanelEntrega extends Component  {

	constructor(props, state) {
		super(props);
		
	}
	render(){
		let valores = this.props.listaValores.map((v) => <Tarjeta key={v._id} clave={v.clave} descripcion={v.descripcion} onClick={()=>this.props.actualizarValorSeleccionado(v)} selected={v._id==this.props.valorSeleccionado._id}/>);
		let entrega = {laurel:this.props.laurel,
			colaborador: this.props.colabSeleccionado._id,
			valor: this.props.valorSeleccionado._id,
			descripcion: [this.props.mensaje1,this.props.mensaje2].join('/!/'),
			token: this.props.sesion.token}
		return (
			<section className={'entrega'}>
				<StatefulStepper horizontal style={{margin:"auto"}} submit={()=>this.props.entregarLaurel(entrega)} >
					<Step title={'Reglas'}>
						<Grid>
							<Cell col={12}>
								<h4>Conoce las reglas para otorgar un laurel</h4>
							</Cell>
							<Cell col={12}>
								<strong>Estos son los criterios que debes tomar en cuenta al momento de dar un laurel:</strong>
							</Cell>
							<Cell col={5} align="middle">
								<div className="contLogoEntrega">
								<a href="#" className="entregaLauLogo" >

								</a>
								</div>
							</Cell>
							<Cell className="reglasPasos" col={7}>
								<div>
									<ul>
										<li>
											<div>
											Se reconocerá entre pares, compañeros de equipo y subordinados.
											</div>
										</li>
										<li><div>No se puede reconocer a jefes directos.</div></li>
										<li><div>Reconocimiento a las buenas prácticas: Considera la forma de trabajar de un colaborador, tomando en cuenta su comportamiento, su creatividad y cómo va mejorando los métodos de trabajo.</div></li>
										<li><div>Reconocimiento al esfuerzo: Destaca el aporte de los colaboradores para completar un proyecto o alcanzar las metas de la empresa, independiente de los resultados.</div></li>
										<li><div>Reconocimiento a la práctica de valores IW: Disciplina, Pro actividad, Responsabilidad, Aprendizaje, Disponibilidad al cambio, Autocrítica e Integridad.</div></li>
									</ul>
								</div>
						</Cell>
					</Grid>
					</Step>
					<Step title={'Colaborador'}>
						<div>
							<h4>Busca y selecciona al colaborador que quieres reconocer</h4>
							<h6><strong>Puedes buscar por nombre o e-mail</strong></h6>
							<Buscador />
						</div>
					</Step>
					<Step title={'Valor'}>
						<div className="valores">
							{valores}
						</div>
					</Step>
					<Step title={'Mensaje'}>
						<h4>¿Porque lé otorgaste este Laurel?¿Qué le quieres decir?</h4>
						<div className="motivos">
							<Grid>
								<Cell col={4} tablet={12} className='motivos__datos'>
									<img className='motivos__datos__foto' src={this.props.colabSeleccionado.foto||''} alt=""/>
									<p className='motivos__datos__nombre'>{this.props.colabSeleccionado.nombre+' '+this.props.colabSeleccionado.apellidos}</p>
									<p className='motivos__datos__puesto'>{this.props.colabSeleccionado.perfil}</p>
								</Cell>
								<Cell col={8} tablet={12} className="motivos__preguntas">
									<p><strong>Responde las siguientes preguntas</strong></p>
									<p className="motivos__preguntas__p">¿Qué situación especifica  te hace pensar en él o en ella para otorgarle este reconocimiento?*</p>
									<Mensaje label={''}
										rows={2}
										limite={120}
										onChange = {this.props.actualizaMensaje1}/>
									<p className="motivos__preguntas__p">¿Cómo te hace sentir esa actitud?*</p>
									<Mensaje label={''}
										rows={2}
										limite={120}
										onChange = {this.props.actualizaMensaje2}/>
								</Cell>
							</Grid>
						</div>
					</Step>
					<Step title={'Resumen'}>
							<h4>Resumen</h4>
							<div className="resumen" >
								<div className="resumen__datos">
									<img className="resumen__datos__foto" src={this.props.colabSeleccionado.foto||''} alt=""/>
									<p className="resumen__datos__nombre">{this.props.colabSeleccionado.nombre+' '+this.props.colabSeleccionado.apellidos}</p>
									<p className="resumen__datos__puesto">{this.props.colabSeleccionado.perfil}</p>
									<p>Te entrego este laurel para reconocer el valor de</p>
									<p><strong>{this.props.valorSeleccionado.clave}</strong></p>
								</div>
							</div>
							<div>
								<p>¿Por qué te otorgo este laurel?</p>
								<p>{this.props.mensaje1}</p>
								<p>¿Cómo me haces sentir?</p>
								<p>{this.props.mensaje2}</p>
							</div>
					</Step>
				</StatefulStepper>
			</section>
		);
	}
};

function mapStateToProps(state) {
	return {
		listaValores: state.entregaLaurelModule.get("listaValores").toJS(),
		colabSeleccionado: state.entregaLaurelModule.get("cSeleccionado").toJS(),
		valorSeleccionado: state.entregaLaurelModule.get("vSeleccionado").toJS(),
		mensaje1: state.entregaLaurelModule.get("mensaje1"),
		mensaje2: state.entregaLaurelModule.get("mensaje2"),
		usuario: state.homeModule.get("usuario").toJS(),
		sesion: state.homeModule.get("datosIniciales").toJS(),
		laurel: state.entregaLaurelModule.get("laurel")
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actualizaMensaje1: (event)=>{dispatch(actualizaMensaje1(event))},
		actualizaMensaje2: (event)=>{dispatch(actualizaMensaje2(event))},
		actualizarValorSeleccionado: (valor)=>{dispatch(actualizarValorSeleccionado(valor))},
		entregarLaurel: (entrega)=>{dispatch(entregarLaurel(entrega))}
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(PanelEntrega)
