import React, { Component } from "react";
import Navlogo from "../images/Navlogo.svg";
import Cart from "../images/Cart.svg";
import { connect } from "react-redux";
import Overlay from "./overlay";

class Navbar extends Component {
  state = {
    showCart: false,
  };

  handleShowCart = () => {
    this.setState({ showCart: !this.state.showCart });
  };

  render() {
    return (
      <div className="navbar">
        {/* People */}
        <div className="people">
          <span className="women">WOMEN</span>
          <span className="men">MEN</span>
          <span className="children">KIDS</span>
        </div>

        {/* NavLogo */}
        <img className="navLogo" src={Navlogo} alt="Shopping bag" />

        {/* Cart Details */}
        <div className="checkout">
          <select className="dropDown">
            <option className="dropValue" value="$">
              $
            </option>
            <option className="dropValue" value="€">
              €
            </option>
            <option className="dropDown" value="¥">
              ¥
            </option>
          </select>
          <div className="cart-container" onClick={this.handleShowCart}>
            <div
              className="modal"
              
            >
              <img
                className="cartIcon"
                src={Cart}
                alt="Cart"
              />
            </div>
            <span className="prodLength">
              {this.props.cart.products.length}
            </span>
            {this.state.showCart ? <Overlay /> : ""}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const cart = state.cart;
  return {
    cart,
  };
}

export default connect(mapStateToProps)(Navbar);
