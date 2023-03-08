import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const ListManufacturers = () => {
	const [manufacturers, setManufacturers] = useState([]);

	const mountManufacturer = async () => {
		const manufacturerUrl = "http://localhost:8100/api/manufacturers/";

		const response = await fetch(manufacturerUrl);

		if (response.ok) {
			const data = await response.json();
			setManufacturers(data.manufacturers);
		}
	};

	useEffect(() => {
		mountManufacturer();
	}, []);
	return (
		<div className="container">
			<h1>Manufacturers</h1>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{manufacturers.map((manufacturer) => {
						return (
							<tr key={manufacturer.id}>
								<td>{manufacturer.name}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default ListManufacturers;
