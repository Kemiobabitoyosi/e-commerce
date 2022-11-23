const initialState = {
  products: [],
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const oldproducts = state.products;
      const newProduct = action.payload;
      return {
        ...state,
        products: [...oldproducts, newProduct],
      };
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

export default cart;
