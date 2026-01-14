import './App.css';
import React, { useState } from 'react';
import ProductList from './ProductList';
import CustomerList from './CustomerList';

function App() {
  const [activeView, setActiveView] = useState('products');

  return (
    <div className="App">
      <header className="App-header">
        <h1>OGL Developer Test</h1>
        <nav style={{ marginTop: '20px' }}>
          <button 
            onClick={() => setActiveView('products')}
            style={{ 
              marginRight: '10px', 
              padding: '10px 20px',
              backgroundColor: activeView === 'products' ? '#61dafb' : '#fff'
            }}
          >
            Products
          </button>
          <button 
            onClick={() => setActiveView('customers')}
            style={{ 
              padding: '10px 20px',
              backgroundColor: activeView === 'customers' ? '#61dafb' : '#fff'
            }}
          >
            Customers
          </button>
        </nav>
      </header>
      <main style={{ padding: '20px' }}>
        {activeView === 'products' && <ProductList />}
        {activeView === 'customers' && <CustomerList />}
      </main>
    </div>
  );
}

export default App;