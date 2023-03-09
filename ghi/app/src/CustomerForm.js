import React, { useState } from 'react';

function CustomerForm() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

    const data = {
        name: name,
        address: address,
        phone: phone,
    };

    const url = "http://localhost:8090/api/customer/";
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
        setAddress("");
        setPhone("");
    };
};

return (
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <h1 className="text-center"> Add Customer</h1>
                <div className="card mx-auto" style={{ width: "50%" }}>
                    <div className="card-body">
                <form onSubmit={handleSubmit} id="Create-Customer-Form">
                    <div className="form-floating mb-3">
                        <input
                        placeholder="Name"
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        name="name"
                        id="name"
                        className="form-control" />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                        placeholder="Address"
                        type="text"
                        value={address}
                        onChange={handleAddressChange}
                        name="address"
                        id="address"
                        className="form-control" />
                        <label htmlFor="address">Address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                        placeholder="Phone"
                        type="text"
                        value={phone}
                        onChange={handlePhoneChange}
                        name="phone"
                        id="phone"
                        className="form-control" />
                        <label htmlFor="phone">Phone</label>
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

export default CustomerForm;
