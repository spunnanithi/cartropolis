import { NavLink } from "react-router-dom";

function Nav() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-success">
			<div className="container-fluid">
				<NavLink className="navbar-brand" to="/">
					CarCar
				</NavLink>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink className="nav-link active" aria-current="page" to="/">
								Home
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" aria-current="page" to="inventory">
								Inventory
							</NavLink>
						</li>
						<li className="dropdown nav-item">
							<a
								className="nav-link dropdown-toggle"
								href="#"
								id="navbarDarkDropdownMenuLink"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false">
								Services
							</a>
							<ul
								className="dropdown-menu"
								aria-labelledby="navbarDarkDropdownMenuLink">
								<li className="dropdown-item nav-link">
									<NavLink
										className="active text-black text-decoration-none"
										to="services">
										List of Service Appointments
									</NavLink>
								</li>
								<li className="dropdown-item nav-link">
									<NavLink
										className="active text-black text-decoration-none"
										to="services/search">
										Search for Appointment
									</NavLink>
								</li>
								<li className="dropdown-item nav-link">
									<NavLink
										className="active text-black text-decoration-none"
										to="services/new">
										Enter a Service Appointment
									</NavLink>
								</li>
								<li className="dropdown-item nav-link">
									<NavLink
										className="active text-black text-decoration-none"
										to="services/technicians/new">
										Enter a Technician
									</NavLink>
								</li>
							</ul>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" aria-current="page" to="/">
								Sales
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Nav;
