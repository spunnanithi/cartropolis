import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ListAppointment from "./ListAppointment";
import SalesList from "./SalesList";
import SalesRecordForm from "./SalesRecordForm";
import SalesRepForm from "./SalesRepForm";
import CustomerForm from "./CustomerForm";
import SalesRepHistory from "./SalesRepHistory";
import AutomobileList from "./AutomobileList";
import CreateAppointment from "./CreateAppointment";
import CreateTechnician from "./CreateTechnician";
import SearchAppointment from "./SearchAppointment";
import ListManufacturers from "./ListManufacturers";
import ListVehicleModels from "./ListVehicleModels";
import InventoryPage from "./InventoryPage";
import CreateManufacturer from "./CreateManufacturer";
import CreateVehicleModel from "./CreateVehicleModel";
import CreateAutomobile from "./CreateAutomobile";

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
						<Route
							path="manufacturers/new"
							element={<CreateManufacturer />}></Route>
						<Route path="models" element={<ListVehicleModels />}></Route>
						<Route path="models/new" element={<CreateVehicleModel />}></Route>
						<Route path="automobile">
							<Route path="" element={<AutomobileList />} />
						</Route>
						<Route
							path="automobiles/new"
							element={<CreateAutomobile />}></Route>
					</Route>
					<Route path="services">
						<Route path="" element={<ListAppointment />}></Route>
						<Route path="search" element={<SearchAppointment />}></Route>
						<Route path="new" element={<CreateAppointment />}></Route>
						<Route
							path="technicians/new"
							element={<CreateTechnician />}></Route>
					</Route>
					<Route path="sales">
						<Route path="" element={<SalesList />} />
						<Route path="new" element={<SalesRecordForm />} />
						<Route path="salesrep" element={<SalesRepForm />}></Route>
						<Route path="customer" element={<CustomerForm />}></Route>
						<Route path="sales-history" element={<SalesRepHistory />}></Route>
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
