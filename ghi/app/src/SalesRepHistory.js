import React, { useState, useEffect } from "react";

function SalesRepHistory() {
  const [sales, setSales] = useState([]);
  const [salesRepId, setSalesRepId] = useState("");
  const [salesReps, setSalesReps] = useState([]);

  const handleSalesRepChange = (event) => {
    setSalesRepId(event.target.value);
  };

  const fetchSales = async () => {
    if (salesRepId) {
      const url = "http://localhost:8090/api/sale/";
      const response = await fetch(url);
      const data = await response.json();
      setSales(data.sales);
    }
  };

  const fetchSalesReps = async () => {
    const url = "http://localhost:8090/api/salesrep/";
    const response = await fetch(url);
    const data = await response.json();
    setSalesReps(data.salesrep);
  };

  useEffect(() => {
    fetchSalesReps();
  }, []);

  useEffect(() => {
    fetchSales();
  }, [salesRepId]);

  return (
    <>
      <div className="container">
        <h1 className="text-center">Sales Representative History</h1>
        <div className="form-group">
          <select
            type="text"
            className="form-control mx-auto"
            id="sales_rep"
            placeholder="Choose a sales representative"
            value={salesRepId}
            onChange={handleSalesRepChange}
            name="sales_rep"
            style={{ width: "50%" }}
          >
            <option value="">Choose A Sales Representative</option>
            {salesReps.map(salesRep => {
              return (
                <option value={salesRep.id} key={salesRep.id}>
                  {salesRep.name}
                </option>
              );
            })}
          </select>
        </div>
          <div className="card mx-auto" style={{ width: "75%" }}>
          <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Sales Representative</th>
                <th>Customer</th>
                <th> VIN </th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {sales.map( sale => {
                if (sale.sales_rep.id == salesRepId)
                return (
                  <tr key={sale.id}>
                    <td>{sale.sales_rep.name}</td>
                    <td>{sale.customer.name}</td>
                    <td>{sale.automobile.vin}</td>
                    <td>{sale.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </>
  );
}

export default SalesRepHistory;
