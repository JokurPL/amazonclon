import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

function PlaceOrderScreen(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }

  cart.itemsPrice = cart.cartItems.reduce(
    (a, c) =>
      (parseFloat(a) + parseFloat(c.price) * parseFloat(c.qty)).toFixed(2),
    0
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? 0.0 : 10.0;
  cart.taxPrice = (0.23 * cart.itemsPrice).toFixed(2);
  cart.totalPrice =
    parseFloat(cart.shippingPrice) +
    parseFloat(cart.itemsPrice) +
    parseFloat(cart.taxPrice);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>
                  Shipping <hr />
                </h2>
                <p>
                  <strong>Name: </strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address: </strong> <br />
                  {cart.shippingAddress.address} <br />
                  {cart.shippingAddress.city} <br />
                  {cart.shippingAddress.postalCode} <br />
                  {cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>
                  Payment <hr />
                </h2>
                <p>
                  <strong>Method: </strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>
                  Order items <hr />
                </h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          />
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          {item.qty} x ${item.price} = $
                          {(parseInt(item.qty) * item.price).toFixed(2)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h1>
                  Order summary <hr />
                </h1>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${cart.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${cart.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${cart.taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <b>Total</b>
                  </div>
                  <div>${cart.totalPrice}</div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  disabled={cart.cartItems.length === 0}
                  className="primary"
                  style={{ width: "100%" }}
                >
                  Place order
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
