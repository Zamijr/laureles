/**
 * @module Home
 */
import React, { PropTypes } from 'react';
import { Grid, Cell } from 'react-mdl';
import GrupoContadores from './grupoContadores';
import LaurelesRecibidos from './laurelesRecibidos';

/**
 * La pantalla del Home.
 */
const Home = ({contadores, laurelesRecibidos, premios}) => {
	let rowsLaureles = laurelesRecibidos.map(l => {
		return {
			urlFoto: l.duenio.urlFoto,
			nombreColaborador:  l.duenio.nombre + ' ' + l.duenio.apellidos,
			valor: l.valor.clave
		};
	});
	let listaPremios = premios.map((i) => {
		return (<div key={i._id} className="lista-premios__premio">
			<div>{i.clave}</div>
			<div>
				<span>{i.costo} laurel {i.costo > 1 && 'es               '}</span>
				<span className="lista-premios__canjear">
					Canjear
				</span>
			</div>
		</div>);
	})
	return (
		<section className={'home'}>
			<div className="grupo-contadores"><GrupoContadores contadores={contadores} /></div>
			<Grid className="laurelesRecibidos">
				<Cell col={9} tablet={8} phone={4}>
					<p>{'Quien te ha reconocido'}</p>
					<LaurelesRecibidos rows={rowsLaureles} />
				</Cell>
				<Cell col={3} hidePhone>
					<div className="lista-premios">
						<div className="lista-premios__titulo">
							<strong>{'Lista de premios'}</strong>
							<div className="lista-premios__subTitulo">{'Selecciona el premio que deseas'}</div>
						</div>
						{listaPremios}
					</div>
				</Cell>
			</Grid>
		</section>
	);
};

Home.propTypes = {
	contadores: PropTypes.array.isRequired,
	laurelesRecibidos: PropTypes.array.isRequired
};

export default Home;
