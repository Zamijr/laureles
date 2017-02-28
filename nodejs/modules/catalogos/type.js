const CatalogosController = require('./controller');
const log = require('../../log');

class PremioType {

	static nuevoPremio(premioObj) {
		return new Promise((resolve, reject) => {
			CatalogosController.nuevoPremio(premioObj).then((result) => {
				return resolve(result);
			}).catch((error) => {
				log.error('Error al guardar el tipo de premio', error);
				reject(error);
			});
		});
	}

	static getTodos() {
		return new Promise((resolve, reject) => {
			CatalogosController.getTiposPremio().then((result) => {
				resolve(result);
			}).catch((error) => {
				log.error('Error al consultar el catalogo de tipos de Premio', error);
				reject(error);
			});
		});		
	}

	static modificarPremio(idPremio,datos) {
		return new Promise((resolve, reject) => {
			CatalogosController.updtPremio(idPremio,datos).then((result) => {
				resolve(result);
			}).catch((error) => {
				log.error('Error al consultar el catalogo de tipos de Premio', error);
				reject(error);
			});
		});
	}

	static deshabilitarPremio(idPremio) {
		return new Promise((resolve, reject) => {
			let datos = {activo: false};
			CatalogosController.updtPremio(idPremio,datos).then((result) => {
				resolve(result);
			}).catch((error) => {
				log.error('Error al consultar el catalogo de tipos de Premio', error);
				reject(error);
			});
		});
	}
}

class ValorType {

	static nuevoValor(valor) {
		return new Promise((resolve, reject) => {
			CatalogosController.nuevoValor(valor).then((result) => {
				return resolve(result);
			}).catch((error) => {
				log.error('Error al guardar el valor', error);
				reject(error);
			});
		});
	}

	static getValores() {
		return new Promise((resolve, reject) => {
			CatalogosController.getValores().then((result) => {
				return resolve(result);
			}).catch((error) => {
				log.error('Error al consultar el catalogo de tipos de Premio', error);
				reject(error);
			});
		});
	}

	static modificarValor(idValor,datos) {
		return new Promise((resolve, reject) => {
			CatalogosController.updtValor(idValor,datos).then((result) => {
				resolve(result);
			}).catch((error) => {
				log.error('Error al consultar el catalogo de tipos de Valor', error);
				reject(error);
			});
		});
	}

	static deshabilitarValor(idValor) {
		return new Promise((resolve, reject) => {
			let datos = {activo: false};
			CatalogosController.updtValor(idValor,datos).then((result) => {
				resolve(result);
			}).catch((error) => {
				log.error('Error al consultar el catalogo de tipos de Valor', error);
				reject(error);
			});
		});
	}

}


module.exports = { PremioType, ValorType };
