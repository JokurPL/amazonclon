import { BrowserRouter, Link, Route } from "react-router-dom"

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from "./screens/CartScreen"
import SignInScreen from "./screens/SignInScreen"

import "./index.css"
import { useSelector } from "react-redux"

function App() {

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

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
            <Link to="/cart">Cart {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}</Link>
            <Link to="/signin">Sign In</Link>
          </div>
        </header>

        <main>
          <Route path="/signin" component={SignInScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/" component={HomeScreen} exact />
        </main>

        <footer className="row center">All right reserved &copy; 2021</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
