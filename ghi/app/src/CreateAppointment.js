import React from "react";

const CreateAppointment = () => {
	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create a New Appointment</h1>
					<form>
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
								required></input>
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
								required></input>
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
								required></input>
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
								required></input>
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
								required></input>
						</div>
						<div className="mb-3">
							<select
								id="technician"
								name="technician"
								className="form-select"
								required>
								<option value="">Choose a technician</option>
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
