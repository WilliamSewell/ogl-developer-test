import React, { useState, useEffect } from 'react';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        name: ''
    });
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [editForm, setEditForm] = useState({
        id: null,
        name: ''
    });

    useEffect(() => {
        fetch('/customer')
            .then(response => response.json())
            .then(data => setCustomers(data))
            .catch(error => console.error('Error fetching customers:', error));
    }, []);

    // Handlers for adding customers
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
            name: newCustomer.name
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
            setNewCustomer({ name: '' });
            setShowAddForm(false);
        })
        .catch(error => console.error('Error creating customer:', error));
    };

    // Handlers for editing customers
    const handleEdit = (customer) => {
        setEditingCustomer(customer.id);
        setEditForm({
            id: customer.id,
            name: customer.name
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
            name: editForm.name
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
            setEditForm({ id: null, name: '' });
        })
        .catch(error => console.error('Error updating customer:', error));
    };

    const handleCancelEdit = () => {
        setEditingCustomer(null);
        setEditForm({ id: null, name: '' });
    };

    return (
        <div>
            <h2>Customer Management</h2>
            
            {/* Add Customer Button */}
            <button onClick={() => setShowAddForm(!showAddForm)}>
                {showAddForm ? 'Cancel' : 'Add New Customer'}
            </button>
            
            {/* Add Customer Form */}
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
                                        />
                                    </td>
                                    <td>
                                        <button onClick={handleUpdate}>Save</button>
                                        {' '}
                                        <button onClick={handleCancelEdit}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                // Normal mode
                                <>
                                    <td>{customer.id}</td>
                                    <td>{customer.name}</td>
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