import React, { useState } from 'react';

function SalesRepForm() {
    const [name, setName] = useState('');
    const [employee_id, setEmployeeId] = useState('');

    const handleNameChange = (event) => {
    setName(event.target.value);
    };

    const handleEmployeeIdChange = (event) => {
    setEmployeeId(event.target.value);
    };

    const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
        data.name = name;
        data.employee_id = employee_id;

    const url ="http://localhost:8090/api/salesrep/";
    const fetchConfig = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
    },
};

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
        
        setName("");
        setEmployeeId("");
    };
}


return (
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <h1 className="text-center"> Add Sales Rep</h1>
                <div className="card mx-auto" style={{ width: "50%" }}>
                    <div className="card-body">
                <form onSubmit={handleSubmit} id="Create-Sales-Rep-Form">
                    <div className="form-floating mb-3">
                        <input
                        placeholder="Name"
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        name="name"
                        id="name"
                        className="form-control"
                        />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                        placeholder="Employee ID"
                        type="text"
                        value={employee_id}
                        onChange={handleEmployeeIdChange}
                        name="employee_id"
                        id="employee_id"
                        className="form-control"
                        />
                        <label htmlFor="employee_id">Employee ID</label>
                    </div>
                    <button className="btn btn-primary">Submit</button>
                </form>
                </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default SalesRepForm;
