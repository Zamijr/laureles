/**
 * @module General
 */
const {loginConstants} = require('./config/constants');
const jwt = require('jsonwebtoken');

const secret = '$1$pjtu72b5$rb0/EiyhRJ95S5OVDYyfE0';
/**
 * Genera el token de autenticacion para asegurar que se trata del empleado correcto.
 * @method generaToken
 * @for Web
 */
const generaToken = (perfilGoogle) => {
	if (perfilGoogle.domain === loginConstants.DOMINIO) {
		let token = jwt.sign({
			exp: Math.floor(Date.now() / 1000) + (60 * 600),
			data: {
				email: perfilGoogle.emails[0].value,
				idGoogle: perfilGoogle.id,
				foto: perfilGoogle.image.url
			}
		}, secret);
		return {
			token: token,
			foto: perfilGoogle.image.url,
			email: perfilGoogle.emails[0].value
		};
	} else  {
		return '';
	}
};
/**
 * Verifica que el token es correcto.
 * @method validaToken
 * @for Web
 */
const validaToken = (token) => {
	return jwt.verify(token, secret);
};
/**
 * Obtiene la página inicial del sistema, con la informacion del token, etc.
 * @method paginaInicio
 * @for Web
 */
const paginaInicio = (email, foto, token) => {
	return `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<title></title>
			<meta charset="UTF-8">
			<meta name="viewport" content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width">
			<meta name="apple-mobile-web-app-title" content="Material Console">
			<meta name="apple-mobile-web-app-capable" content="yes">
			<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
			<meta name="format-detection" content="telephone=no">
			<meta name="HandheldFriendly" content="True">
			<meta http-equiv="cleartype" content="on">
			<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
			<link href="../assets/css/style.css" rel="stylesheet">
			<script src="../assets/js/material.min.js"></script>
		</head>
		<body>
			<div id="app"></div>
			<form id="inicial">
				<input type="hidden" name="email" value="${email}" />
				<input type="hidden" name="foto" value="${foto}" />
				<input type="hidden" name="token" value="${token}" />
			</form>
			<script src="../assets/js/bundle.js"></script>
		</body>
		</html>
	`;
};

const paginaNoEmpleados =
`
	<html>
	<head>
	</head>
	<body>
		<h2>Lo sentimos esta aplicación es sólo para empleados de Interware</h2>
	<body>
	</html>
`;

module.exports = {
	generaToken,
	validaToken,
	paginaInicio,
	paginaNoEmpleados
};
