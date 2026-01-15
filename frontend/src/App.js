import './App.css';
import React, { useState } from 'react';
import ProductList from './ProductList';
import CustomerList from './CustomerList';
import CustomerMap from './CustomerMap';

function App() {
  const [activeView, setActiveView] = useState('products');

  return (
    <div className="App">
      <header className="App-header">
        <h1>OGL Developer Test</h1>
        <nav style={{ marginTop: '20px' }}>
          <button 
            onClick={() => setActiveView('products')}
            className={`universal-button ${activeView === 'products' ? 'active' : ''}`}
          >
            Products
          </button>
          <button 
            onClick={() => setActiveView('customers')}
            className={`universal-button ${activeView === 'customers' ? 'active' : ''}`}
          >
            Customers
          </button>
          <button 
            onClick={() => setActiveView('map')}
            className={`universal-button ${activeView === 'map' ? 'active' : ''}`}
          >
            Map
          </button>
        </nav>
      </header>
      <main style={{ padding: '20px' }}>
        {activeView === 'products' && <ProductList />}
        {activeView === 'customers' && <CustomerList />}
        {activeView === 'map' && <CustomerMap />}
      </main>
    </div>
  );
}

export default App;