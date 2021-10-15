import React, { useEffect } from 'react';
import './App.css';
import DefaultFooter from './components/Footer';
import LoginPage from './components/Login';
import PrimaryAppBar from './components/PrimaryAppBar';
import { ProductTable } from './components/ProductTable';
import { getAllProducts, Product } from './services/ProductService';

function App() {

  const [productList, setProductList] = React.useState<Product[]>([]);

  const getProducts = () => {
    getAllProducts()
      .then((response: any) => {
        setProductList(response.products);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        {/* <PrimaryAppBar/>
        <ProductTable products={productList} />
        <DefaultFooter/> */}
        <LoginPage />
      </header>
    </div>
  );
}

export default App;
