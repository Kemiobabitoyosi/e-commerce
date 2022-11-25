import React, { Component } from "react";

class Counter extends Component {
  state = {
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
      <div className="counter">
        <button onClick={this.addItem} className="addItem">
          +
        </button>
        <div className="itemNumber">{this.state.count}</div>
        <button
          onClick={this.removeItem}
          className="removeItem"
        >
          -
        </button>
      </div>
    );
  }
}

export default Counter;
