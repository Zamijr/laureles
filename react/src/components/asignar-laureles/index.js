/**
 * @module Laurel
 */
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Grid, Cell, Button, RadioGroup, Radio} from 'react-mdl';
import {cambiarNumeroAsignacion, cambiarPeriodoAsignacion, asignarLaureles} from '../../modules/asignar-laureles';
/**
 * La pantalla de Asignar
 */
class AsignarLaureles extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
		<section className={'laurel'}>
			<h4>{'Asignación de Laureles'}</h4>
			<Grid>
				<Cell col={6} tablet={8} phone={4}>
					<Grid className="numeroLaurelesAsignar">
						<Cell className="titulo" col={12} tablet={8} phone={4}>
							{'Número de Laureles a asignar:'}
							<br /> 
						</Cell>
					</Grid>
					<Grid>
						<Cell col={12} tablet={8} phone={4}>
						<RadioGroup
							className="numeroLaurelesAsignar"
							onChange={(event) => this.props.cambiarNumeroAsignacion(event,
								this.props.numeroAsignar)}
							name="numeroLaurelesAsignar"
							value={this.props.numeroAsignar}>
                <Radio value="2" ripple>{' 2 '}</Radio>
                <Radio value="4" ripple>{' 4 '}</Radio>
                <Radio value="6" ripple>{' 6 '}</Radio>
								<Radio value="8" ripple>{' 8 '}</Radio>
              </RadioGroup>
						</Cell>
					</Grid>
				</Cell>

				<Cell col={6} tablet={8} phone={4}>
					<Grid className="periodoLaurelAsignar">
						<Cell className="titulo" col={12} tablet={8} phone={4}>
							{'Periodo en el que los quieres asignar:'}
							<br />
						</Cell>
					</Grid>
					<Grid>
						<Cell  col={12} tablet={8} phone={4}>
							<RadioGroup
								className="periodoLaurelAsignar"
								onChange={(event)=>this.props.cambiarPeriodoAsignacion(event,
									this.props.periodoAsignar)}
								name="periodoLaurelAsignar"
								value={this.props.periodoAsignar}
							>
                <Radio value="1" ripple>{' Mes '}</Radio>
                <Radio value="2" ripple>{' Bimestre '}</Radio>
								<Radio value="3" ripple>{' Trimestre '}</Radio>
                <Radio value="6" ripple>{' Semestre '}</Radio>
              </RadioGroup>
						</Cell>
					</Grid>
				</Cell>
			</Grid>

			<Grid>
				<Cell col={6} tablet={8} phone={4}>
					{''}
				</Cell>
				<Cell className="botones" col={6} tablet={8} phone={4}>
					<Button raised ripple onClick={() => document.location='#/'}>{'CANCELAR'}</Button>
					&emsp;
					<Button raised accent ripple onClick={()=>this.props.asignarLaureles(
						this.props.numeroAsignar, this.props.periodoAsignar, this.props.sesion.token
					)} >{'ASIGNAR LAURELES'}</Button>
				</Cell>
			</Grid>
		</section>
	);
	}

}//llave de la clase

AsignarLaureles.propTypes = {
	cambiarNumeroAsignacion: PropTypes.func,
	numeroAsignar: PropTypes.string,
	cambiarPeriodoAsignacion: PropTypes.func,
	periodoAsignar: PropTypes.string,
	asignarLaureles: PropTypes.func,
	sesion: PropTypes.object
};

function mapStateToProps (state) {
	return {
		numeroAsignar: state.asignarLaurelModule.get('numeroAsignar'),
		periodoAsignar: state.asignarLaurelModule.get('periodoAsignar'),
		sesion: state.homeModule.get('datosIniciales').toJS(),
		usuario: state.homeModule.get('usuario').toJS()
	};
}

function mapDispatchToProps (dispatch) {
	return {
		cambiarNumeroAsignacion: (event, numero) => dispatch(cambiarNumeroAsignacion(event, numero)),
		cambiarPeriodoAsignacion: (event, periodo) => dispatch(cambiarPeriodoAsignacion(event, periodo)),
		asignarLaureles: (numero, periodo, token) => dispatch(
			asignarLaureles(numero, periodo, token))
	};
}

export default connect (mapStateToProps, mapDispatchToProps)(AsignarLaureles);
