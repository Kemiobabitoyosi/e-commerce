import React, { Component } from "react";
import Cart from "../components/cart";
import Navbar from "../components/navbar";
import ProductA from "../images/ProductA.svg";
import ProductB from "../images/ProductB.svg";
import ProductC from "../images/ProductC.svg";
import ProductD from "../images/ProductD.svg";

class CartView extends Component {
  state = {
    productName: "Appollo Running Short",
    productPrice: 50,
    productImage: ProductC,
  };
  render() {
    return (
      <div>
        <Navbar />
        <div className="categoryItem">
          <Cart />
        </div>
      </div>
    );
  }

  productPrice() {
    // let price =
    // return 50;
  }
}

export default CartView;
