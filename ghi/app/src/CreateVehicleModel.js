import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateVehicleModel = () => {
	const navigate = useNavigate();

	const [manufacturers, setManufacturers] = useState([]);
	const [name, setName] = useState("");
	const [pictureUrl, setPictureUrl] = useState("");
	const [manufacturer, setManufacturer] = useState("");

	const handleFormChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		if (name === "name") {
			setName(value);
		} else if (name === "picture_url") {
			setPictureUrl(value);
		} else if (name === "manufacturer") {
			setManufacturer(value);
		}
	};

	const mountManufacturer = async () => {
		const manufacturerUrl = "http://localhost:8100/api/manufacturers/";

		const response = await fetch(manufacturerUrl);

		if (response.ok) {
			const data = await response.json();
			setManufacturers(data.manufacturers);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const vehicleModelUrl = "http://localhost:8100/api/models/";

		const data = {
			name: name,
			picture_url: pictureUrl,
			manufacturer_id: manufacturer,
		};

		const fetchConfig = {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(vehicleModelUrl, fetchConfig);

		if (response.ok) {
			navigate("/inventory", { replace: true });

			setName("");
			setPictureUrl("");
			setManufacturer("");
		}
	};

	useEffect(() => {
		mountManufacturer();
	}, []);

	return (
		<div className="row mt-5">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create a Vehicle Model</h1>
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="name" className="form-label">
								Name
							</label>
							<input
								type="text"
								className="form-control"
								id="name"
								name="name"
								placeholder=""
								required
								onChange={handleFormChange}
								value={name}></input>
						</div>
						<div className="mb-3">
							<label htmlFor="picture_url" className="form-label">
								Picture URL
							</label>
							<input
								type="text"
								className="form-control"
								id="picture_url"
								name="picture_url"
								placeholder=""
								required
								onChange={handleFormChange}
								value={pictureUrl}></input>
						</div>
						<div className="mb-3">
							<select
								id="manufacturer"
								name="manufacturer"
								className="form-select"
								required
								onChange={handleFormChange}
								value={manufacturer}>
								<option value="">Choose a manufacturer</option>
								{manufacturers.map((manufacturer) => {
									return (
										<option key={manufacturer.id} value={manufacturer.id}>
											{manufacturer.name}
										</option>
									);
								})}
							</select>
						</div>
						<button type="submit" className="btn btn-primary">
							Create
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateVehicleModel;
