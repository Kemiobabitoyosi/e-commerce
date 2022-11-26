import React, { Component } from "react";
import Navlogo from "../images/Navlogo.svg";
import Cart from "../images/Cart.svg";
import { connect } from "react-redux";
import Overlay from "./overlay";
import { Link } from "react-router-dom";
import allActions from "../Actions";

class Navbar extends Component {
  state = {
    showCart: false,
    currencies: [
      { label: "USD", symbol: "$" },
      { label: "GBP", symbol: "£" },
      { label: "AUD", symbol: "A$" },
      { label: "JPY", symbol: "¥" },
      { label: "RUB", symbol: "₽" }
    ]
  };

  handleShowCart = () => {
    this.setState({ showCart: !this.state.showCart });
  };

  handleCurrencyChange = (event) => {
    const value =  event.target.value
    const currencyData = this.state.currencies.find(currency => currency.label === value)
    if (!currencyData) {
      return
    }

    const currency = {
      symbol: currencyData.symbol,
      label: value
    }
    this.props.changeCurrency(currency)
  }

  render() {
    return (
      <div className="navbar">
        {/* People */}
        <div className="people">
             <Link to="/#all"><span className="women">ALL</span></Link>
           <Link to="/#clothes"><span className="men">CLOTHES</span></Link>
           <Link to="/#tech"><span className="children">TECH</span></Link>
        </div>

        {/* NavLogo */}
        <img className="navLogo" src={Navlogo} alt="Shopping bag" />

        {/* Cart Details */}
        <div className="checkout">
          <select className="dropDown" onChange={this.handleCurrencyChange} value={this.props.currency.currency}>
            {this.state.currencies?.map((currency, index) =>
              <option className="dropValue" value={currency.label} key={index}>
              {currency.symbol}
              </option>
            )}
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
  const currency = state.currency;
  return {
    cart,
    currency
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeCurrency: (currency) =>
      dispatch(allActions.currencyAction.changeCurrencyAction(currency)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
