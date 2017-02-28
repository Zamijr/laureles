/**
 * @module Validacion Laureles
 */
import React, { PropTypes } from 'react';
import { DataTable, TableHeader } from 'react-mdl';
/**
 * Laureles que se aprobaran /rechazaran.
 */
const laurelesXaprobar = ({rows}) => {
	let rowsLaureles = rows.map((laurel, index) => {
		return (
			<tr key={index}>
				<td><img className="imagenGoogle" src={laurel.urlFoto}/></td>
				<td className="mdl-data-table__cell--non-numeric">{laurel.nombreDuenio}</td>
				<td>{laurel.valor}</td>
				<td>{laurel.nombreColaborador}</td>
				<td>{laurel.fechaEnvio}</td>
			</tr>
		);
	});
	return (
		<table width="100%" className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
			<thead>
				<tr>
					<th className="mdl-data-table__cell--non-numeric"></th>
					<th className="mdl-data-table__cell--non-numeric">Colaborador laureado</th>
					<th >Valor reconocido</th>
					<th>Quién lo reconoce</th>
                    <th>Fecha de envío</th>
				</tr>
			</thead>
			<tbody>
				{rowsLaureles}
			</tbody>
		</table>
	);
};

laurelesXaprobar.propTypes = {
	rows: PropTypes.array.isRequired
};

export default laurelesXaprobar;
