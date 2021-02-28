import { useState } from "react";
import data from './data';

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
            <div key={product._id} className="card">
              <a href={`/product/${product._id}`}>
                <img
                  className="medium"
                  src={product.image}
                  alt="product"
                />
              </a>
              <div className="card-body">
                <a href={`/product/${product._id}`}>
                  <h1>{product.name}</h1>
                </a>
                <div className="rating">
                  <span>
                    <i className="fas fa-star"></i>
                  </span>
                  <span>
                    <i className="fas fa-star"></i>
                  </span>
                  <span>
                    <i className="fas fa-star"></i>
                  </span>
                  <span>
                    <i className="fas fa-star"></i>
                  </span>
                  <span>
                    <i className="fas fa-star"></i>
                  </span>
                </div>
                <div className="price">${product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="row center">All right reserved &copy; 2021</footer>
    </div>
  );
}

export default App;
