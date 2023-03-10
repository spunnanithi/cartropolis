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

	const handleDelete = async (id) => {
		const url = `http://localhost:8100/api/manufacturers/${id}`;

		const response = await fetch(url, { method: "DELETE" });

		if (response.ok) {
			mountManufacturer();
		}
	};

	useEffect(() => {
		mountManufacturer();
	}, []);
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<h1 className="text-center">Manufacturers</h1>
					<div className="card mx-auto">
						<div className="card-body">
							<table className="table table-striped">
								<thead>
									<tr>
										<th>Name</th>
										<th>Remove Manufacturer</th>
									</tr>
								</thead>
								<tbody>
									{manufacturers.map((manufacturer) => {
										return (
											<tr key={manufacturer.id}>
												<td>{manufacturer.name}</td>
												<td>
													<button
														className="btn btn-danger"
														type="button"
														onClick={() => handleDelete(manufacturer.id)}>
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

export default ListManufacturers;
