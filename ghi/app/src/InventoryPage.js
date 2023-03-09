import React from "react";
import { NavLink } from "react-router-dom";

const InventoryPage = () => {
	return (
		<div className="container">
			<h1 className="text-center">Inventory</h1>
			<div className="container">
				<div className="row mt-5">
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
				<div className="row mt-5">
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
