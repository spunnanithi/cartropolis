import React from "react";
import { NavLink } from "react-router-dom";

const InventoryPage = () => {
	return (
		<div className="container text-center">
			<h1>Inventory</h1>
			<img
				src="https://images.unsplash.com/photo-1574023278981-0b48ba10e9ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
				style={{ width: "1000px", height: "650px" }}></img>
			<div className="container">
				<div className="row mt-4">
					<p>
						For listings of manufacturers, vehicle models or automobiles, please
						select a link below:
					</p>
				</div>
				<div className="row">
					<div className="col-md">
						<NavLink to="manufacturers">
							<button className="btn btn-primary">Manufacturers</button>
						</NavLink>
					</div>
					<div className="col-md">
						<NavLink to="models">
							<button className="btn btn-primary">Vehicle Models</button>
						</NavLink>
					</div>
					<div className="col-md">
						<NavLink to="automobile">
							<button className="btn btn-primary">Automobiles</button>
						</NavLink>
					</div>
				</div>
				<div className="row mt-4">
					<p>
						To enter in new manufacturers, vehicle models or automobiles, please
						select a link below:
					</p>
				</div>
				<div className="row mb-5">
					<div className="col-md">
						<NavLink to="manufacturers/new">
							<button className="btn btn-primary">Enter a Manufacturer</button>
						</NavLink>
					</div>
					<div className="col-md">
						<NavLink to="models/new">
							<button className="btn btn-primary">Enter a Vehicle Model</button>
						</NavLink>
					</div>
					<div className="col-md">
						<NavLink to="automobiles/new">
							<button className="btn btn-primary">Enter a Automobile</button>
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InventoryPage;
