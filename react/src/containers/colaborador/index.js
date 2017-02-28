import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class ColaboradorContainer extends React.Component {

	constructor(props, context) {
		super(props, context); 	
	} 

	render() {
		return (
			<div>
				{'hola'}
				{this.props.ruta}
				{'vaca' + this.props.loading}
			</div>
		);
	}
}

ColaboradorContainer.propTypes = {
	loading: PropTypes.bool.isRequired
}; 

function mapStateToProps(state) {
	return {
		loading: state.ajaxModule > 0
	};
}

function mapDispatchToProps(dispatch) {
	return {
		
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ColaboradorContainer);
