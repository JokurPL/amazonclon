import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_RESET } from "../constants/userConstants";

function UserEditScreen(props) {
  const userId = props.match.params.id;

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push("/userslist");
    }

    if (!user || user._id !== userId) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsSeller(user.isSeller);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, props.history, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: userId,
        name: name,
        email: email,
        isSeller: isSeller,
        isAdmin: isAdmin,
      })
    );
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>
            Edit user: {user && user.name} <hr />
            {loadingUpdate && <LoadingBox class="order-loading" />}
            {errorUpdate && (
              <MessageBox variant="error">{errorUpdate}</MessageBox>
            )}
          </h1>
        </div>
        {loading ? (
          <LoadingBox class="order-loading" />
        ) : error ? (
          <MessageBox variant="error">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                placeholder="Enter e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="isSeller">Is seller</label>
              <input
                type="checkbox"
                id="isSeller"
                checked={isSeller}
                onChange={(e) => setIsSeller(e.target.checked)}
              />
            </div>
            <div>
              <label htmlFor="isAdmin">Is admin</label>
              <input
                type="checkbox"
                id="isSeller"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </div>
            <div>
              <button type="submit" className="primary">
                Update user
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default UserEditScreen;
