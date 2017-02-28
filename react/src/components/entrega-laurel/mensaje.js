/**
 * @module EntregaLaurel
 */
import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import initialState from '../../modules/entrega-laurel/initialState';
import { Textfield } from 'react-mdl';
/**
 * Formulario de búsqueda de colaborador.
 */

class Mensaje extends Component {
	constructor(props) {
		super(props);
		this.state = {actual: this.props.limite};
		this.change = this.change.bind(this);
	}

	change(e){
		this.setState({actual: (this.props.limite - e.target.value.length)});
		this.props.onChange(e);
	};

	render(){
		return (
			<div>
				<Textfield
					rows={this.props.rows}
					style={{width:'100%'}}
					label={this.props.label}
			    onChange={this.change}
				/>
				<p style={{textAlign:'right'}}>{this.state.actual}/{this.props.limite}</p>
			</div>
		)
	};
}

export default Mensaje