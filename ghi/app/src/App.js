import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ListAppointment from "./ListAppointment";
import SalesList from "./SalesList";
import SalesRecordForm from "./SalesRecordForm";
import SalesRepForm from "./SalesRepForm";
import CustomerForm from "./CustomerForm";
import SalesRepHistory from "./SalesRepHistory";

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="inventory"></Route>
					<Route path="services">
						<Route path="" element={<ListAppointment />}></Route>
					</Route>
					<Route path="sales">
						<Route path="" element={<SalesList />} />
					</Route>
					<Route path="sales">
						<Route path="new" element={<SalesRecordForm />} />
					</Route>
					<Route path="salesrep">
						<Route path="" element={<SalesRepForm />} />
					</Route>
					<Route path="customer">
						<Route path="" element={<CustomerForm />} />
					</Route>
					<Route path="sales-history">
						<Route path="" element={<SalesRepHistory />} />
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
