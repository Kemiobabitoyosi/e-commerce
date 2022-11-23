const addToCartAction = (payload) => {
  return {
    type: "ADD_TO_CART",
    payload: payload,
  };
};

const decrement = () => {
  return {
    type: "DECREMENT",
  };
};

export default {
  addToCartAction,
  decrement,
};
