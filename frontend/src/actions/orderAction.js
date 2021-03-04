import axios from 'axios'
import { ORDER_CREATE_REQUEST, ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_FAIL, ORDER_DETAILS_SUCCESS } from '../constants/orderConstants'
import { CART_EMPTY } from '../constants/cartConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order })
    try {
        const {
            userSignIn: { userInfo },
        } = getState();
        const { data } = await axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        })
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order })
        dispatch({ type: CART_EMPTY })
        localStorage.removeItem("cartItems")
    } catch (error) {
        dispatch({ type: ORDER_CREATE_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    const { userSignIn: { userInfo } } = getState();
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId })
    try {
        const { data } = await axios.get(`/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}