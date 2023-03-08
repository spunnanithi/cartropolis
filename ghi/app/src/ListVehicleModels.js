import React from "react";
import { useState, useEffect } from "react";

const ListVehicleModels = () => {
	const [vehicleModels, setVehicleModels] = useState([]);

	const mountVehicleModels = async () => {
		const vehicleModelUrl = "http://localhost:8100/api/models/";
		const response = await fetch(vehicleModelUrl);

		if (response.ok) {
			const data = await response.json();
			setVehicleModels(data.models);
		}
	};

	useEffect(() => {
		mountVehicleModels();
	}, []);

	return (
		<div className="container">
			<h1>Vehicle Models</h1>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Name</th>
						<th>Manufacturer</th>
						<th>Picture</th>
					</tr>
				</thead>
				<tbody>
					{vehicleModels.map((vehicleModel) => {
						return (
							<tr key={vehicleModel.id}>
								<td>{vehicleModel.name}</td>
								<td>{vehicleModel.manufacturer.name}</td>
								<td>
									<img
										style={{
											height: "175px",
											width: "350px",
										}}
										src={vehicleModel.picture_url}></img>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default ListVehicleModels;
