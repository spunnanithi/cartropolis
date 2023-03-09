import React from "react";
import { useState, useEffect } from "react";

const CreateAppointment = () => {
	const [technicians, setTechnicians] = useState([]);

	const [customerName, setCustomerName] = useState("");
	const [vin, setVin] = useState("");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [reason, setReason] = useState("");
	const [technician, setTechnician] = useState("");

	const handleFormChange = (event) => {
		const value = event.target.value;
		const formName = event.target.name;

		if (formName === "customer_name") {
			setCustomerName(value);
		} else if (formName === "vin") {
			if (value.length <= 17) {
				setVin(value);
			}
		} else if (formName === "date") {
			setDate(value);
		} else if (formName === "time") {
			setTime(value);
		} else if (formName === "reason") {
			setReason(value);
		} else if (formName === "technician") {
			setTechnician(value);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const appointmentUrl = "http://localhost:8080/api/appointments/";

		const isoDate = `${date}T00:00:00Z`;
		const isoTime = `2000-10-20T${time}Z`;

		const data = {
			customer_name: customerName,
			vin: vin,
			date: isoDate,
			time: isoTime,
			reason: reason,
			technician: technician,
		};

		const fetchConfig = {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await fetch(appointmentUrl, fetchConfig);

		if (response.ok) {
			const newAppointment = await response.json();

			setCustomerName("");
			setVin("");
			setDate("");
			setTime("");
			setReason("");
			setTechnician("");
		}
	};

	const mountTechnicians = async () => {
		const technicianUrl = "http://localhost:8080/api/technicians/";
		const response = await fetch(technicianUrl);

		if (response.ok) {
			const data = await response.json();
			setTechnicians(data.technicians);
		} else {
			console.error(response);
		}
	};

	useEffect(() => {
		mountTechnicians();
	}, []);

	return (
		<div className="row mt-5">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create a New Appointment</h1>
					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="customer_name" className="form-label">
								Customer Name
							</label>
							<input
								type="text"
								className="form-control"
								id="customer_name"
								name="customer_name"
								placeholder=""
								required
								onChange={handleFormChange}
								value={customerName}></input>
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
							<label htmlFor="date" className="form-label">
								Date
							</label>
							<input
								type="date"
								className="form-control"
								id="date"
								name="date"
								placeholder=""
								required
								onChange={handleFormChange}
								value={date}></input>
						</div>
						<div className="mb-3">
							<label htmlFor="time" className="form-label">
								Time
							</label>
							<input
								type="time"
								className="form-control"
								id="time"
								name="time"
								placeholder=""
								required
								onChange={handleFormChange}
								value={time}></input>
						</div>
						<div className="mb-3">
							<label htmlFor="reason" className="form-label">
								Reason
							</label>
							<input
								type="text"
								className="form-control"
								id="reason"
								name="reason"
								placeholder=""
								required
								onChange={handleFormChange}
								value={reason}></input>
						</div>
						<div className="mb-3">
							<select
								id="technician"
								name="technician"
								className="form-select"
								required
								onChange={handleFormChange}
								value={technician}>
								<option value="">Choose a technician</option>
								{technicians.map((technician) => {
									return (
										<option key={technician.id} value={technician.id}>
											{technician.name}
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

export default CreateAppointment;
