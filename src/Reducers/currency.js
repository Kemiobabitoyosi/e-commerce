const initialState = {
  currency: "USD",
  symbol: "$"
};

const currency = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_CURRENCY":
      const newCurrency = action.payload;
      return {
        ...state,
        currency: newCurrency.label,
        symbol: newCurrency.symbol,
      };
    default:
      return state;
  }
};

export default currency;
