const ColaboradorType = require('./type');
const DataLoader = require('dataloader');

const ColaboradorLoader = new DataLoader(
	keys => {
		Promise.all(keys.map(ColaboradorType.buscarColaboradorPorId));
	}
);

module.exports = ColaboradorLoader;
