/**
* @module Colaborador
*/
const mongoose = require('mongoose');
const {Schema} = mongoose;
/**
 * El esquema de mongo para el colaborador
 * @class ColaboradorSchema
 */
const ColaboradorSchema = new Schema({
	idSalesforce: { type: String, unique: true, default: '' },
	email: {type: String, default: ''},
	nombre: {type: String, default: ''},
	apellidos: {type: String, default: ''},
	ultimaFechaModificacionSalesforce: {type: Date, default: null},
	fechaIngreso: {type: Date, default: null},
	fechaNacimiento: {type: Date, default: null},
	familiares: {type: Array, default: []},
	area: {type: String, default: ''},
	perfil: {type: String, default: ''},
	fechaBaja: {type: String, default: ''}
});

module.exports = mongoose.model('Colaborador', ColaboradorSchema, 'Colaboradores');
