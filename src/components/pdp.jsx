import React, { Component } from "react";
import ProductD from "../images/ProductD.svg";
import Product from "../images/Product.svg";
import { connect } from "react-redux";
import allActions from "../Actions";

class PDP extends Component {
  state = {
    product: [],
  };

  handlePrice() {
    const cur = this.props.productDetails.prices?.find(
      (price) => price.currency.label === this.props.currency
    );
    if (!cur) {
      return;
    }
    return (
      <div className="productPrice">
        {cur.currency.symbol}
        {cur.amount}
      </div>
    );
  }

  handleSelectAttribute = (event, attribute, item) => {
    event.preventDefault();
    const oldProduct = this.state.product;
    const newProduct = {};
    newProduct["name"] = attribute.name;
    newProduct["id"] = item.id;
    newProduct["items"] = attribute.items;
    newProduct["selected"] = item.id;

    const checkAttributeIndex = oldProduct.findIndex(
      (oldAttribute) => oldAttribute.name === attribute.name
    );

    if (checkAttributeIndex >= 0) {
      oldProduct[checkAttributeIndex]["selected"] = item.id;
      oldProduct[checkAttributeIndex]["id"] = item.id;
      this.setState({
        product: [...oldProduct],
      });
      return;
    }

    this.setState({
      product: [...oldProduct, newProduct],
    });
  };

  handleAddToCart = (event) => {
    event.preventDefault();
    const productDetails = {
      name: this.props.productDetails.name,
      image: this.props.productDetails.gallery[0],
      attributes: [...this.state.product],
    };
    this.props.addToCartAction(productDetails);
  };

  render() {
    return (
      <div className="pdp">
        <div className="preview">
          {this.props.productDetails.gallery?.map((image, index) => (
            <div>
              <img
                key={index}
                className="previewImage"
                src={image}
                alt="Preview Image"
              />
            </div>
          ))}
        </div>
        <div className="prodInfo">
          <div className="details">
            <div className="details-image-div">
              <img
                src={this.props.productDetails.gallery?.[0]}
                alt="Full Image"
                className="details-image"
              />
            </div>
            <div className="prodDetails">
              <div className="productTitle">
                {this.props.productDetails.name}
              </div>
              <div
                className="productDescription"
                dangerouslySetInnerHTML={{
                  __html: this.props.productDetails.description,
                }}
              ></div>

              {this.props.productDetails.attributes?.map((attribute, index) => {
                if (attribute.name === "Color") {
                  return (
                    <div key={index}>
                      <div className="size">Color:</div>
                      <div className="att-container">
                        {attribute.items?.map((color, index) => {
                          return (
                            <button
                              key={index}
                              className="colorDescription"
                              style={{ backgroundColor: color.value }}
                              onClick={(e) =>
                                this.handleSelectAttribute(e, attribute, color)
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
                      <div className="size">
                        {attribute.name.toUpperCase()}:
                      </div>
                      <div className="att-container">
                        {attribute.items?.map((item, index) => {
                          return (
                            <button
                              type="button"
                              key={index}
                              className="sizeDescription"
                              onClick={(e) =>
                                this.handleSelectAttribute(e, attribute, item)
                              }
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
              <div className="color">PRICE:</div>
              <div className="checkoutPrice">{this.handlePrice()}</div>

              <button
                className="addButton"
                onClick={(e) => this.handleAddToCart(e)}
              >
                ADD TO CART
              </button>
              <p>
                Find stunning women's cocktail dresses
                <br />
                and party dresses. Stand out in lace
                <br />
                and metallic cocktail dresses and party
                <br />
                dresses from all your favorite brands.
              </p>
            </div>
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

function mapDispatchToProps(dispatch) {
  return {
    addToCartAction: (product) =>
      dispatch(allActions.cartActions.addToCartAction(product)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PDP);
