import { MdDeleteForever } from "react-icons/md";
import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";

function CartScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping cart</h1>
        <hr />
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img src={item.image} alt={item.name} className="small" />
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <input
                      min="1"
                      max={item.countInStock}
                      type="number"
                      name="qty"
                      onChange={(e) => {
                        if (
                          e.target.value > 0 &&
                          e.target.value <= item.countInStock
                        ) {
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          );
                        }
                      }}
                      value={item.qty}
                    />{" "}
                    / {item.countInStock}
                  </div>
                  <div>${item.price}</div>
                  <div>
                    <button
                      className="delete"
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <MdDeleteForever
                        style={{
                          fontSize: "2rem",
                          color: "rgb(207, 74, 74)",
                        }}
                      />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal (
                {cartItems.reduce((a, c) => parseInt(a) + parseInt(c.qty), 0)}{" "}
                items) : $
                {cartItems.reduce(
                  (a, c) =>
                    (
                      parseFloat(a) +
                      parseFloat(c.price) * parseFloat(c.qty)
                    ).toFixed(2),
                  0
                )}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
