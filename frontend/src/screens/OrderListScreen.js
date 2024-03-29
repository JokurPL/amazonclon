import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteOrder, listOrders } from "../actions/orderAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_DELETE_RESET } from "../constants/orderConstants";

function OrderListScreen(props) {
  const sellerMode = props.match.path.indexOf("/seller") >= 0;

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { error, loading, orders } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders({ seller: sellerMode ? userInfo._id : "" }));
  }, [dispatch, sellerMode, successDelete, userInfo._id]);

  const deleteHandler = (order) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteOrder(order._id));
    }
  };

  return (
    <div>
      <h1>
        Orders <hr />
      </h1>
      {loadingDelete && <LoadingBox class="order-loading" />}
      {errorDelete && <MessageBox variant="error">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Order number</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total price</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <Link to={`/order/${order._id}`}>{order._id}</Link>
                </td>
                <td>{order.user.name}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    <span className="success">
                      {new Date(order.paidAt).toLocaleString()}
                    </span>
                  ) : (
                    <span className="danger">No</span>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <span className="success">
                      {new Date(order.deliveredAt).toLocaleString()}
                    </span>
                  ) : (
                    <span className="danger">No</span>
                  )}
                </td>
                <td>
                  <button type="button" onClick={() => deleteHandler(order)}>
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

export default OrderListScreen;
