/**
* @module Laurel
*/
const {buildSchema} = require('graphql');
const {ValorType, PremioType} = require('./catalogos/type');
const ColaboradorType = require('./colaborador/type');
const LaurelType = require('./laurel/type');
const CanjeType = require('./canje/type');
const NotificacionType = require('./notificaciones/type');
/**
 * La definición del esquema de Graphql
 * @class Schema
 */
const Schema = buildSchema(`
	input DatosPremio {
		clave: String!,
		tipo: String,
		costo: Int
	}

	input DatosValor {
		clave: String!,
		descripcion: String
	}

	input DatosNotificacion {
		idColaborador: ID!,
		titulo: String!,
		descripcion: String!,
		tipo: Int
	}

	type Colaborador {
		_id: ID!,
		nombre: String!,
		apellidos: String,
		email: String!,
		fechaNacimiento: String,
		familiares: [Colaborador],
		area: String,
		perfil: String,
		fechaBaja: String,
		urlFoto: String,
		rol: String
	}

	type Usuario {
		_id: ID!,
		nombre: String!,
		apellidos: String,
		email: String!,
		perfil: String,
		foto: String,
		laurelesPorEntregar: [Laurel],
		laurelesRecibidos: [Laurel],
		laurelesEntregados: [Laurel],
		laurelesPorCanjear: [Laurel]
	}

	type Premio {
		_id: ID!,
		clave: String,
		tipo: String,
		costo: Int,
		activo: Boolean
	}

	type Valor {
		_id: ID!,
		clave: String!,
		descripcion: String,
		activo: Boolean
	}

	type Laurel {
		_id: ID!
		duenio: Colaborador!,
		colaborador: Colaborador,
		entregado: Boolean,
		aprobado: Boolean,
		canjeado: Boolean,
		sinCanje: Boolean,
		valor: Valor,
		descripcion: String,
		fechaCaducidad: String,
		fechaEntrega: String,
		fechaVencimientoCanje: String,
		fechaAprobacion: String,
		fechaGeneracion: String
	}

	type Canje {
		_id: ID!,
		duenio: Colaborador,
		premio: Premio,
		laurelesCanje: [Laurel],
		fechaCanje: String
	}

	type Notificacion {
		colaborador: Colaborador,
		titulo: String!,
		descripcion: String!,
		tipo: Int,
		fecha: String
	}

	type Mutation {
		rechazarLaurel(laurelid: String, mensaje: String): Laurel,
		aprobarLaurel(laurelid: String): Laurel,
		entregarLaurel(laurel:ID, colaborador: ID, valor: ID, descripcion:String):Laurel,
		generarLaurel(idColaborador: ID, fechaCaducidad: String):Laurel,
		registrarUsuario(email: String!, foto: String!): Usuario,
		asignarLaurelesTodos(numeroLaureles: Int, periodo: Int): Laurel,
		asignarLaureles(colaboradores: [String], numeroLaureles: Int): Laurel,
		actualizaFotoColaborador(idColaborador: String, urlFoto: String): Colaborador,
		actualizaRolColaborador(idColaborador: String, rol: String): Colaborador
		nuevoPremio(premio: DatosPremio): [Premio],
		deshabilitarPremio(idPremio: ID): [Premio],
		modificarPremio(idPremio: ID,datos: DatosPremio): [Premio],
		nuevoValor(valor: DatosValor): Valor,
		deshabilitarValor(idValor: ID): [Valor],
		modificarValor(idValor: ID, datos: DatosValor): [Valor],
		registrarCanje(idColaborador: ID!, idPremio: ID!): Laurel
		registrarNotificacion(notificacion: DatosNotificacion): Notificacion
	}

	type Query {
		getPremios: [Premio],
		getValores: [Valor],
		getLaurelPorId(idLaurel: String!): Laurel,
		ultimosLaurelesEntregados(limiteLaureles: Int!): [Laurel],
		laurelPorEntregar(idColaborador: ID!): Laurel,
		laurelesRecibidos(idColaborador: ID!): [Laurel],
		laurelesEntregados(idColaborador: ID!): [Laurel],
		laurelesPorCanjear(idColaborador: ID!): [Laurel],
		buscarColaboradores(nombre: String, email: String): [Colaborador],
		buscarColaboradorPorId(idColaborador: String!): Colaborador,
		buscarLaurelesPorAprobar: [Laurel],
		buscarTodoslosColaboradores: [Colaborador],
		historialCanjes(idColaborador: ID): [Canje],
		listarNotificaciones(idColaborador: ID!, numeroNotificaciones: Int!): [Notificacion]
	}
`);
/**
 * Las operaciones que ligan el esquema de Graphql con las operaciones de Mongo.
 * @property root
 * @type {Object}
 */
