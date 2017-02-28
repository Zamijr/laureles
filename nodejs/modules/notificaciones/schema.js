/**
* @module Notificacion
*/
const mongoose = require('mongoose');
const {Schema} = mongoose;
const moment = require('moment');
/**
 * El esquema de mongo para los laureles
 * @class NotificacionSchema
 */
const NotificacionSchema = new mongoose.Schema( {
	colaborador: { type: Schema.Types.ObjectId, ref: 'Colaborador' },
	titulo: {type: String, default: ''},
	descripcion: {type: String, default: ''},
	tipo: { type: Number, default: 0},
	fecha: { type: Date, default: moment().toDate() }
});

module.exports = mongoose.model('Notificacion', NotificacionSchema, 'Notificaciones');
