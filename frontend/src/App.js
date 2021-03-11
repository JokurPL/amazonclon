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
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import MqttScreen from "./screens/MqttScreen";
import SellerRoute from "./components/SellerRoute";

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
                  {userInfo.name}{" "}
                  <BsCaretDown style={{ transform: "translate(0, .4rem)" }} />
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={singOutHandler}>
                      Sign out
                    </Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order history</Link>
                  </li>
                  <li>
                    <Link to="/devices/lampka">Lamp</Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to={`/signin`}>Sign In</Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#seller">
                  Seller{" "}
                  <BsCaretDown style={{ transform: "translate(0, .4rem)" }} />
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productslist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderslist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin{" "}
                  <BsCaretDown style={{ transform: "translate(0, .4rem)" }} />
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productslist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderslist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userslist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        <main>
          <Route path="/devices/lampka" component={MqttScreen} />

          <Route path="/signin" component={SignInScreen} />
          <Route path="/register" component={RegisterScreen} />

          <Route path="/cart/:id?" component={CartScreen} />

          <Route path="/product/:id" component={ProductScreen} exact />
          <AdminRoute
            path="/productslist"
            component={ProductListScreen}
            exact
          />
          <AdminRoute path="/product/:id/edit" component={ProductEditScreen} />
          <SellerRoute
            path="/productslist/seller"
            component={ProductListScreen}
          />

          <Route path="/shipping" component={ShippingAddressScreen} />

          <Route path="/payment" component={PaymentMethodScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />

          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/orderhistory" component={OrderHistoryScreen} exact />
          <AdminRoute path="/orderslist" component={OrderListScreen} exact />
          <SellerRoute path="/orderslist/seller" component={OrderListScreen} />

          <PrivateRoute path="/profile" component={ProfileScreen} />
          <AdminRoute path="/userslist" component={UserListScreen} />
          <AdminRoute path="/user/:id/edit" component={UserEditScreen} />

          <Route path="/" component={HomeScreen} exact />
        </main>

        <footer className="row center">All right reserved &copy; 2021</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
