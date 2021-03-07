import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderAction";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import { PayPalButton } from "react-paypal-button-v2";

function OrderScreen(props) {
  const dispatch = useDispatch();

  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="error">{error}</MessageBox>
  ) : (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h1>Order number: {order._id}</h1>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>
                  Shipping <hr />
                </h2>
                <p>
                  <strong>Name: </strong> {order.shippingAddress.fullName}{" "}
                  <br />
                  <strong>Address: </strong> <br />
                  {order.shippingAddress.address} <br />
                  {order.shippingAddress.city} <br />
                  {order.shippingAddress.postalCode} <br />
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {new Date(order.deliveredAt).toLocaleString()}
                  </MessageBox>
                ) : (
                  <MessageBox variant="error">Not delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>
                  Payment <hr />
                </h2>
                <p>
                  <strong>Method: </strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {new Date(order.paidAt).toLocaleString()}
                  </MessageBox>
                ) : (
                  <MessageBox variant="error">Not paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>
                  Order items <hr />
                </h2>
                <ul>
                  {order.orderItems.map((item) => (
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
                  <div>${order.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${order.taxPrice}</div>
                </div>
              </li>
              <li>
                <hr />
                <div className="row">
                  <div>
                    <b>Total</b>
                  </div>
                  <div>${order.totalPrice.toFixed(2)}</div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox class="order-loading" />
                  ) : (
                    <>
                      <PayPalButton
                        debug="true"
                        amount={order.totalPrice.toFixed(2)}
                        onSuccess={successPaymentHandler}
                      />
                      {errorPay && (
                        <MessageBox variant="error">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox class="order-loading" />}
                    </>
                  )}
                </li>
              )}
              {!order.isDelivered && userInfo.isAdmin && order.isPaid && (
                <li>
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Deliver order
                  </button>
                  <div style={{ marginTop: "1rem" }}>
                    {errorDeliver && (
                      <MessageBox variant="error">{errorDeliver}</MessageBox>
                    )}
                  </div>
                  {loadingDeliver && <LoadingBox class="order-loading" />}
                  {errorDeliver && (
                    <MessageBox variant="error">{errorDeliver}</MessageBox>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderScreen;
