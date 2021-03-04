import { BrowserRouter, Link, Route } from "react-router-dom";

import { BsCaretDown } from "react-icons/bs";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SignInScreen from "./screens/SignInScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";

import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "./actions/userActions";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";

function App() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const singOutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              amazonClon
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart{" "}
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <BsCaretDown />{" "}
                </Link>
                <ul className="dropdown-content">
                  <Link to="#signout" onClick={singOutHandler}>
                    Sign out
                  </Link>
                </ul>
              </div>
            ) : (
                <Link to="/signin">Sign In</Link>
              )}
          </div>
        </header>

        <main>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/signin" component={SignInScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/shipping" component={ShippingAddressScreen} />
          <Route path="/payment" component={PaymentMethodScreen} />
        </main>

        <footer className="row center">All right reserved &copy; 2021</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
