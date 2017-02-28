/**
 * @module General
 */
import React, {PropTypes} from 'react';
/**
 * Muestra un dialogo, con contenido.
 */
const Laureado = ({laurel}) => {
	return (
		<div className="laureado">
			<div className="laureado__foto">
				<img src={laurel.colaborador.foto||''} alt=""/>
			</div>
			<div className="laureado__texto">
				<div className="laureado__texto__nombre">{laurel.colaborador.nombre}
				{laurel.colaborador.apellidos}</div>
				<div className="laureado__texto__valor">{laurel.valor.clave}</div>
			</div>
		</div>
	);
};

Laureado.propTypes = {
	laurel: PropTypes.object
};

export default Laureado;
