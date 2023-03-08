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
						<NavLink to="automobiles">Automobiles</NavLink>
					</div>
				</div>
			</div>
		</>
	);
};

export default InventoryPage;
