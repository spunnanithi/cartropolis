import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function SalesList() {
  const [sales, setSales] = useState([]);
  const fetchData = async () => {
    const url = 'http://localhost:8090/api/sale/';
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        setSales(data.sales);
    }
};

useEffect(() => {
    fetchData();
}, []);

const handleDelete = async (id) => {
    const url = `http://localhost:8090/api/sale/${id}`;
    const response = await fetch(url, {
        method: 'DELETE',
    });
    if (response.ok) {
        fetchData();
    }
};

return (
    <div className="container">
        <div className="row">
            <div className="col">
                <div className="offset-2 col-8">
                    <h1>Sales</h1>
                            <div className="card-body">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Sales Rep</th>
                                            <th>Employee ID</th>
                                            <th>Customer</th>
                                            <th>VIN</th>
                                            <th>Sale Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sales.map(sale => (
                                            <tr key={sale.id}>
                                                <td>{sale.sales_rep.name}</td>
                                                <td>{sale.sales_rep.id}</td>
                                                <td>{sale.customer.name}</td>
                                                <td>{sale.automobile.vin}</td>
                                                <td>{sale.price}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => handleDelete(sale.id)}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ),)}
                                    </tbody>
                                </table>
                            </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default SalesList;
