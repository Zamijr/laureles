/**
 * @module Recibidos Laureles
 */
import React, { PropTypes } from 'react';
import { DataTable, TableHeader } from 'react-mdl';
/**
 * Laureles que  han Recibido el  colaborador.
 */
const laurelesRecibidos = ({rows}) => {
	let rowsLaureles = rows.map((laurel, index) => {
		return (
			<tr key={index} onClick={() => { window.document.location = "#/recibo-laurel/resumen/" + laurel.idLaurel } }>
				<td><img className="imagenGoogle" src={laurel.urlFoto} /></td>
				<td className="mdl-data-table__cell--non-numeric">{laurel.nombreColaborador}</td>
				<td>{laurel.valor}</td>
				<td>{'Fecha envio'}</td>
			</tr>
		);
	});
	return (
		<table width="100%" className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
			<thead>
				<tr>
					<th className="mdl-data-table__cell--non-numeric"></th>
					<th className="mdl-data-table__cell--non-numeric">Colaborador</th>
					<th >Valor reconocido</th>
					<th>Fecha de envio</th>
				</tr>
			</thead>
			<tbody>
				{rowsLaureles}
			</tbody>
		</table>
	);
};

laurelesRecibidos.propTypes = {
	rows: PropTypes.array.isRequired
};

export default laurelesRecibidos;
