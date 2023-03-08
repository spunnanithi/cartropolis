import React, { useState, useEffect } from 'react';


function AutomobileList() {
    const [autos, setData] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setData(data.autos);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const url = `http://localhost:8100/api/automobiles/${id}`;
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
                <div className="col-md-12">
                    <h1 className="text-center">Automobile List</h1>
                    <div className="card mx-auto">
                        <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th> VIN </th>
                                <th> Color </th>
                                <th> Year </th>
                                <th> Model </th>
                                <th> Manufacturer </th>
                                <th> Remove Car</th>
                            </tr>
                        </thead>
                        <tbody>
                            {autos.map(auto => (
                                <tr key={auto.id}>
                                    <td>{auto.vin}</td>
                                    <td>{auto.color}</td>
                                    <td>{auto.year}</td>
                                    <td>{auto.model.name}</td>
                                    <td>{auto.model.manufacturer.name}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(auto.vin)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AutomobileList;
