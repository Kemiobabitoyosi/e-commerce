import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <div className="counter">
        <button onClick={(e) => this.props.addToCartHandler(e, this.props.product)} className="addItem">
          +
        </button>
        <div className="itemNumber">{this.props.product?.quantity}</div>
        <button
          onClick={(e) => this.props.removeFromCartHandler(e, this.props.product)} 
          className="removeItem"
        >
          -
        </button>
      </div>
    );
  }

}

export default Counter;
