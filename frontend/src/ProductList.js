import React, { useState, useEffect } from 'react';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
        sku: '',
        description: '',
        price: ''
    });
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm, setEditForm] = useState({
        id: null,
        sku: '',
        description: '',
        price: ''
    });

    useEffect(() => {
        fetch('/product')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    // Handlers for adding products
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const productToSave = {
            id: null,
            sku: newProduct.sku,
            description: newProduct.description,
            price: parseFloat(newProduct.price)
        };
        
        fetch('/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productToSave)
        })
        .then(response => response.json())
        .then(data => {
            setProducts([...products, data]);
            setNewProduct({ sku: '', description: '', price: '' });
            setShowAddForm(false);
        })
        .catch(error => console.error('Error creating product:', error));
    };

    // Handlers for editing products
    const handleEdit = (product) => {
        setEditingProduct(product.id);
        setEditForm({
            id: product.id,
            sku: product.sku,
            description: product.description,
            price: product.price
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
        
        const productToUpdate = {
            id: editForm.id,
            sku: editForm.sku,
            description: editForm.description,
            price: parseFloat(editForm.price)
        };
        
        fetch('/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productToUpdate)
        })
        .then(response => response.json())
        .then(data => {
            setProducts(products.map(p => p.id === data.id ? data : p));
            setEditingProduct(null);
            setEditForm({ id: null, sku: '', description: '', price: '' });
        })
        .catch(error => console.error('Error updating product:', error));
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
        setEditForm({ id: null, sku: '', description: '', price: '' });
    };

    return (
        <div>
            <h2>Product Inventory</h2>
            
            {/* Add Product Button */}
            <button onClick={() => setShowAddForm(!showAddForm)}>
                {showAddForm ? 'Cancel' : 'Add New Product'}
            </button>
            
            {/* Add Product Form */}
            {showAddForm && (
                <form onSubmit={handleSubmit} style={{ margin: '20px 0', padding: '10px', border: '1px solid #ccc' }}>
                    <h3>Add New Product</h3>
                    <div style={{ marginBottom: '10px' }}>
                        <label>SKU: </label>
                        <input
                            type="text"
                            name="sku"
                            value={newProduct.sku}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Description: </label>
                        <input
                            type="text"
                            name="description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                            required
                            maxLength="255"
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Price: </label>
                        <input
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={handleInputChange}
                            required
                            step="0.01"
                            min="0"
                        />
                    </div>
                    <button type="submit">Save Product</button>
                </form>
            )}
            
            {/* Product Table */}
            <table border="1" style={{ marginTop: '20px', width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>SKU</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            {editingProduct === product.id ? (
                                // Editing mode - show form inputs
                                <>
                                    <td>{product.id}</td>
                                    <td>
                                        <input
                                            type="text"
                                            name="sku"
                                            value={editForm.sku}
                                            onChange={handleEditChange}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="description"
                                            value={editForm.description}
                                            onChange={handleEditChange}
                                            required
                                            maxLength="255"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            name="price"
                                            value={editForm.price}
                                            onChange={handleEditChange}
                                            required
                                            step="0.01"
                                            min="0"
                                            style={{ width: '80px' }}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={handleUpdate}>Save</button>
                                        {' '}
                                        <button onClick={handleCancelEdit}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                // Normal mode - show product data
                                <>
                                    <td>{product.id}</td>
                                    <td>{product.sku}</td>
                                    <td>{product.description}</td>
                                    <td>£{product.price}</td>
                                    <td>
                                        <button onClick={() => handleEdit(product)}>Edit</button>
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

export default ProductList;