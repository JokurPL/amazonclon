import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { product } = props;

  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium product" src={product.image} alt="product" />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h1>{product.name}</h1>
        </Link>
        <div className="rating">
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </div>
        <div className="row">
          <div className="price">${product.price}</div>
          <div>
            <Link to={`/seller/${product.seller._id}`}>
              {product.seller.seller.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
