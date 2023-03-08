import React from "react";
import { useState } from "react";

const SearchAppointment = (props) => {
	const [searchBar, setSearchBar] = useState("");

	const handleSearchBar = () => {};

	console.log(props);
	return (
		<div className="input-group">
			<input
				type="search"
				className="form-control rounded"
				placeholder="Search"
				aria-label="Search"
				aria-describedby="search-addon"
			/>
			<button type="button" className="btn btn-outline-primary">
				Search VIN
			</button>
		</div>
	);
};

export default SearchAppointment;
