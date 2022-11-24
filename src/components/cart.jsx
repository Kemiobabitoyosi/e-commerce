import React, { Component } from "react";
import Counter from "./counter.jsx";
import ProductD from "../images/ProductD.svg";
import { connect } from "react-redux";

class Cart extends Component {
  state = {
    productTitle: "Apollo",
    productDecription: "Running Short",
    productPrice: 50,
    productImage: ProductD,
    sizeDescription: ["XS", "S", "M", "L"],
    colorDescription: ["", "", ""],
    tax: 42,
    quantity: 3,
    total: 200,
  };
  render() {
    return (
      <div className="cart">
        {/* Header */}
        <h1>CART</h1>

        {this.props.products.map((product, index) => {
          console.log(12, product);
          return (
            <div className="checkoutDetails" key={index}>
              <div className="productDetail">
                <div className="productTitle">{product.name}</div>
                <div className="checkoutPrice">
                  ${this.state.productPrice.toFixed(2)}
                </div>

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
                            console.log(15, attribute);
                            return (
                              <button
                                key={index}
                                className="sizeDescription"
                                style={{
                                  backgroundColor:
                                    attribute.selected === item.id
                                      ? "black"
                                      : "",
                                  color:
                                    attribute.selected === item.id
                                      ? "white"
                                      : "",
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

              <div className="counterCheck">
                <Counter />
                <div className="checkoutImage1">
                <img className="cartimg" src={product.image} alt="" />

                </div>
              </div>
            </div>
          );
        })}

        <div className="checkoutTotal">
          <div className="tax">
            Tax 21%: <span className="value">${this.state.tax.toFixed(2)}</span>
          </div>
          <div className="quantity">
            Quantity: <span className="value">{this.state.quantity}</span>
          </div>
          <div className="total">
            Total: <span className="value">${this.state.total.toFixed(2)}</span>
          </div>
          <button className="checkoutButton">ORDER</button>
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

export default connect(mapStateToProps)(Cart);
