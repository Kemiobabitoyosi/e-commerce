const initialState = {
  currency: "USD",
};

const currency = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_CURRENCY":
      const newCurrency = action.payload;
      return {
        currency: newCurrency,
      };
    default:
      return state;
  }
};

export default currency;
