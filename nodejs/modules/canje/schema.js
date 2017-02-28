/**
* @module Canje
*/
const mongoose = require('mongoose');
const {Schema} = mongoose;
const moment = require('moment');
/**
 * El esquema de mongo para los laureles
 * @class CanjeSchema
 */
const CanjeSchema = new mongoose.Schema( {
	duenio: { type: Schema.Types.ObjectId, ref: 'Colaborador' },
	premio: { type: Schema.Types.ObjectId, ref: 'Premio', default: null },
	laurelesCanje: {type: Array, default: []},
	fechaCanje: { type: Date, default: moment().toDate() }
});

module.exports = mongoose.model('Canje', CanjeSchema, 'Canjes');
