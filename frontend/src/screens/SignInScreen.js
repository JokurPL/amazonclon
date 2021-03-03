import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>
            Sign in <hr />
          </h1>
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
            type="password"
            placeholder="Enter password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign in
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer? <Link to="/register">Create your account now</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignInScreen;
