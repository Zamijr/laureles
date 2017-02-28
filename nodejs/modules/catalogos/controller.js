const PremioSchema = require('./schema').PremioSchema;
const ValorSchema = require('./schema').ValorSchema;
const log = require('../../log');

class CatalogoController {

	static nuevoPremio({clave, tipo, costo}) {
		return new Promise((resolve, reject) => {
			let tipoSchema = new PremioSchema({clave, tipo, costo});
			tipoSchema.activo = true;
			tipoSchema.save((err) => {
				if (err) {
					reject(err);
				} else {
					PremioSchema.find({activo:true},(err, TiposPremio) => {
						if (err) {
							reject(err);
						} else {
							resolve(TiposPremio.map(elem => {
								return elem.toObject();
							}));
						}
					});
				}
			});
		});
	}

	static getPremioById(idPremio) {
		return new Promise((resolve, reject) => {
			PremioSchema.findById(idPremio, (err, premio) => {
				if (err) {
					reject(err);
				} else {
					resolve(premio.toObject());
				}
			});
		});
	}

	static getTiposPremio() {
		return new Promise((resolve, reject) => {
			PremioSchema.find({activo: true}, (err, TiposPremio) => {
				if (err) {
					reject(err);
				} else {
					resolve(TiposPremio.map(elem => {
						return elem.toObject();
					}));
				}
			});
		});
	}

	static updtPremio(idPremio,premioObj) {
		return new Promise((resolve, reject) => {
			PremioSchema.findById(idPremio,(err, premio) => {
				if (err) {
					reject(err);
				} else {
					log.info('Premio encontrado');
					for(let i in premioObj) {
						premio[i] = premioObj[i];
					}
					premio.save((err, premio) => {
						if(err) {
							log.error('No se pudieron actualizar los datos del premio', err);
							reject(err);
						} else {

							PremioSchema.find({activo:true},(err, TiposPremio) => {
								if (err) {
									reject(err);
								} else {
									resolve(TiposPremio.map(elem => {
										return elem.toObject();
									}));
								}
							});
						}
					});
				}
			});
		});
	}

	static nuevoValor({clave, descripcion}) {
		console.log(clave,descripcion)
		return new Promise((resolve, reject) => {
			let valorSchema = new ValorSchema({clave, descripcion});
			valorSchema.activo = true;
			valorSchema.save((err) => {
				if (err) {
					reject(err);
				}	else {
					ValorSchema.findOne({clave: clave}, (err, valor)=>{
						if (err) {
							reject(err);
						} else {
							resolve(valor.toObject());
						}
					});
				}
			});
		});
	}

	static getValores() {
		return new Promise((resolve, reject) => {
			ValorSchema.find({activo: true}, (err, valores) => {
				if (err) {
					reject(err);
				} else {
					log.info('Recuperando lista de valores');
					resolve(valores.map(elem => {
						return elem.toObject();
					}));
				}
			});
		});
	}

	static updtValor(idValor,valorObj) {
		return new Promise((resolve, reject) => {
			ValorSchema.findById(idValor,(err, valor) => {
				if (err) {
					reject(err);
				} else {
					log.info('Valor encontrado');
					for(let i in valorObj) {
						valor[i] = valorObj[i];
					}
					valor.save((err, valor) => {
						if(err) {
							log.error('No se pudieron actualizar los datos del valor', err);
							reject(err);
						} else {

							ValorSchema.find({activo:true},(err, TiposValor) => {
								if (err) {
									reject(err);
								} else {
									resolve(TiposValor.map(elem => {
										return elem.toObject();
									}));
								}
							});
						}
					});
				}
			});
		});
	}

}

module.exports = CatalogoController;
