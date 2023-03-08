import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ListAppointment from "./ListAppointment";
import CreateAppointment from "./CreateAppointment";
import CreateTechnician from "./CreateTechnician";
import SearchAppointment from "./SearchAppointment";
import ListManufacturers from "./ListManufacturers";
import ListVehicleModels from "./ListVehicleModels";
import ListAutomobiles from "./ListAutomobiles";
import InventoryPage from "./InventoryPage";

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="inventory">
						<Route path="" element={<InventoryPage />}></Route>
						<Route path="manufacturers" element={<ListManufacturers />}></Route>
						<Route path="models" element={<ListVehicleModels />}></Route>
						<Route path="automobiles" element={<ListAutomobiles />}></Route>
					</Route>
					<Route path="services">
						<Route path="" element={<ListAppointment />}></Route>
						<Route path="search" element={<SearchAppointment />}></Route>
						<Route path="new" element={<CreateAppointment />}></Route>
						<Route
							path="technicians/new"
							element={<CreateTechnician />}></Route>
					</Route>
					<Route path="sales"></Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
