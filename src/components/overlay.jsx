import React, { Component } from "react";
import Counter from "./counter.jsx";
import OverlayImage from "../images/OverlayImage.svg";
import Category from "./category.jsx";
import allActions from "../Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Overlay extends Component {
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

  render() {
    return (
      <div className="cart2">
        {/* Header */}
        <h1 className="bagItems">My Bag, 3 Items</h1>

        {/* Checkout Info */}
        <div className="checkoutDetails2">
          {/* Product Info */}
          <div className="product-info">
            {this.props.products?.map((product, index) => {
              return (
                <div className="cart-row" key={index}>
                  <div className="productDetail">
                    <div className="productTitle2">{product.name}</div>
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
                            <div className="color2">Color:</div>
                            <div className="colorContainer">
                              {attribute.items?.map((color, index) => {
                                return (
                                  <button
                                    key={index}
                                    className="colorDescription2"
                                    style={{ backgroundColor: color.value }}
                                    onClick={(e) =>
                                      this.handleSelectAttribute(
                                        e,
                                        attribute,
                                        color
                                      )
                                    }
                                  ></button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div key={index}>
                            <div className="size2">
                              {attribute.name.toUpperCase()}:
                            </div>
                            <div className="sizeContainer2">
                              {attribute.items?.map((item, index) => {
                                return (
                                  <button
                                    key={index}
                                    className="sizeDescription2"
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
                      }
                    })}
                  </div>

                  {/* Counter */}
                  <div className="counterCheck2">
                    <div className="counter2">
                      <Counter product={product} addToCartHandler={this.handleAddToCart} removeFromCartHandler={this.handleRemoveFromCart} />
                      {/* <button onClick={this.addItem} className="addItem2">
                        +
                      </button>
                      <div className="itemNumber2">{ this.state.count }</div>
                      <button
                        onClick={this.removeItem}
                        className="removeItem2"
                        //   disabled={this.state.count === 0}
                      >
                        -
                      </button> */}
                    </div>

                    <div className="checkoutImage2">
                      <img
                        src={product.image}
                        alt=""
                        className="checkoutImage2-inner"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="checkoutTotal">
          <div className="total2">
            <span className="overlayTotal">Total</span>
            <span className="totalValue">${this.props.cart.overallTotal.toFixed(2)}</span>
          </div>
          <div className="buttons">
            <Link to="/cart" className="viewBag">
              VIEW BAG
            </Link>
            <button className="checkOverlay">CHECKOUT</button>
          </div>
        </div>
      </div>
    );
  }
 
}

function mapStateToProps(state) {
  const products = state.cart.products;
  const currency = state.currency;
  return {
    products,
    cart: state.cart,
    currency
  };
}

function mapDispatchToProps(dispatch) {
  return {
    increaseProductQuantity: (product) =>
      dispatch(allActions.cartActions.increaseProductQuantityAction(product)),
    decreaseProductQuantity: (product) =>
      dispatch(allActions.cartActions.decreaseProductQuantityAction(product)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
