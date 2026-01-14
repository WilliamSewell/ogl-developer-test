import React, { useState, useEffect } from 'react';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        street: '',
        city: '',
        county: '',
        postcode: ''
    });
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [editForm, setEditForm] = useState({
        id: null,
        name: '',
        street: '',
        city: '',
        county: '',
        postcode: ''
    });

    useEffect(() => {
        fetch('/customer')
            .then(response => response.json())
            .then(data => setCustomers(data))
            .catch(error => console.error('Error fetching customers:', error));
    }, []);

    // Handlers for ading customers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer({
            ...newCustomer,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const customerToSave = {
            id: null,
            name: newCustomer.name,
            street: newCustomer.street,
            city: newCustomer.city,
            county: newCustomer.county,
            postcode: newCustomer.postcode
        };
        
        fetch('/customer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerToSave)
        })
        .then(response => response.json())
        .then(data => {
            setCustomers([...customers, data]);
            setNewCustomer({ name: '', street: '', city: '', county: '', postcode: '' });
            setShowAddForm(false);
        })
        .catch(error => console.error('Error creating customer:', error));
    };

    // Handlers for editing customers. Came across a difference here compared to c#  where you would use ?? instead of ||
    const handleEdit = (customer) => {
        setEditingCustomer(customer.id);
        setEditForm({
            id: customer.id,
            name: customer.name,
            street: customer.street || '',
            city: customer.city || '',
            county: customer.county || '',
            postcode: customer.postcode || ''
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm({
            ...editForm,
            [name]: value
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        
        const customerToUpdate = {
            id: editForm.id,
            name: editForm.name,
            street: editForm.street,
            city: editForm.city,
            county: editForm.county,
            postcode: editForm.postcode
        };
        
        fetch('/customer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerToUpdate)
        })
        .then(response => response.json())
        .then(data => {
            setCustomers(customers.map(c => c.id === data.id ? data : c));
            setEditingCustomer(null);
            setEditForm({ id: null, name: '', street: '', city: '', county: '', postcode: '' });
        })
        .catch(error => console.error('Error updating customer:', error));
    };

    const handleCancelEdit = () => {
        setEditingCustomer(null);
        setEditForm({ id: null, name: '', street: '', city: '', county: '', postcode: '' });
    };

    return (
        <div>
            <h2>Customer Management</h2>
            
            {/* Added Customr Button, show the form to add when clicked */}
            <button onClick={() => setShowAddForm(!showAddForm)}>
                {showAddForm ? 'Cancel' : 'Add New Customer'}
            </button>
            
            {/* Added Customer Form */}
            {showAddForm && (
                <form onSubmit={handleSubmit} style={{ margin: '20px 0', padding: '10px', border: '1px solid #ccc' }}>
                    <h3>Add New Customer</h3>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Name: </label>
                        <input
                            type="text"
                            name="name"
                            value={newCustomer.name}
                            onChange={handleInputChange}
                            required
                            maxLength="255"
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Street: </label>
                        <input
                            type="text"
                            name="street"
                            value={newCustomer.street}
                            onChange={handleInputChange}
                            maxLength="255"
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>City: </label>
                        <input
                            type="text"
                            name="city"
                            value={newCustomer.city}
                            onChange={handleInputChange}
                            maxLength="100"
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>County: </label>
                        <input
                            type="text"
                            name="county"
                            value={newCustomer.county}
                            onChange={handleInputChange}
                            maxLength="100"
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Postcode: </label>
                        <input
                            type="text"
                            name="postcode"
                            value={newCustomer.postcode}
                            onChange={handleInputChange}
                            maxLength="10"
                            pattern="[A-Za-z0-9\s-]*"
                            title="Postcode can only contain letters, numbers, spaces, and hyphens"
                        />
                    </div>
                    <button type="submit">Save Customer</button>
                </form>
            )}
            
            {/* Customer Table */}
            <table border="1" style={{ marginTop: '20px', width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>County</th>
                        <th>Postcode</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            {editingCustomer === customer.id ? (
                                // Editing mode
                                <>
                                    <td>{customer.id}</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editForm.name}
                                            onChange={handleEditChange}
                                            required
                                            maxLength="255"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="street"
                                            value={editForm.street}
                                            onChange={handleEditChange}
                                            maxLength="255"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="city"
                                            value={editForm.city}
                                            onChange={handleEditChange}
                                            maxLength="100"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="county"
                                            value={editForm.county}
                                            onChange={handleEditChange}
                                            maxLength="100"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="postcode"
                                            value={editForm.postcode}
                                            onChange={handleEditChange}
                                            maxLength="10"
                                            pattern="[A-Za-z0-9\s-]*"
                                            title="Postcode can only contain letters, numbers, spaces, and hyphens"
                                        />
                                    </td>
                                    <td>
                                        <button onClick={handleUpdate}>Save</button>
                                        {' '}
                                        <button onClick={handleCancelEdit}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                // Normal mode. Display '-' if it comes in as a blank string
                                <>
                                    <td>{customer.id}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.street || '-'}</td>
                                    <td>{customer.city || '-'}</td>
                                    <td>{customer.county || '-'}</td>
                                    <td>{customer.postcode || '-'}</td>
                                    <td>
                                        <button onClick={() => handleEdit(customer)}>Edit</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerList;