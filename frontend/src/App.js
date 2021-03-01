import { useState } from "react";
import data from './data';

import Product from './Components/Product';

import "./index.css";

function App() {
  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <a className="brand" href="/">
            amazonClon
          </a>
        </div>
        <div>
          <a href="/card">Cart</a>
          <a href="/signin">Sign In</a>
        </div>
      </header>

      <main>
        <div className="row center">
          {data.products.map((product) => (
              <Product key={product._id}  product={product} />
          ))}
        </div>
      </main>

      <footer className="row center">All right reserved &copy; 2021</footer>
    </div>
  );
}

export default App;
