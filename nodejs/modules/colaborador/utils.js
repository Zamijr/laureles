const LaurelController = require('../laurel/controller');
const log = require('../../log');

const obtenerLaureles = (colaborador) => {
	return new Promise((resolve, reject) => {
		if(colaborador !== null && colaborador._id !== null) {
			Promise.all([
				LaurelController.laurelesPorEntregar(colaborador._id),
				LaurelController.laurelesRecibidos(colaborador._id),
				LaurelController.laurelesEntregados(colaborador._id),
				LaurelController.laurelesPorCanjear(colaborador._id)
			]).then(values => {
				resolve({
					colaborador, 
					laurelesPorEntregar: values[0],
					laurelesRecibidos: values[1],
					laurelesEntregados: values[2],
					laurelesPorCanjear: values[3]
				});
			}, reason => {
				log.error(reason);
				reject(reason);
			});
		} else {
			resolve(null);
		}
	});
};

module.exports = {
	obtenerLaureles
};