const root = {
	getPremios: () => {
		return PremioType.getTodos();
	},
	deshabilitarPremio: ({idPremio}) => {
		return PremioType.deshabilitarPremio(idPremio);
	},
	modificarPremio: ({idPremio,datos}) => {
		return PremioType.modificarPremio(idPremio,datos);
	},
	getValores: () => {
		return ValorType.getValores();
	},
	nuevoPremio: ({premio}) => {
		return PremioType.nuevoPremio(premio);
	},
	nuevoValor: ({valor}) => {
		return ValorType.nuevoValor(valor);
	},
	modificarValor: ({idValor,datos}) => {
		return ValorType.modificarValor(idValor,datos);
	},
	deshabilitarValor: ({idValor}) => {
		return ValorType.deshabilitarValor(idValor);
	},
	getLaurelPorId: ({idLaurel}) => {
		return LaurelType.buscarLaurelPorId(idLaurel);
	},
	ultimosLaurelesEntregados: ({limiteLaureles}) => {
		return LaurelType.ultimosLaurelesEntregados(limiteLaureles);
	},
	buscarColaboradores: ({nombre, email}) => {
		return ColaboradorType.buscarColaboradores(nombre, email);
	},
	buscarColaboradorPorId: ({idColaborador}) => {
		return ColaboradorType.buscarColaboradorPorId(idColaborador);
	},
	registrarUsuario: ({email, foto}) => {
		return ColaboradorType.registrarUsuario(email, foto);
	},
	entregarLaurel: ({laurel, colaborador, valor, descripcion}) => {
		return LaurelType.entregarLaurel(laurel, colaborador, valor, descripcion);
	},
	laurelPorEntregar: ({idColaborador}) => {
		return LaurelType.buscarLaurelPorEntregar(idColaborador);
	},
	laurelesRecibidos: ({idColaborador}) => {
		return LaurelType.laurelesRecibidos(idColaborador);
	},
	laurelesEntregados: ({idColaborador}) => {
		return LaurelType.laurelesEntregados(idColaborador);
	},
	laurelesPorCanjear: ({idColaborador}) => {
		return LaurelType.laurelesPorCanjear(idColaborador);
	},
	buscarLaurelesPorAprobar: () => {
		return LaurelType.buscarLaurelesPorAprobar();
	},
	aprobarLaurel: ({laurelid}) => {
		return LaurelType.aprobarLaurel(laurelid);
	},
	rechazarLaurel: ({laurelid, mensaje}) => {
		return LaurelType.rechazarLaurel(laurelid, mensaje);
	},
	generarLaurel: ({idColaborador, fechaCaducidad}) => {
		return LaurelType.generarLaurel(idColaborador, fechaCaducidad);
	},
	buscarTodoslosColaboradores: () => {
		return ColaboradorType.buscarTodoslosColaboradores();
	},
	asignarLaurelesTodos: ({numeroLaureles, periodo}) => {
		return LaurelType.cronAsignarLaureles(numeroLaureles, periodo);
	},
	asignarLaureles: ({colaboradores, numeroLaureles}) => {
		return LaurelType.asignarLaureles(colaboradores, numeroLaureles);
	},
	actualizaFotoColaborador: ({idColaborador, urlFoto}) => {
		return ColaboradorType.actualizaFotoColaborador(idColaborador, urlFoto);
	},
	actualizaRolColaborador: ({idColaborador, rol}) => {
		return ColaboradorType.actualizaRolColaborador(idColaborador, rol);
	},
	registrarCanje: ({idColaborador, idPremio}) => {
		return CanjeType.generarCanje(idColaborador, idPremio);
	},
	historialCanjes: ({idColaborador}) => {
		return CanjeType.historialCanjes(idColaborador);
	},
	listarNotificaciones: ({idColaborador, numeroNotificaciones}) => {
		return NotificacionType.listarNotificaciones(idColaborador, numeroNotificaciones);
	},
	registrarNotificacion: ({notificacion}) => {
		return NotificacionType.registrarNotificacion(notificacion);
	}
};

exports.schema = Schema;
exports.root = root;
