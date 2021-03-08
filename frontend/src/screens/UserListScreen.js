import React, { useEffect } from "react";
import { MdRemoveCircleOutline } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_DETAILS_RESET } from "../constants/userConstants";

function UserListScreen(props) {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  useEffect(() => {
    dispatch(listUsers());

    dispatch({ type: USER_DETAILS_RESET });
  }, [dispatch, successDelete]);

  const deleteHandler = (user) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(user._id));
    }
  };

  return (
    <div>
      <h1>
        Orders <hr />
      </h1>
      {loadingDelete && <LoadingBox class="user-loading" />}
      {errorDelete && <MessageBox variant="error">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">User deleted success</MessageBox>
      )}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : (
        <table style={{ marginTop: ".5rem" }} className="table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is seller</th>
              <th>Is admin</th>
              <th>Created at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td style={{ fontSize: "3rem" }}>
                  {user.isSeller ? (
                    <span className="success">
                      <IoIosCheckmarkCircleOutline />
                    </span>
                  ) : (
                    <span className="danger">
                      <MdRemoveCircleOutline />
                    </span>
                  )}
                </td>
                <td style={{ fontSize: "3rem" }}>
                  {user.isAdmin ? (
                    <span className="success">
                      <IoIosCheckmarkCircleOutline />
                    </span>
                  ) : (
                    <span className="danger">
                      <MdRemoveCircleOutline />
                    </span>
                  )}
                </td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => props.history.push(`/user/${user._id}/edit`)}
                  >
                    Edit
                  </button>
                  <button type="button" onClick={() => deleteHandler(user)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserListScreen;
