import React from "react";
import { useState, useEffect } from "react";

const SearchAppointment = () => {
	const [searchBar, setSearchBar] = useState("");
	const [appointments, setAppointments] = useState([]);
	const [filteredAppointments, setFilteredAppointments] = useState([]);
	const [buttonClick, setButtonClick] = useState(false);

	const mountAppointments = async () => {
		const appointmentUrl = "http://localhost:8080/api/appointments/";
		const response = await fetch(appointmentUrl);
		if (response.ok) {
			const data = await response.json();
			setAppointments(data.appointments);
		} else {
			console.error(response);
		}
	};

	const handleSearchBar = (event) => {
		const value = event.target.value;
		setSearchBar(value);
	};

	const handleButtonClick = (event) => {
		event.preventDefault();
		setButtonClick(true);

		const filteredAppts = appointments.map((appointment) => {
			if (appointment.vin === searchBar) {
				return { ...appointment };
			}
			return appointment;
		});
		setFilteredAppointments(filteredAppts);
	};

	useEffect(() => {
		mountAppointments();
	}, []);

	return (
		<>
			<form className="input-group mb-5 mt-5" onSubmit={handleButtonClick}>
				<input
					type="search"
					className="form-control rounded"
					placeholder="Search"
					aria-label="Search"
					aria-describedby="search-addon"
					onChange={handleSearchBar}
				/>
				<button type="submit" className="btn btn-outline-primary">
					Search VIN
				</button>
			</form>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>VIN</th>
						<th>Customer Name</th>
						<th>Date</th>
						<th>Time</th>
						<th>Technician</th>
						<th>Reason</th>
					</tr>
				</thead>
				<tbody>
					{filteredAppointments.map((appointment) => {
						// Formatting Time
						const formattedTime = appointment.time.substring(0, 5);
						let is_day = "AM";
						if (formattedTime.slice(0, 2) >= 12) {
							is_day = "PM";
						}
						if (appointment.vin === searchBar && buttonClick) {
							return (
								<tr key={appointment.id}>
									<td>{appointment.vin}</td>
									<td>{appointment.customer_name}</td>
									<td>{appointment.date}</td>
									<td>
										{formattedTime} {is_day}
									</td>
									<td>{appointment.technician}</td>
									<td>{appointment.reason}</td>
								</tr>
							);
						}
					})}
				</tbody>
			</table>
		</>
	);
};

export default SearchAppointment;
