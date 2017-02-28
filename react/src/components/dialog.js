/**
 * @module General
 */
import React, {PropTypes} from 'react';
/**
 * Muestra un dialogo, con contenido.
 */
const Dialog = ({children}) => {
	return (
		<div id="modalDialog">
			<div className="content">
				{children}
			</div>
		</div>
	);
};

Dialog.propTypes = {
	children: PropTypes.array
};

export default Dialog;
