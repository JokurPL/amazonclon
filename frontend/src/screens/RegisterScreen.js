import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function RegisterScreen(props) {
  const [isEqualPassword, setIsEqualPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const submitHandler = (e) => {
    e.preventDefault();
    if (isEqualPassword) {
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (password !== confirmPassword) {
      setIsEqualPassword(false);
    } else {
      setIsEqualPassword(true);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, userInfo, redirect]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>
            Create account
            <hr />
          </h1>
        </div>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="error">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter name"
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            placeholder="Enter email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            autoComplete="on"
            type="password"
            placeholder="Enter password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <label htmlFor="confrimPassword">Confirm password</label>
          <input
            autoComplete="on"
            type="password"
            placeholder="Enter confirm password"
            id="confirmPassword"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>
        {!isEqualPassword && (
          <div style={{ color: "red" }}>Passwords don't match</div>
        )}
        <div>
          <label />
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account?{" "}
            <Link to={`/signin?redirect=${redirect}`}>Sing in </Link>now
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterScreen;
