const addToCartAction = (payload) => {
  return {
    type: "ADD_TO_CART",
    payload: payload,
  };
};

const increaseProductQuantityAction = (payload) => {
  return {
    type: "INCREASE_PRODUCT_QUANTITY",
    payload: payload,
  };
};

const decreaseProductQuantityAction = (payload) => {
  return {
    type: "DECREASE_PRODUCT_QUANTITY",
    payload: payload,
  };
};

const updateProductAction = (payload) => {
  return {
    type: "UPDATE_PRODUCT",
    payload: payload,
  };
};

export default {
  addToCartAction,
  increaseProductQuantityAction,
  decreaseProductQuantityAction,
  updateProductAction,
};
