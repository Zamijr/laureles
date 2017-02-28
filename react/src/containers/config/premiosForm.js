import React, {PropTypes} from 'react';
import {DataTable, TableHeader, Button, Grid, Cell, Textfield, Radio, RadioGroup} from 'react-mdl';
import {connect} from 'react-redux';
import {updCampo, editarPremio, agregarPremio} from '../../modules/config'

class ConfigPremiosFormContainer extends React.Component {

	constructor(props) {
		super(props);

		this.agregar = this.agregar.bind(this);
		this.editar = this.editar.bind(this);
	}

	agregar() {
		this.props.agregarPremio(this.props.premio,this.props.sesion.token);
	}

	editar() {
		this.props.editarPremio(this.props.premio.id,this.props.premio,this.props.sesion.token)
	}

	render() {
		return (
			<div style={{padding: '15px'}}>
				<h2>{'Editar premio'}</h2>
				<Grid>
					<Cell col={6} phone={12}>
						<Textfield  onChange={(e)=>this.props.updCampo(e,'premioForm')} label="Descripcion del premio"
						value={this.props.premio.clave} name="clave"/>
					</Cell>
					<Cell col={6} phone={12}>
						<RadioGroup name="tipo" value={this.props.premio.tipo} container="div"
							childContainer="div" onChange={(e)=>this.props.updCampo(e,'premioForm')}>
							<Radio value="tiempo">{' Tiempo'}</Radio>
							<Radio value="especie">{' Especie'}</Radio>
						</RadioGroup>
					</Cell>
					<Cell col={6} phone={12}>
						<Textfield  onChange={(e)=>this.props.updCampo(e,'premioForm')} name="costo" value={this.props.premio.costo}
						pattern="-?[0-9]*(\.[0-9]+)?" error="Debe usarse un valor numérico" label="Costo"/>
					</Cell>
					<Cell col={12}>
						<Button raised onClick={()=>document.location='/#/config/premios'}>{'Cancelar'}</Button>{' '}
						{!this.props.premio.id && <Button colored raised onClick={this.agregar}>{'Agregar'}</Button>}
						{this.props.premio.id && <Button colored raised onClick={this.editar}>{'Actualizar'}</Button>}
					</Cell>
				</Grid>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		sesion: state.homeModule.get("datosIniciales").toJS(),
		premio: state.configModule.get('premioForm').toJS()
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updCampo: (evento,form)=>dispatch(updCampo(evento,form)),
		agregarPremio: (premioObj,token)=>dispatch(agregarPremio(premioObj,token)),
		editarPremio: (idPremio,premioObj,token)=>dispatch(editarPremio(idPremio,premioObj,token)),
		resetForm: (form)=>dispatch(resetForm(form))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPremiosFormContainer);
