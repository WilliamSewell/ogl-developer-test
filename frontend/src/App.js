import './App.css';
import ProductList from './ProductList'; // Using PascalCase for the component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>OGL Developer Test</h1>
      </header>
      <main>
        <ProductList />
      </main>
    </div>
  );
}

export default App;