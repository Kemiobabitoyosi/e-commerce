import React, { Component } from "react";
import ApolloClient, { gql } from "apollo-boost";
// import ProductA from "../images/ProductA.svg";
// import ProductB from "../images/ProductB.svg";
// import ProductC from "../images/ProductC.svg";
// import ProductD from "../images/ProductD.svg";
import Navbar from "../components/navbar";
import Category from "../components/category.jsx";
import Overlay from "../components/overlay.jsx";
import Cart from "../components/cart.jsx";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

class Home extends Component {
  state = {
    categories: [],
    currency: "USD",
  };

  componentDidMount() {
    client
      .query({
        query: gql`
          query {
            categories {
              name
              products {
                id
                name
                inStock
                gallery
                description
                category
                attributes {
                  id
                  name
                  type
                  items {
                    displayValue
                    value
                    id
                  }
                }
                prices {
                  currency {
                    label
                    symbol
                  }
                  amount
                }
                brand
              }
            }
          }
        `,
      })
      .then((result) => {
        this.setState({
          categories: result.data.categories,
        });
      });
  }

  handleSetCurrency = (currency) => {
    this.setState({
      currency: currency,
    });
  };
  render() {
    return (
      <div className="categoryItem">
        <Navbar setCurrency={this.handleSetCurrency} />
        {this.state.categories?.map((category, index) => (
          <div key={index}>
            <Category item={category} currency={this.state.currency} 
            style={{
              backgroundColor:
              this.handleShowCart === this.handleShowCart
                  ? "red;"
                  : "",
            }}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Home;
