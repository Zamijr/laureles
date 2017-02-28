export const getBodyRegistraUsuario = (email, foto) => {
	return `
		mutation{
			registrarUsuario(email: "${email}", foto: "${foto}") {
				_id,
				nombre,
				apellidos,
				email,
				perfil,
				foto,
				laurelesRecibidos {
					_id
				},
				laurelesPorEntregar {
					_id,
					fechaCaducidad
				},
				laurelesEntregados {
					_id
				},
				laurelesPorCanjear {
					_id
				}
			} 
		}
	`;
};
