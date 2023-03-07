import React from "react";
import { useEffect, useState } from "react";

const ListAppointment = () => {
	const [appointments, setAppointments] = useState([]);

	const mountAppointments = async () => {
		const appointmentUrl = "http://localhost:8080/api/appointments/";
		const response = await fetch(appointmentUrl);
		if (response.ok) {
			const data = await response.json();
			setAppointments(data.appointments);
			console.log(data.appointments);
		} else {
			console.error(response);
		}
	};

	const updateAppointmentStatus = async (id, is_finished) => {
		const fetchConfig = {
			method: "PUT",
			body: JSON.stringify({ is_finished: is_finished }),
			headers: {
				"Content-Type": "json/application",
			},
		};
		const response = await fetch(
			`http://localhost:8080/api/appointments/${id}/`,
			fetchConfig
		);
		if (response.ok) {
			const updatedAppointmentFinishStatus = await response.json();
			return updatedAppointmentFinishStatus;
		}
	};

	const handleFinishClick = async (id) => {
		try {
			const updatedAppointment = await updateAppointmentStatus(id, true);
			const updatedAppointments = appointments.map((appointment) => {
				if (appointment.id === id) {
					return { ...appointment, is_finished: true };
				}
				return appointment;
			});
			setAppointments(updatedAppointments);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		mountAppointments();
	}, []);

	return (
		<div className="container">
			<h1>Service Appointments</h1>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>VIP</th>
						<th>VIN</th>
						<th>Customer Name</th>
						<th>Date</th>
						<th>Time</th>
						<th>Technician</th>
						<th>Reason</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{appointments.map((appointment) => {
						const formattedTime = appointment.time.substring(0, 5);
						if (!appointment.is_finished) {
							return (
								<tr key={appointment.id}>
									<td>VIP?</td>
									<td>{appointment.vin}</td>
									<td>{appointment.customer_name}</td>
									<td>{appointment.date}</td>
									<td>{formattedTime} PM</td>
									<td>{appointment.technician}</td>
									<td>{appointment.reason}</td>
									<td>
										<button
											className="btn btn-success"
											onClick={() => handleFinishClick(appointment.id)}>
											Finish
										</button>
										<button
											className="btn btn-danger"
											onClick={() => handleFinishClick(appointment.id)}>
											Cancel
										</button>
									</td>
								</tr>
							);
						}
					})}
				</tbody>
			</table>
		</div>
	);
};

export default ListAppointment;
