import React from "react";
import { useSelector } from "react-redux";

import { Route, Redirect } from "react-router-dom";

function SellerRoute({ component: Component, ...rest }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.isSeller ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
}

export default SellerRoute;
