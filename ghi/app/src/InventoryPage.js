import React from "react";
import { NavLink } from "react-router-dom";

const InventoryPage = () => {
	return (
		<>
			<h1 className="text-center">Inventory</h1>
			<div className="container">
				<div className="row">
					<div className="col-md">
						<NavLink to="manufacturers">Manufacturers</NavLink>
					</div>
					<div className="col-md">
						<NavLink to="models">Vehicle Models</NavLink>
					</div>
					<div className="col-md">
						<NavLink to="automobile">Automobiles</NavLink>
					</div>
				</div>
				<div className="row">
					<div className="col-md">
						<NavLink to="manufacturers/new">
							<button className="btn btn-primary">Create a Manufacturer</button>
						</NavLink>
					</div>
					<div className="col-md">
						<NavLink to="models/new">
							<button className="btn btn-primary">
								Create a Vehicle Model
							</button>
						</NavLink>
					</div>
					<div className="col-md">
						<NavLink to="automobiles/new">
							<button className="btn btn-primary">Create a Automobile</button>
						</NavLink>
					</div>
				</div>
			</div>
		</>
	);
};

export default InventoryPage;
