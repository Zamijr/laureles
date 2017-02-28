import React, {PropTypes} from 'react';
import {DataTable, TableHeader, Button} from 'react-mdl';
import {connect} from 'react-redux';
import {listarPremios, setControles, borrarPremio, setForm, resetForm } from '../../modules/config'

class ConfigPremiosContainer extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.cambiarControles = this.cambiarControles.bind(this);
		this.borrar = this.borrar.bind(this);
		this.editar = this.editar.bind(this);
		this.agregar = this.agregar.bind(this);
	}

	componentDidMount() {
		this.props.listarPremios(this.props.sesion.token);
	}

	cambiarControles(seleccion) {
		let controles = {
			editar: false,
			borrar: false
		};
		if (seleccion.length) {
			controles.editar = true;
			controles.borrar = true;
			if (seleccion.length > 1) {
				controles.editar = false;
			}
		}
		this.props.setControles(controles,seleccion);
	}

	borrar() {
		let seleccion = this.props.seleccionados;
		for (let i in seleccion) {
			this.props.borrarPremio(seleccion[i],this.props.sesion.token);
		}
	}

	agregar() {

	}

	editar() {
		let elemento = this.props.seleccionados[0];
		let lista = this.props.listaPremios;

		for (let i in lista) {
			if (lista[i]._id === elemento) {
				elemento = {};
				elemento.id = lista[i]._id;
				elemento.clave = lista[i].clave;
				elemento.tipo = lista[i].tipo;
				elemento.costo = lista[i].costo;
			}
		}

		document.location = '/#/config/premios/form';
		this.props.setForm(elemento,'premioForm');
	}

	render() {
		return (
			<div style={{padding: '15px'}}>
				<h2>Administración de catálogo de premios</h2>
				<DataTable shadow={0} rows={this.props.listaPremios} className="tabla"
					rowKeyColumn="_id" selectable onSelectionChanged={(seleccion)=>this.cambiarControles(seleccion)}>
					<TableHeader name="clave">{'Premio'}</TableHeader>
					<TableHeader name="tipo">{'Tipo'}</TableHeader>
					<TableHeader name="costo">{'Costo'}</TableHeader>
				</DataTable>
				<br/>
				<div>
					{this.props.controles.editar && <Button colored raised onClick={this.editar}>{'Editar'}</Button>}
					{' '}{this.props.controles.borrar && <Button accent raised onClick={this.borrar}>{'Borrar'}</Button>}
					{' '}<Button raised onClick={()=>{document.location='/#/config/premios/form';this.props.resetForm('premioForm');}}>{'Agregar'}</Button>
				</div>
			</div>
		);
	}
}

ConfigPremiosContainer.propTypes = {
	seleccionados: PropTypes.array.isRequired,
	controles: PropTypes.object.isRequired,
	listaPremios: PropTypes.array.isRequired,
	sesion: PropTypes.object.isRequired,
	listarPremios: PropTypes.func,
	setControles: PropTypes.func,
	borrarPremio: PropTypes.func,
	setForm: PropTypes.func,
	resetForm: PropTypes.func
}; 


function mapStateToProps(state) {
	return {
		seleccionados: state.configModule.get('seleccionados').toJS(),
		controles: state.configModule.get('controles').toJS(),
		listaPremios: state.configModule.get('listaPremios').toJS(),
		sesion: state.homeModule.get('datosIniciales').toJS()
	};
}

function mapDispatchToProps(dispatch) {
	return {
		listarPremios: (token)=>dispatch(listarPremios(token)),
		setControles: (controles,seleccion)=>dispatch(setControles(controles,seleccion)),
		borrarPremio: (idPremio,token)=>dispatch(borrarPremio(idPremio,token)),
		setForm: (elemento,form)=>dispatch(setForm(elemento,form)),
		resetForm: (form)=>dispatch(resetForm(form))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPremiosContainer);
