/**
 * @module AsignarLaureles
 */
import React, {PropTypes} from 'react';
import AsignarLaurel from '../../components/asignar-laureles';
/**
 * @class AsignarLaureles
 */
class AsignarLaureles extends React.Component {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div>
				<AsignarLaurel/>
			</div>
		);
	}
}

AsignarLaureles.propTypes = {
	ruta: PropTypes.string.isRequired
};

export default AsignarLaureles;
