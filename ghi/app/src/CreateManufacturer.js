import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateManufacturer = () => {
	const navigate = useNavigate();
	const [name, setName] = useState("");

	const handleFormChange = (event) => {
		const value = event.target.value;

		setName(value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const manufacturerUrl = "http://localhost:8100/api/manufacturers/";

		const data = {
			name: name,
		};

		const fetchConfig = {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(manufacturerUrl, fetchConfig);

		if (response.ok) {
			navigate("/inventory", { replace: true });
			setName("");
		}
	};

	return (
		<div className="row mt-5">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create a Manufacturer</h1>
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
						<button type="submit" className="btn btn-primary">
							Create
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreateManufacturer;
