import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAutomobile = () => {
	const navigate = useNavigate();
	const [vehicleModels, setVehicleModels] = useState([]);

	const [color, setColor] = useState("");
	const [year, setYear] = useState("");
	const [vin, setVin] = useState("");
	const [vehicleModel, setVehicleModel] = useState("");

	const handleFormChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;

		if (name === "color") {
			setColor(value);
		} else if (name === "year") {
			setYear(value);
		} else if (name === "vin") {
			if (value.length <= 17) {
				setVin(value);
			}
		} else if (name === "models") {
			setVehicleModel(value);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const automobileUrl = "http://localhost:8100/api/automobiles/";

		const data = {
			color: color,
			year: year,
			vin: vin,
			model_id: vehicleModel,
		};

		const fetchConfig = {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(automobileUrl, fetchConfig);

		if (response.ok) {
			navigate("/inventory", { replace: true });

			setColor("");
			setYear("");
			setVin("");
			setVehicleModel("");
		}
	};

	const mountVehicleModel = async () => {
		const modelUrl = "http://localhost:8100/api/models/";

		const response = await fetch(modelUrl);

		if (response.ok) {
			const data = await response.json();
			setVehicleModels(data.models);
		}
	};

	useEffect(() => {
		mountVehicleModel();
	}, []);

	return (
		<div className="row mt-5">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Add an Automobile to Inventory</h1>
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="color" className="form-label">
								Color
							</label>
							<input
								type="text"
								className="form-control"
								id="color"
								name="color"
								placeholder=""
								required
								onChange={handleFormChange}
								value={color}></input>
						</div>
						<div className="mb-3">
							<label htmlFor="year" className="form-label">
								Year
							</label>
							<input
								type="number"
								className="form-control"
								id="year"
								name="year"
								placeholder=""
								required
								onChange={handleFormChange}
								value={year}></input>
						</div>
						<div className="mb-3">
							<label htmlFor="vin" className="form-label">
								VIN
							</label>
							<input
								type="text"
								className="form-control"
								id="vin"
								name="vin"
								placeholder=""
								required
								onChange={handleFormChange}
								value={vin}></input>
						</div>
						<div className="mb-3">
							<select
								id="models"
								name="models"
								className="form-select"
								required
								onChange={handleFormChange}
								value={vehicleModel}>
								<option value="">Choose a vehicle model</option>
								{vehicleModels.map((vehicleModel) => {
									return (
										<option key={vehicleModel.id} value={vehicleModel.id}>
											{vehicleModel.name}
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

export default CreateAutomobile;
