import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SearchAppointment from "./SearchAppointment";

const ListAppointment = () => {
	const [appointments, setAppointments] = useState([]);
	const [automobiles, setAutomobiles] = useState([]);

	const mountAppointments = async () => {
		const appointmentUrl = "http://localhost:8080/api/appointments/";
		const response = await fetch(appointmentUrl);
		if (response.ok) {
			const data = await response.json();
			setAppointments(data.appointments);
		}
	};

	const mountAutomobiles = async () => {
		const automobileUrl = "http://localhost:8080/api/automobiles/";
		const response = await fetch(automobileUrl);

		if (response.ok) {
			const data = await response.json();
			const automobile = data.autos.map((automobile) => {
				const automobile_vin = automobile.import_vin.slice(17, 34);
				return { ...automobile, vin: automobile_vin };
			});
			setAutomobiles(automobile);
		}
	};

	const automobile_vin = automobiles.map((automobile) => {
		return automobile.vin;
	});

	const isCustomerVIP = (appointment_vin) => {
		return automobile_vin.includes(appointment_vin);
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
		mountAutomobiles();
	}, []);

	return (
		<div className="container">
			<h1 className="mt-3 mb-3">Service Appointments</h1>
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
						// Formatting Time
						const formattedTime = appointment.time.substring(0, 5);
						let is_day = "AM";
						if (formattedTime.slice(0, 2) >= 12) {
							is_day = "PM";
						}
						if (!appointment.is_finished) {
							return (
								<tr key={appointment.id}>
									<td>
										{" "}
										{isCustomerVIP(appointment.vin) ? (
											<img
												style={{
													height: "30px",
													width: "30px",
												}}
												src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/2153px-Star_icon_stylized.svg.png"
												alt="star-icon"></img>
										) : (
											<img
												style={{
													height: "30px",
													width: "30px",
												}}
												src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjcyMi0xMjAtcC5wbmc.png"
												alt="red-x-mark"></img>
										)}{" "}
									</td>
									<td>{appointment.vin}</td>
									<td>{appointment.customer_name}</td>
									<td>{appointment.date}</td>
									<td>
										{formattedTime} {is_day}
									</td>
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
