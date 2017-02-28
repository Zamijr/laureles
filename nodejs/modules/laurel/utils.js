/**
* @module Laurel
*/
const moment = require('moment');
/**
 * Coloca en IsoString las fechas del laurel, para poder transportar por http.
 * @method cambiaFechasLaurel
 * @for LaurelType
 */
const cambiaFechasLaurel = (laurel) => {
	laurel.fechaCaducidad = moment(laurel.fechaCaducidad).toISOString();
	if(laurel.fechaAprobacion !== null) {
		laurel.fechaAprobacion = moment(laurel.fechaAprobacion).toISOString();
	}
	return laurel;
};

module.exports = {
	cambiaFechasLaurel
};
