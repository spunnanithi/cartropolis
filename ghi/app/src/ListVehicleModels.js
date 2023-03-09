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

	const handleDelete = async (id) => {
		const url = `http://localhost:8100/api/models/${id}/`;

		const response = await fetch(url, { method: "DELETE" });

		if (response.ok) {
			mountVehicleModels();
		}
	};

	useEffect(() => {
		mountVehicleModels();
	}, []);

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<h1 className="text-center">Vehicle Models</h1>
					<div className="card mx-auto">
						<div className="card-body">
							<table className="table table-striped">
								<thead>
									<tr>
										<th>Name</th>
										<th>Manufacturer</th>
										<th>Picture</th>
										<th>Remove Vehicle Model</th>
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
												<td>
													<button
														className="btn btn-danger"
														type="button"
														onClick={() => handleDelete(vehicleModel.id)}>
														Delete
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListVehicleModels;
