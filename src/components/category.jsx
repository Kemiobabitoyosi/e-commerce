import React, { Component } from "react";
// import ProductA from "../images/ProductA.svg";
// import ProductB from "../images/ProductA.svg";
// import ProductC from "../images/ProductA.svg";
// import ProductD from "../images/ProductA.svg";
import CategoryItem from "./categoryItem";

class Category extends Component {
  state = {};
  render() {
    return (
      <div className="category">
        <h2>{this.props.item.name}</h2>
        <div className="cartItem">
          {this.props.item.products.map((product, index) => (
            <CategoryItem
              key={index}
              product={product}
              currency={this.props.currency}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Category;
