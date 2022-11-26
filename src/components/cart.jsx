import React, { Component } from "react";
import Counter from "./counter.jsx";
import ProductD from "../images/ProductD.svg";
import { connect } from "react-redux";
import allActions from "../Actions";

class Cart extends Component {
  state = {
  };

  handleAddToCart = (event, product) => {
    event.preventDefault();
     this.props.increaseProductQuantity(product);  
  };

  handleRemoveFromCart = (event, product) => {
    event.preventDefault();   
     this.props.decreaseProductQuantity(product);
    
  };

  handleSelectAttribute = (event, product, attribute, item) => {
    event.preventDefault();

    const newAttribute = {
      productId: product.id,
      name: attribute.name,
      newAttributId: item.id,
      newAttributeValue: item.value,
    }

    this.props.updateProduct(newAttribute)
  };


  render() {
    return (
      <div className="cart">
        {/* Header */}
        <h1>CART</h1>

        {this.props.products.map((product, index) => {
          return (
            <div className="checkoutDetails" key={index}>
              <div className="productDetail">
                <div className="productTitle">{product.name}</div>
                {product.prices.map((price, index) => {
                  if (price.currency.label === this.props.currency.currency) {
                    return (
                      <div className="checkoutPrice" key={index}>
                        {price.currency.symbol} {price.amount.toFixed(2)}                  
                      </div>
                    )
                  }  
                })}                

                {product.attributes?.map((attribute, index) => {
                  if (attribute.name === "Color") {
                    return (
                      <div key={index}>
                        <div className="color">COLOR:</div>
                        <div className="colorContainer">
                          {attribute.items?.map((color, index) => {
                            return (
                              <button
                                key={index}
                                className="colorDescription"
                                style={{
                                  backgroundColor: color.value,
                                  border:
                                    attribute.selected === color.id
                                      ? "3px solid green"
                                      : "",
                                }}
                              ></button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  } else {
                     return (
                      <div key={index}>
                        <div className="size">
                          {attribute.name.toUpperCase()}:
                        </div>
                        <div className="sizeContainer">
                          {attribute.items?.map((item, index) => {
                            return (
                              <button
                                key={index}
                                className="sizeDescription"
                                onClick={(e) =>
                                this.handleSelectAttribute(e, product, attribute, item)
                              }
                                style={{
                                  border: attribute.selected === item.id ? "1px solid red" : ""
                                }}
                              >
                                {item.value}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                    // return (
                    //   <div key={index}>
                    //     <div className="size">
                    //       {attribute.name.toUpperCase()}:
                    //     </div>
                    //     <div className="sizeContainer">
                    //       {attribute.items?.map((item, index) => {
                    //         return (
                    //           <button
                    //             key={index}
                    //             className="sizeDescription"
                    //             style={{
                    //               backgroundColor:
                    //                 attribute.selected === item.id
                    //                   ? "black"
                    //                   : "",
                    //               color:
                    //                 attribute.selected === item.id
                    //                   ? "white"
                    //                   : "",
                    //             }}
                    //           >
                    //             {item.value}
                    //           </button>
                    //         );
                    //       })}
                    //     </div>
                    //   </div>
                    // );
                  }
                })}
              </div>

              <div className="counterCheck">
                <Counter product={product} addToCartHandler={this.handleAddToCart} removeFromCartHandler={this.handleRemoveFromCart} />
                <div className="checkoutImage1">
                <img className="cartimg" src={product.image} alt="" />

                </div>
              </div>
            </div>
          );
        })}

        <div className="checkoutTotal">
          <div className="tax">
            Tax 21%: <span className="value">${this.props.cart?.tax?.toFixed(2)}</span>
          </div>
          <div className="quantity">
            Quantity: <span className="value">{this.props.products?.length}</span>
          </div>
          <div className="total">
            Total: <span className="value">${this.props.cart?.cartTotal?.toFixed(2)}</span>
          </div>
          <div className="total">
            Total(Inclusive Tax): <span className="value">${this.props.cart?.overallTotal?.toFixed(2)}</span>
          </div>
          <button className="checkoutButton">ORDER</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const products = state.cart.products;
  const cart = state.cart;
  const currency = state.currency;
  return {
    products,
    cart,
    currency,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    increaseProductQuantity: (product) =>
      dispatch(allActions.cartActions.increaseProductQuantityAction(product)),
    decreaseProductQuantity: (product) =>
      dispatch(allActions.cartActions.decreaseProductQuantityAction(product)),
    updateProduct: (product) =>
      dispatch(allActions.cartActions.updateProductAction(product)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
