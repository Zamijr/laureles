import React, {PropTypes} from 'react';
import {DataTable, TableHeader, Button, Grid, Cell, Textfield, Radio, RadioGroup} from 'react-mdl';
import {connect} from 'react-redux';
import {updCampo, editarValor, agregarValor } from '../../modules/config'

class ConfigValorsFormContainer extends React.Component {

	constructor(props) {
		super(props);

		this.agregar = this.agregar.bind(this);
		this.editar = this.editar.bind(this);
	}

	agregar() {
		this.props.agregarValor(this.props.valor,this.props.sesion.token);
	}

	editar() {
		this.props.editarValor(this.props.valor.id,this.props.valor,this.props.sesion.token)
	}

	render() {
		return (
			<div style={{padding: '15px'}}>
				<h2>{'Editar Valor'}</h2>
				<Grid>
					<Cell col={6} phone={12}>
						<Textfield  onChange={(e)=>this.props.updCampo(e,'valorForm')} label="Descripcion del valor"
						value={this.props.valor.clave} name="clave"/>
					</Cell>
					<Cell col={6} phone={12}>
						<Textfield  onChange={(e)=>this.props.updCampo(e,'valorForm')} name="descripcion" value={this.props.valor.descripcion}
						rows={4} label="Descripción"/>
					</Cell>
					<Cell col={12}>
						<Button raised onClick={()=>document.location='/#/config/valores'}>{'Cancelar'}</Button>{' '}
						{!this.props.valor.id && <Button colored raised onClick={this.agregar}>{'Agregar'}</Button>}
						{this.props.valor.id && <Button colored raised onClick={this.editar}>{'Actualizar'}</Button>}
					</Cell>
				</Grid>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		sesion: state.homeModule.get("datosIniciales").toJS(),
		valor: state.configModule.get('valorForm').toJS()
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updCampo: (evento,form)=>dispatch(updCampo(evento,form)),
		agregarValor: (valorObj,token)=>dispatch(agregarValor(valorObj,token)),
		editarValor: (idValor,valorObj,token)=>dispatch(editarValor(idValor,valorObj,token))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigValorsFormContainer);
