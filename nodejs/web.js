/**
 * @module General
 */
const express = require('express');
const {
	statusResponses
} = require('./config/constants');
const graphqlHTTP = require('express-graphql');
const {
	schema,
	root
} = require('./modules');

const log = require('./log');

const google = require('googleapis');
const googleAuth = require('google-auth-library');
const plus = google.plus('v1');
const credentials = require('./credentials/client_secret.json');

const {
	generaToken,
	validaToken,
	paginaInicio,
	paginaNoEmpleados
} = require('./utils');
const colaboradorLoader = require('./modules/colaborador/dataLoader');
/**
 * Configura los endpoints del servidor Graphql.
 * @class Web
 */
/**
 * La aplicacion del tipo express.
 * @property app
 * @type {Express}
 */
let app = express();
app.use((req, res, next) => {
	res.removeHeader('x-powered-by');

	next();
});
let allowCrossDomain = function (req, res, next) {
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, ' +
		'Authorization, X-Requested-With');
	next();
};
app.use(allowCrossDomain);



log.info('Leyendo token de las peticiones');
app.use('/laureles/business', (req, res, next) => {
	const token = req.header('authorization') || req.header('Authorization');
	try {
		req.decoded = validaToken(token);
		next();
	} catch (err) {
		res.status(statusResponses.UNAUTHORIZED).write('No cuenta con permiso para consultar la información');
	}
});

log.info('Configurando directorio publico ' + __dirname + '/assets');
app.use('/assets', express.static(__dirname + '/assets'));

log.info('Configurando endpoint GET /login');
app.get('/laureles/login', (req, res) => {
	const {
		client_secret,
		client_id,
		redirect_uris
	} = credentials.web;
	const auth = new googleAuth();
	let oauth2Client = new auth.OAuth2(client_id, client_secret, redirect_uris[1]);
	log.info('Generando el token del servicio code:' + req.query.code);
	oauth2Client.getToken(req.query.code, function (err, tokens) {
		if (!err) {
			log.info('Token correcto');
			oauth2Client.setCredentials(tokens);
			log.info('Obteniendo la información del perfil');
			plus.people.get({
				userId: 'me',
				auth: oauth2Client
			}, (err2, response) => {
				if (!err2) {
					log.info('Generando el token del usuario');
					const {
						token,
						foto,
						email
					} = generaToken(response);
					log.info('Respuesta del token generada');
					res.set(token, foto, email);
					log.info('token!!' + token);
					if (token === '') {
						res.status(statusResponses.OK).write(paginaNoEmpleados);
					} else {
						res.setHeader('Content-Type', 'text/html');
						res.writeHead(res.statusCode);
						res.status(statusResponses.OK).write(paginaInicio(email, foto, token));
						res.end();
					}
				} else {
					log.error('Ocurrìo un error al obtener la información del perfil', err2);
					res.write(err2);
				}
			});
		} else {
			log.error('Ocurrìo un error al revisar el perfil', err);
			res.write(err);
		}
	});
});



log.info('Configurando endpoint GET /urlLogin');
app.get('/laureles', (req, res) => {
	const {
		client_secret,
		client_id,
		redirect_uris
	} = credentials.web;
	const auth = new googleAuth();
	let oauth2Client = new auth.OAuth2(client_id, client_secret, redirect_uris[1]);
	log.info('Solicitando url para acceso');

	let url = oauth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: [
			'https://www.googleapis.com/auth/plus.me',
			'email',
			'profile'
		]
	});
	log.info('Url obtenida');
	log.debug(url);
	res.redirect(statusResponses.PERMANENT_REDIRECT, url);
});

if (process.env.NODE_ENV !== 'production') {

	log.info('Sirve para pedir un token para las peticiones en desarrollo');
	app.get('/getToken', (req, res) => {
		log.info('Generando el token del usuario');
		let response = {
			domain: 'interware.com.mx',
			emails: [{
				value: 'ndominguez@interware.com.mx'
			}],
			image: {
				url: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50'
			}
		};
		const {
			token,
			foto,
			email
		} = generaToken(response);
		log.info('Respuesta del token generada');
		if (token === '') {
			res.status(statusResponses.OK).write(paginaNoEmpleados);
		} else {
			//console.log('Contenido: '+ paginaInicio(email, foto, token));
			res.setHeader('Content-Type', 'text/html');
			res.writeHead(res.statusCode);
			res.status(statusResponses.OK).write(paginaInicio(email, foto, token));
			res.end();
		}
	});

	log.info('Leyendo token de las peticiones en desarrollo');

	app.options('/graphql', (req, res) => {

		res.set({
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
			'Access-Control-Allow-Credentials': 'true',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH',
			'Access-Control-Max-Age': '1209600',
			'Access-Control-Expose-Headers': 'Pragma, Cache-control'
		});

		res.status(200).write('ok');
		res.end();
	});

	app.use('/graphql', (req, res, next) => {
		const token = req.header('authorization') || req.header('Authorization');
		try {
			req.decoded = validaToken(token);
			next();
		} catch (err) {
			res.status(statusResponses.UNAUTHORIZED).write('No cuenta con permiso para consultar la información');
		}
	});


	log.info('Configurando endpoint POST /graphql para desarollo desde react');
	app.post('/graphql', graphqlHTTP((req, res) => {

		res.set({
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
			'Access-Control-Allow-Credentials': 'true',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH',
			'Access-Control-Max-Age': '1209600',
			'Access-Control-Expose-Headers': 'Pragma, Cache-control'
		});

		const loaders = {
			colaborador: colaboradorLoader
		};

		return {
			schema: schema,
			rootValue: root,
			context: {
				loaders
			},
			graphiql: false
		};
	}));

	log.info('Configurando endpoint GET /graphql, para desarrollo graphql desde browser');
	app.get('/graphqlWeb', graphqlHTTP((req, res) => {
		res.set({
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
			'Access-Control-Allow-Credentials': 'true',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH',
			'Access-Control-Max-Age': '1209600',
			'Access-Control-Expose-Headers': 'Pragma, Cache-control'
		});

		const loaders = {
			colaborador: colaboradorLoader
		};

		return {
			schema: schema,
			rootValue: root,
			context: {
				loaders
			},
			graphiql: true
		};
	}));

	log.info('Configurando endpoint GET /graphql, para desarrollo graphql desde browser');
	app.post('/graphqlWeb', graphqlHTTP((req, res) => {

		res.set({
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'origin, content-type, accept, authorization',
			'Access-Control-Allow-Credentials': 'true',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD, PATCH',
			'Access-Control-Max-Age': '1209600',
			'Access-Control-Expose-Headers': 'Pragma, Cache-control'
		});

		const loaders = {
			colaborador: colaboradorLoader
		};

		return {
			schema: schema,
			rootValue: root,
			context: {
				loaders
			},
			graphiql: true
		};
	}));
}

log.info('Endpoints configurados');

module.exports = app;
