import React, { Component } from "react";
import Counters from "./counters.jsx";
import OverlayImage from "../images/OverlayImage.svg";
import Category from "./category.jsx";
import allActions from "../Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Overlay extends Component {
  state = {
    productPrice: 50,
    total: 200,
    count: 0,
  };

  addItem = () => {
    this.setState({ count: this.state.count + 1 });
  };

  removeItem = () => {
    if (this.state.count === 0) {
      return;
    }
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    return (
      <div className="cart2">
        {/* Header */}
        <h1 className="bagItems">My Bag, <span className="bagItemTotal" >{this.props.products.length}</span> Items</h1>

        {/* Checkout Info */}
        <div className="checkoutDetails2">
          {/* Product Info */}
          <div className="product-info">
            {this.props.products?.map((product, index) => {
              return (
                <div className="cart-row" key={index}>
                  <div className="productDetail">
                    <div className="productTitle2">{product.name}</div>
                    <div className="checkoutPrice2">
                      ${this.state.productPrice.toFixed(2)}
                    </div>

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
                      <Counters />
                      {/* {{
                        backgroundColor:
                          this.handleShowCart === true ? "red" : "",
                      }} */}
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
            <span className="totalValue">${this.state.total.toFixed(2)}</span>
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
  return {
    products,
  };
}

export default connect(mapStateToProps)(Overlay);
