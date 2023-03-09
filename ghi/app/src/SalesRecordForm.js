import React, { useState, useEffect } from "react";

function SalesRecordForm() {
    const [automobiles, setAutomobiles] = useState([]);
    const [salesReps, setSalesReps] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [automobile, setAutomobile] = useState("");
    const [customer, setCustomer] = useState("");
    const [salesRep, setSalesRep] = useState("");
    const [price, setPrice] = useState("");

    const handleAutomobileChange = (event) => {
    setAutomobile(event.target.value);
    };

    const handlePriceChange = (event) => {
    setPrice(event.target.value);
    };

    const handleCustomerChange = (event) => {
    setCustomer(event.target.value);
    };

    const handleSalesRepChange = (event) => {
    setSalesRep(event.target.value);
    };

    const fetchAutomobile = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);
    const data = await response.json();
    setAutomobile(data.automobile);
    };

    const fetchAutomobiles = async () => {
    const url = "http://localhost:8090/api/automobile/";
    const response = await fetch(url);
    const data = await response.json();
    setAutomobiles(data.automobiles);
    };

    const fetchSalesReps = async () => {
    const url = "http://localhost:8090/api/salesrep/";
    const response = await fetch(url);
    const data = await response.json();
    setSalesReps(data.salesrep);
    };

    const fetchCustomers = async () => {
    const url = "http://localhost:8090/api/customer/";
    const response = await fetch(url);
    const data = await response.json();
    setCustomers(data.customers);
    };

    useEffect(() => {
    fetchAutomobiles();
    fetchSalesReps();
    fetchCustomers();
    fetchAutomobile();
    }, []);

    const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
        automobile: automobile,
        price: price,
        customer: customer,
        sales_rep: salesRep,
    };
    const url = "http://localhost:8090/api/sale/";
    const fetchConfig = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
        "Content-Type": "application/json",
        },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
        setAutomobile("");
        setPrice("");
        setCustomer("");
        setSalesRep("");
    }
};

return (
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <h1 className="text-center">Sales Record Form</h1>
                <div className="card mx-auto" style={{ width: "60%" }}>
                    <div className="card-body">
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="car">Automobile</label>
                <select
                type="text"
                className="form-control"
                id="automobile"
                placeholder="Enter car"
                value={automobile}
                onChange={handleAutomobileChange}
                name="automobile"
                >
                <option value="">Choose A Automobile</option>
                {automobiles.map(automobile => {
                    if (automobile.sold === false)
                    return (
                    <option value={automobile.vin} key={automobile.vin}>
                    {automobile.vin}
                    </option>
                    )
                    })}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="salesRep">Sales Representative</label>
                <select
                type="text"
                className="form-control"
                id="sales_rep"
                placeholder="Enter sales representative"
                value={salesRep}
                onChange={handleSalesRepChange}
                name="sales_rep"
                >
                <option value="">Choose A Sales Representative</option>
                {salesReps.map(salesRep => {
                    return (
                    <option value={salesRep.id} key={salesRep.id}>
                    {salesRep.name}
                    </option>
                    )
                    })}
                </select>
            <div className="form-group">
                <label htmlFor="customer">Customer</label>
                <select
                type="text"
                className="form-control"
                id="customer"
                placeholder="Enter customer"
                value={customer}
                onChange={handleCustomerChange}
                name="customer"
                >
                <option value="">Choose A Customer</option>
                {customers.map(customer => {
                    return (
                    <option value={customer.name} key={customer.name}>
                    {customer.name}
                    </option>
                    )
                })}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                type="number"
                className="form-control"
                id="price"
                placeholder="Enter price"
                value={price}
                onChange={handlePriceChange}
                />
            </div>
            </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
            </form>
            </div>
            </div>
            </div>
        </div>
    </div>
);
}


export default SalesRecordForm;
