import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { BiHomeSmile } from "react-icons/bi";
import { BsPencil } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

import { addToCart } from "../actions/cartActions";
import { deleteProduct, detailsProduct } from "../actions/productActions";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { PRODUCT_DELETE_RESET } from "../constants/productConstants";

const ProductScreen = (props) => {
  const [qty, setQty] = useState(1);

  const [toCart, setToCart] = useState(false);
  const [successAdd, setSuccessAdd] = useState(false);

  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const [isAdmin, setIsAdmin] = useState(false);

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(detailsProduct(productId));
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
  }, [dispatch, productId, successDelete]);

  useEffect(() => {
    if (toCart) {
      dispatch(addToCart(productId, qty));
      setSuccessAdd(true);
    }
    setToCart(false);
  }, [dispatch, toCart, productId, qty]);

  useEffect(() => {
    if (successAdd) {
      let hideNotification = setTimeout(() => setSuccessAdd(false), 2000);

      return () => {
        clearTimeout(hideNotification);
      };
    }
  }, [successAdd]);

  const buyNowHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  const deleteHandler = () => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(productId));
    }
  };

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : (
        <div>
          <div style={{ display: "flex" }}>
            <Link to="/">
              <div className="back">
                <BiHomeSmile style={{ transform: "translate(0, .2rem)" }} />{" "}
                Back to home
              </div>
            </Link>
            {isAdmin && (
              <>
                <Link to={`/product/${product._id}/edit`}>
                  <div className="back" style={{ marginLeft: ".3rem" }}>
                    <BsPencil style={{ transform: "translate(0, .2rem)" }} />{" "}
                    Edit
                  </div>
                </Link>
                <Link onClick={deleteHandler}>
                  <div className="back" style={{ marginLeft: ".3rem" }}>
                    <AiOutlineDelete
                      style={{ transform: "translate(0, .2rem)" }}
                    />
                    Delete
                  </div>
                </Link>
              </>
            )}
          </div>
          <div className="row top">
            <div className="col-2">
              <img className="large" src={product.image} alt={product.name} />
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li className="rating">
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </li>
                <li>
                  <b>Price:</b>${product.price}
                </li>
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
                    <div>
                      <b>Price:</b>
                    </div>
                    <div className="price">${product.price}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>
                      <b>Status:</b>
                    </div>
                    <div>
                      {product.countInStock > 0 ? (
                        <span className="success">In stock</span>
                      ) : (
                        <span className="danger">Out of stock</span>
                      )}
                    </div>
                  </div>
                </li>
                {product.countInStock > 0 && (
                  <>
                    <li>
                      <div className="row">
                        <div>
                          <b>Quantity:</b>
                        </div>
                        <div>
                          <select
                            name={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {qty}
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    </li>
                    <li>
                      <button
                        onClick={() => setToCart(true)}
                        className="primary block"
                      >
                        Add to cart
                      </button>
                    </li>
                    <li>
                      <button onClick={buyNowHandler} className="primary block">
                        Buy now
                      </button>
                    </li>
                    {successAdd && (
                      <li>
                        <MessageBox variant="success">
                          A product has been added to the cart
                        </MessageBox>
                      </li>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
