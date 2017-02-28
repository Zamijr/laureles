const mongoose = require('mongoose');
const {Schema} = mongoose;

const PremioSchema = new Schema({
	clave: {type: String, default: ''},
	tipo: {type: String, default: ''},
	costo: {type: Number, default: 0},
	activo: { type: Boolean, default: true }
});

const ValorSchema = new Schema({
	clave: {type: String, default: ''},
	descripcion: {type: String, default: ''},
	activo: { type: Boolean, default: true }
});

module.exports = {
	PremioSchema: mongoose.model('Premio', PremioSchema, 'Premios'),
	ValorSchema: mongoose.model('Valor', ValorSchema, 'Valores')
};
