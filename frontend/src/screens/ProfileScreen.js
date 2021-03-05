import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../actions/userActions";

import {} from "bcryptjs";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function ProfileScreen() {
  const dispatch = useDispatch();

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const submitHandler = (e) => {};

  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [dispatch, userInfo._id]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler} autoComplete="true">
        <div>
          <h1>
            User profile <hr />
          </h1>
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="error">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                name="name"
                placeholder="Enter name"
                value={user.name}
                type="text"
              />
            </div>
            <div>
              <label htmlFor="email">E-mail address</label>
              <input
                name="email"
                placeholder="Enter e-mail"
                value={user.email}
                type="email"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                placeholder="Enter password"
                value={user.password}
                type="password"
                autoComplete="true"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                name="confirmPassword"
                placeholder="Enter confirm password"
                type="password"
                autoComplete="true"
              />
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default ProfileScreen;
