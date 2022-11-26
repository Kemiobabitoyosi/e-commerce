import React, { Component } from "react";
import ApolloClient, { gql } from "apollo-boost";
import { withRouter } from "./Hoc";
import PDP from "../components/pdp";
import Navbar from "../components/navbar";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

class ProductInfo extends Component {
  state = {
    productDetails: {},
    currency: "USD",
  };

  componentDidMount() {
    const productId = this.props.params.productId;
    client
      .query({
        query: gql`
          query {
            product(id: "${productId}") {
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
        `,
      })
      .then((result) => {
        this.setState({
          productDetails: result.data.product,
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
      <div>
        <Navbar setCurrency={this.handleSetCurrency} />
        <PDP
          productDetails={this.state.productDetails}
          currency={this.state.currency}
        />
      </div>
    );
  }
}

export default withRouter(ProductInfo);
