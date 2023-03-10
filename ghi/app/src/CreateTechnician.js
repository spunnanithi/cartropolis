import React from "react";
import { useState, useEffect } from "react";

const CreateTechnician = () => {
	const [name, setName] = useState("");
	const [employeeNumber, setEmployeeNumber] = useState("");

	const handleFormChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;

		if (name === "name") {
			setName(value);
		} else if (name === "employee_number") {
			if (value.length < 7) {
				setEmployeeNumber(value);
			}
		}
	};

	const handleSubmit = async () => {
		const technicianUrl = "http://localhost:8080/api/technicians/";

		const data = {
			name: name,
			employee_number: employeeNumber,
		};

		const fetchConfig = {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(technicianUrl, fetchConfig);

		if (response.ok) {
			const newTechnician = await response.json();

			setName("");
			setEmployeeNumber("");
		} else {
			console.error(response);
		}
	};

	return (
		<div className="row mt-5">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create a New Technician</h1>
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
								placeholder="Please enter technician's name"
								required
								onChange={handleFormChange}
								value={name}></input>
						</div>
						<div className="mb-3">
							<label htmlFor="employee_number" className="form-label">
								Employee Number
							</label>
							<input
								type="number"
								className="form-control"
								id="employee_number"
								name="employee_number"
								placeholder="Please enter 6-digit employee number"
								required
								onChange={handleFormChange}
								value={employeeNumber}></input>
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

export default CreateTechnician;
