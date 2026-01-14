import React, { useState, useEffect } from 'react';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Convert price to number and prepare the product object
        const productToSave = {
            id: null,  // Let database auto-assign
            sku: newProduct.sku,
            description: newProduct.description,
            price: parseFloat(newProduct.price)
        };
        
        // Make POST request
        fetch('/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productToSave)
        })
        .then(response => response.json())
        .then(data => {
            // Add new product to the list
            setProducts([...products, data]);
            // Reset form
            setNewProduct({ sku: '', description: '', price: '' });
            setShowAddForm(false);
        })
        .catch(error => console.error('Error creating product:', error));
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
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.sku}</td>
                            <td>{product.description}</td>
                            <td>£{product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;