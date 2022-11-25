import React, { Component } from "react";
import ProductA from "../images/ProductA.svg";
import ProductB from "../images/ProductB.svg";
import ProductC from "../images/ProductC.svg";
import ProductD from "../images/ProductD.svg";

import { Link } from "react-router-dom";

class CategoryItem extends Component {
  state = {
    productName: "Appollo Running Short",
    productPrice: 50,
    productImage: ProductC,
  };
  productPrice() {
    const cur = this.props.product.prices.find(
      (price) => price.currency.label === this.props.currency
    );
    return (
      <div className="productPrice">
        {cur.currency.symbol}
        {cur.amount}
      </div>
    );
  }
  render() {
    return (
      <Link to={`product/${this.props.product.id}`}>
        <div className="categoryItem">
          <div className="product">
            <img
              className="productImage"
              src={this.props.product.gallery[0]}
              alt=""
              style={{
                opacity:
                this.props.product.inStock === !this.props.product.insStock ? "" : "0.5",
              }}
            />
            {this.props.product.inStock ? (
              ""
            ) : (
              <div className="out-of-stock">OUT OF STOCK</div>
            )}
            <div className="productName">{this.props.product.name}</div>
            <div>{this.productPrice()}</div>
          </div>
        </div>
      </Link>
    );
  }
}

export default CategoryItem;
