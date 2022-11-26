const initialState = {
  products: [],
  cartTotal: 0,
  tax: 0,
  overallTotal: 0
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let oldProducts = state.products;
      let newProduct = action.payload;
      const existingProductIndex = oldProducts?.findIndex(product => product.id == newProduct.id)
      if (existingProductIndex >= 0) {
        const existingProduct = oldProducts[existingProductIndex];
        existingProduct.quantity += newProduct.quantity
        newProduct = existingProduct;
        oldProducts = oldProducts.filter(product => product.id != newProduct.id)
      }
      
      // let cartTotal = 0;

      const newProductCost = newProduct.prices?.find(price => price.currency.label === newProduct.currency);
      const allProducts = [...oldProducts, newProduct];
    const totalResults = calculateTotal(allProducts, newProduct);

      return {
        ...state,
        products: allProducts,
        cartTotal: totalResults.cartTotal,
        tax: totalResults.tax,
        overallTotal: totalResults.overallTotal
      };
      break;
    case "INCREASE_PRODUCT_QUANTITY":
      const addProduct = action.payload
      const currentProductIndex = state.products.findIndex(product => product.id === addProduct.id);
      if (currentProductIndex < 0) {
        return {...state};
      }
      state.products[currentProductIndex].quantity += 1;
      const totalResult = calculateTotal(state.products, addProduct);
      return {
        ...state, 
        cartTotal: totalResult.cartTotal,
        tax: totalResult.tax,
        overallTotal: totalResult.overallTotal
      };
    case "DECREASE_PRODUCT_QUANTITY": 
      const removeProduct = action.payload
      const currProductIndex = state.products.findIndex(product => product.id === removeProduct.id);
      let products = state.products;

      if (currProductIndex < 0) {
        return {...state};
      }
      products[currProductIndex].quantity -= 1;

      if (products[currProductIndex].quantity === 0) {
        products = products.filter(product => product.id != removeProduct.id)
      }
      const sumResult = calculateTotal(products, removeProduct);
      return {
        ...state,
        products: products, 
        cartTotal: sumResult.cartTotal,
        tax: sumResult.tax,
        overallTotal: sumResult.overallTotal
      };

    case "UPDATE_PRODUCT":
      const updateAttribute = action.payload;
      const currUpdateProductIndex = state.products.findIndex(product => product.id === updateAttribute.productId);
      if (currUpdateProductIndex < 0) {
        return {...state}
      }

      const allCartProducts = state.products;

      const attributeIndex = allCartProducts[currUpdateProductIndex].attributes.findIndex(attribute => attribute.name === updateAttribute.name)
      allCartProducts[currUpdateProductIndex].attributes[attributeIndex].selected = updateAttribute.newAttributId
      
      return {
        ...state,
        products: allCartProducts
      }
    default:
      return state;
  }
};


const calculateTotal = (allProducts, newProduct) => {
  const prices = []
  let cartTotal = 0;
  let overallTotal= 0;
  let tax = 0;
      allProducts.forEach(product => {
        return product.prices.forEach(price => {
          if (price.currency.label === newProduct.currency) {
            prices.push(price.amount * product.quantity)
          }
        })
      })
     
      cartTotal = prices?.reduce((acc, curr) => acc + curr,0)
      tax = (21/100) * cartTotal;
      overallTotal = tax + cartTotal;

     return {
      cartTotal,
      tax,
      overallTotal
     }
}

export default cart;
