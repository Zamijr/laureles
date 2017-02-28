import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class ColaboradorContainer extends React.Component {

	constructor(props, context) {
		super(props, context); 	
	} 

	render() {
		return (
			<div style={{padding: '10px'}}>
				<h2>Configuración</h2>
				<ul>
					<li><a href="/#/config/valores">Administrar Catálogo de valores</a></li>
					<li><a href="/#/config/premios">Administrar Catálogo de premios</a></li>
				</ul>
			</div>
		);
	}
}

ColaboradorContainer.propTypes = {
	
}; 



//export default connect(mapStateToProps, mapDispatchToProps)(ColaboradorContainer);
export default ColaboradorContainer;
