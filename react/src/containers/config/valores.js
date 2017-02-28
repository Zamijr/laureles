import React, {PropTypes} from 'react';
import {DataTable, TableHeader, Button} from 'react-mdl';
import {connect} from 'react-redux';
import {listarValores, setControles, resetForm, setForm, agregarValor, editarValor, borrarValor} from '../../modules/config'

class ConfigValoresContainer extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.cambiarControles = this.cambiarControles.bind(this);
		this.borrar = this.borrar.bind(this);
		this.editar = this.editar.bind(this);
		this.agregar = this.agregar.bind(this);
	} 

	componentDidMount() {
		this.props.listarValores(this.props.sesion.token);
	}

	cambiarControles(seleccion) {
		let controles = {
			editar: false,
			borrar: false
		};

		if (seleccion.length) {
			controles = {
			editar: true,
			borrar: true
		};
			if (seleccion.length > 1) {
				controles.editar = false;
			}
		}
		this.props.setControles(controles,seleccion);
	}

	agregar () {
		document.location='/#/config/valores/form';
		this.props.resetForm('valorForm');
	}

	borrar(){
		let seleccion = this.props.seleccionados;
		for (let i in seleccion) {
			this.props.borrarValor(seleccion[i],this.props.sesion.token);
		}
	}

	editar() {
		let elemento = this.props.seleccionados[0];
		let lista = this.props.listaValores;

		for (let i in lista) {
			if (lista[i]._id === elemento) {
				elemento = {};
				elemento.id = lista[i]._id;
				elemento.clave = lista[i].clave;
				elemento.descripcion = lista[i].descripcion;
			}
		}

		document.location = '/#/config/valores/form';
		this.props.setForm(elemento,'valorForm');
	}

	render() {
		return (
			<div style={{padding: '15px'}}>
				<h2>Administración de catálogo de valores</h2>
				{this.props.seleccionados}
				<DataTable shadow={0} rows={this.props.listaValores} className="tabla"
					rowKeyColumn="_id" selectable onSelectionChanged={(seleccion)=>this.cambiarControles(seleccion)}>
					<TableHeader name="clave">{'Valor'}</TableHeader>
					<TableHeader name="descripcion">{'Descripción'}</TableHeader>
				</DataTable>
				<br/>
				<div>
					{this.props.controles.editar && <Button colored raised onClick={this.editar}>{'Editar'}</Button>}
					{' '}{this.props.controles.borrar && <Button accent raised onClick={this.borrar}>{'Borrar'}</Button>}
					{' '}<Button raised onClick={this.agregar}>{'Agregar'}</Button>
				</div>
			</div>
		);
	}
}

ConfigValoresContainer.propTypes = {
	seleccionados: PropTypes.array,
	listaValores: PropTypes.array.isRequired,
	controles: PropTypes.object.isRequired,
	sesion: PropTypes.object.isRequired,
	listarValores: PropTypes.func,
	setControles: PropTypes.func,
	resetForm: PropTypes.func,
	agregarValor: PropTypes.func,
	editarValor: PropTypes.func,
	borrarValor: PropTypes.func
}; 


function mapStateToProps(state) {
	return {
		seleccionados: state.configModule.get('seleccionados').toJS(),
		controles: state.configModule.get('controles').toJS(),
		listaValores: state.configModule.get('listaValores').toJS(),
		sesion: state.homeModule.get('datosIniciales').toJS()
	};
}

function mapDispatchToProps(dispatch) {
	return {
		listarValores: (token)=>dispatch(listarValores(token)),
		setControles: (controles,seleccionados)=>dispatch(setControles(controles,seleccionados)),
		setForm: (elemento,form)=>dispatch(setForm(elemento,form)),
		resetForm: (form)=>dispatch(resetForm(form)),
		agregarValor: (datos,token)=>dispatch(agregarValor(datos,token)),
		editarValor: (idValor,datos,token)=>dispatch(editarValor(idValor,datos,token)),
		borrarValor: (idValor,token)=>dispatch(borrarValor(idValor,token))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigValoresContainer);
