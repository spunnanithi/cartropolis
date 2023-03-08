import React from "react";
import { useState, useEffect } from "react";

const ListAutomobiles = () => {
	const [automobiles, setAutomobiles] = useState([]);

	const mountAutomobiles = async () => {
		const automobileUrl = "http://localhost:8100/api/automobiles/";

		const response = await fetch(automobileUrl);

		if (response.ok) {
			const data = await response.json();
			setAutomobiles(data.autos);
		}
	};

	useEffect(() => {
		mountAutomobiles();
	}, []);
	return (
		<div className="container">
			<h1>Automobiles</h1>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>VIN</th>
						<th>Color</th>
						<th>Year</th>
						<th>Model</th>
						<th>Manufacturer</th>
					</tr>
				</thead>
				<tbody>
					{automobiles.map((automobile) => {
						return (
							<tr key={automobile.id}>
								<td>{automobile.vin}</td>
								<td>{automobile.color}</td>
								<td>{automobile.year}</td>
								<td>{automobile.model.name}</td>
								<td>{automobile.model.manufacturer.name}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default ListAutomobiles;
