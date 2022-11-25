import React, { Component } from "react";
import Counter from "./counter"

class Counters extends Component {
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
            <button onClick={this.addItem} className="addItem1">
              +
            </button>
            <div className="itemNumber1">{this.state.count}</div>
            <button
              onClick={this.removeItem}
              className="removeItem1"
            >
              -
            </button>
          </div>
        );
      }
}
 
export default Counters;