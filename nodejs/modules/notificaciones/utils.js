const moment = require('moment');

fecha = (elem) => {
	elem.fecha = moment(elem.fecha).format('DD/MM/YYYY');
	return elem;
}

	module.exports ={ fecha: fecha	}

