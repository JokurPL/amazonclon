import React from "react";
import { Link } from "react-router-dom";

function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 && "active"}>Sign In</div>
      <div className={props.step2 && "active"}>
        {props.step3 || props.step4 ? (
          <Link to="/shipping">Shipping</Link>
        ) : (
          <span>Shipping</span>
        )}
      </div>
      <div className={props.step3 && "active"}>
        {props.step4 ? (
          <Link to="/payment">Payment</Link>
        ) : (
          <span>Payment</span>
        )}
      </div>
      <div className={props.step4 && "active"}>Place order</div>
    </div>
  );
}

export default CheckoutSteps;
