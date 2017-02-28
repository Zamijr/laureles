/**
* @module Laurel
*/
const mongoose = require('mongoose');
const {Schema} = mongoose;
const moment = require('moment');
/**
 * El esquema de mongo para los laureles
 * @class LaurelSchema
 */
const LaurelSchema = new mongoose.Schema( {
	duenio: { type: Schema.Types.ObjectId, ref: 'Colaborador' },
	colaborador: { type: Schema.Types.ObjectId, ref: 'Colaborador', default: null },
	entregado: { type: Boolean, default: false },
	aprobado: { type: Boolean, default: false },
	canjeado: { type: Boolean, default: false },
	sinCanje: { type: Boolean, default: false },
	valor: { type: Schema.Types.ObjectId, ref: 'Valor', default: null },
	descripcion: [String],
	mensajeRechazo: {type: String, default: ''},
	fechaCaducidad: { type: Date, default: null },
	fechaEntrega: { type: Date, default: null },
	fechaCanje: { type: Date, default: null },
	fechaAprobacion: { type: Date, default: null },
	fechaGeneracion: { type: Date, default: moment().toDate() }
});

module.exports = mongoose.model('Laurel', LaurelSchema, 'Laureles');
