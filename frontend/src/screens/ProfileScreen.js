import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

function ProfileScreen() {
  const [isMatchPassword, setIsMatchPassword] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [successUpdate, setSuccessUpdate] = useState(false)
  const [errorUpdate, setErrorUpdate] = useState(false)

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdateProfile,
    error: errorUpdateProfile,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();

  useEffect(() => {
    if (password === confirmPassword) {
      setIsMatchPassword(true);
    } else {
      setIsMatchPassword(false);
    }
  }, [confirmPassword, password]);

  useEffect(() => {
    if (!user) {
      dispatch(detailsUser(userInfo._id));
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    } else {
      if (user.name !== userInfo.name) {
        dispatch(detailsUser(userInfo._id));
      }
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user, userInfo.name]);

  useEffect(() => {
    if (successUpdateProfile) {
      setSuccessUpdate(true);
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    }
    if (errorUpdateProfile) {
      setErrorUpdate(true);
    }
  }, [successUpdateProfile, dispatch, errorUpdateProfile])

  useEffect(() => {
    let hideSuccessNotification = setTimeout(() => setSuccessUpdate(false), 3000);

    return () => {
      clearTimeout(hideSuccessNotification);
    };
  }, [successUpdate])

  useEffect(() => {
    let hideErrorNotification = setTimeout(() => setErrorUpdate(false), 3000);

    return () => {
      clearTimeout(hideErrorNotification);
    };
  }, [errorUpdate])

  const submitHandler = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      dispatch(updateUserProfile({ userId: user._id, name, email, password }));
    }
  };

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
            {loadingUpdate && <LoadingBox />}
            {errorUpdate && (
              <MessageBox variant="error">{errorUpdateProfile}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile updated successfully
              </MessageBox>
            )}
            <div>
              <label htmlFor="name">Name</label>
              <input
                name="name"
                placeholder="Enter name"
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email">E-mail address</label>
              <input
                name="email"
                placeholder="Enter e-mail"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                placeholder="Enter password"
                value={password}
                type="password"
                autoComplete="true"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                name="confirmPassword"
                placeholder="Enter confirm password"
                type="password"
                autoComplete="true"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!isMatchPassword && (
                <p style={{ color: "red", marginTop: "1rem" }}>
                  Passwords are not matched
                </p>
              )}
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
