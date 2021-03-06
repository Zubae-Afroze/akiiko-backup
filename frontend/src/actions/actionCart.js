import axios from 'axios'

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_RESET,
} from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/product/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      productId: data.productId,
      productName: data.productName,
      image: data.heroImage,
      price: data.price ? data.price : data.mrpPrice,
      group: data.group,
      subGroup: data.subGroup,
      qty,
    },
  })

  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cartList.cartItems)
  )
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cartList.cartItems)
  )
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}

export const resetCartItems = () => (dispatch) => {
  localStorage.removeItem('cartItems')
  dispatch({ type: CART_RESET })
}
