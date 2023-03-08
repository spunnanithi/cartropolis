import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ListAppointment from "./ListAppointment";
import SalesList from "./SalesList";
import SalesRecordForm from "./SalesRecordForm";

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
						<Route path="" element={<SalesList sale={PaymentResponse.sale} />} />
					</Route>
					<Route path="sales">
						<Route path="new" element={<SalesRecordForm />} />
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
