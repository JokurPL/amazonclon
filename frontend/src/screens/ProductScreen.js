import { Link } from "react-router-dom";
import Rating from "../components/Rating";

import data from '../data.js';

const ProductScreen = (props) => {
  const product = data.products.find((x) => x._id === parseInt(props.match.params.id));

  if (!product) {
    return (
      <div>
        <h1>Product not found</h1>
      </div>
    );
  }

  return (
    <>
    <Link className="back" to='/'>Back to home</Link>
      <div className="row top">
        <div className="col-2">
          <img className="large" src={product.image} alt={product.name} />
        </div>
        <div className="col-1">
          <ul>
            <li>
              <h1>{product.name}</h1>
            </li>
            <li class="rating">
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </li>
            <li><b>Price:</b>${product.price}</li>
            <li>
              <b>Description:</b>
              <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <li>
              <div className="row">
                <div><b>Price</b></div>
                <div className="price">${product.price}</div>
              </div>
            </li>
            <li>
              <div className="row">
                <div><b>Status:</b></div>
                <div>
                 {product.countInStock > 0 ? (
                    <span className="success">In stock</span>
                  ) : (
                    <span className="danger">Unavailable</span>
                  )}
                </div>
              </div>
            </li>
            <li>
                <button className="primary block">Add to cart</button>
            </li>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
